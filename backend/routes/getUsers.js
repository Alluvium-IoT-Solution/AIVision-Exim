const express = require("express");
const User = require("../models/userModel.js");

const router = express.Router();

router.get("/api/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
