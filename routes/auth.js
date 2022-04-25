const bcrypt = require("bcrypt");
const { request } = require("express");
const { Router } = require("express");
const User = require("../models/User");

const router = new Router();

// New user registration
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .send("Please provide and email, pasword and username"); // Validates users input
  }

  try {
    const newUser = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
