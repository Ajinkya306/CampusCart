const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  college: String,
  profilePhoto: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);