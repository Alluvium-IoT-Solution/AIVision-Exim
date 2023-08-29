const express = require("express");
const User = require("../models/userModel.js");

const router = express.Router();

router.get("/api/getAssignedImporter/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const users = await User.find({ username: user });
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const importers = users[0].importers;
      return res.status(200).json(importers);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch importers" });
  }
});

module.exports = router;
