const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  profilePic: {
    type: String,
    required: [true, "Profile picture is required!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
