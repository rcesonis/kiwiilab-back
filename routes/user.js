const { Router } = require("express");
const req = require("express/lib/request");
const User = require("../models/User");
const router = new Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Editing user route
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete user route

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get user by id route
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.password = undefined;
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get all users  route
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
