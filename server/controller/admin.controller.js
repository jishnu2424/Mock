const User = require('../model/user');

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Delete User
const deleteUser = async(req,res)=>{
    try {
     const {id} = req.params
     await userSchema.findByIdAndDelete(id)
     return res.status(200).send("Deleted")
    } catch (error) {
     return res.status(500).send(error)
    }
 }
 

module.exports = { getAllUsers, deleteUser };
