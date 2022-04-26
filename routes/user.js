const { Router } = require("express");
const req = require("express/lib/request");
const User = require("../models/User");
const router = new Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");

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

module.exports = router;
