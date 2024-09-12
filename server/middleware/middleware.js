const jwt = require('jsonwebtoken');
const userSchema = require('../model/user');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log(authHeader);

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: "Invalid authorization header format" });
        }

        const token = parts[1];
        console.log("Token:", token); // Log the token for debugging

        const decoded = jwt.verify(token, process.env.JWT);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: "Token expired" });
        }

        req.userId = decoded.sub._id;
        req.userRole = decoded.sub.role;
        req.userName = decoded.sub.name;
        req.userEmail = decoded.sub.email;

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
  
const admin = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Not Authenticated!" });
    }

    const token = authHeader.split(' ')[1]; // Extract token from header

    try {
        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT);
        console.log("Decoded Token:", decodedToken);
        
        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > decodedToken.exp) {
            return res.status(401).send("Token has expired");
        }

        // Fetch user data from database based on decoded sub (subject) field
        const user = await userSchema.findById(decodedToken.sub);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user has admin role
        if (user && user.isAdmin) {
            req.user = user; // Attach user object to request for future middleware/routes
            next(); // Allow access to the next middleware/route handler
        } else {
            return res.status(403).send("Access denied. Admins only.");
        }
       
    } catch (error) {
        console.error("Token verification error:", error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send("Token has expired");
        }
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { protect, admin };
