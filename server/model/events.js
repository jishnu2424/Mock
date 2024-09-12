const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
});

const eventSchema = mongoose.model("events", schema);
module.exports = eventSchema;
