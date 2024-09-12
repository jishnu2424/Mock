const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const userSchema = mongoose.model('users',schema)
module.exports = userSchema