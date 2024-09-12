const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userSchema = require('../model/user');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userSchema.create({ name, email, password: hashedPassword });  
      res.status(201).json({ Message:"User Created" });
    } catch (error) {
        console.log(error);
      res.status(400).json({ message: 'User registration failed' });
    }
  };
  
  // Login User
  const loginUser= async(req,res)=>{
    const {email,password} = req.body
    try {
      const findUser = await userSchema.findOne({email})
      
      if(!findUser){
        return res.status(404).send("User Not Found");
      }
      const  plainPassword = findUser.password
      const passwordCheck = await bcrypt.compare(password,plainPassword);
      if (!passwordCheck) {
        return res.status(401).send("Invalid Credentials");
      }
      const token = jwt.sign({ sub: findUser }, process.env.JWT, { expiresIn:'3d'})
      res.json({"token":token,"data":findUser,"Properties":findUser.properties})
  
      
    } catch (error) {
      console.error(error);
    }
   }
  
   const getUserProfile = async (req,res)=>{
    try {
        const users = await userSchema.find()
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const deleteUser = async(req,res)=>{
    try {
     const {id} = req.params
     await userSchema.findByIdAndDelete(id)
     return res.status(200).send("Deleted")
    } catch (error) {
     return res.status(500).send(error)
    }
 }

 const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = req.body;
  
      const user = await userSchema.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      const updatedUser = await userSchema.findByIdAndUpdate(userId, userData, { new: true });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const userProfile = async (req, res) => {
    try {
      const id = req.userId; // Assuming req.userId is set by middleware
      const userData = await userSchema.findOne({ _id: id }); // Find by _id field
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

  
  module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser,
    userProfile
  };