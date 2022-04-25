const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

// Login
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ username: username });
    if (!user || bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that username not found or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "2h" }
    );

    console.log(token);

    user.password = undefined;

    res.status(200).json({ ...user._doc, token });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
