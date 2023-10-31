const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const auth = require("../middlewears/auth_middlewear");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, profilePic } = req.body;
  if (!name || !email || !profilePic) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = User({ name, email, profilePic });
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

authRouter.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ user, token: req.token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = authRouter;
