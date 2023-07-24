import express from "express";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/assignJobs", (req, res) => {
  const { user, importer } = req.body;

  User.findOne({ username: user })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user's 'importer' field with the provided 'importer' value
      foundUser.importer = importer;
      (foundUser.importerURL = importer
        .toLowerCase()
        .replace(/ /g, "_") // replace spaces with underscores
        .replace(/\./g, "") // replace dots with nothing
        .replace(/\//g, "_") // replace slashes with underscores
        .replace(/-/g, "") // replace dashes with nothing
        .replace(/_+/g, "_") // replace underscores with nothing
        .replace(/\(/g, "") // replace ( with nothing
        .replace(/\)/g, "") // replace ) with nothing
        .replace(/\[/g, "") // replace [ with nothing
        .replace(/\]/g, "") // replace ] with nothing
        .replace(/,/g, "")), // replace , with nothing
        // Save the updated user to the database
        foundUser
          .save()
          .then((updatedUser) => {
            res.status(200).json(updatedUser);
          })
          .catch((err) => {
            console.error("Error while saving user:", err);
            res.status(500).json({ error: "Error while saving user" });
          });
    })
    .catch((err) => {
      console.error("Error while finding user:", err);
      res.status(500).json({ error: "Error while finding user" });
    });
});

export default router;
