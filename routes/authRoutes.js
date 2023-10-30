const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, profilePic } = req.body;
  if (!name || !email || !profilePic) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists!" });

    user = User({ name, email, profilePic });
    await user.save();
    res.status(201).json({ message: "User created successfully!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = authRouter;
