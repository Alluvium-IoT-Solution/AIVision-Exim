import express from "express";
import User from "../models/userModel.mjs";

const router = express.Router();

router.get("/api/getAssignedImporter/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const users = await User.find({ username: user });
    if (users.length === 0) {
      // Check if the array is empty, indicating no user was found
      return res.status(404).json({ error: "User not found" });
    } else {
      const importer = users[0].importer;
      const importerURL = users[0].importerURL;
      const role = users[0].role;
      const username = users[0].username;
      return res.status(200).json({ importer, importerURL, role, username });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
