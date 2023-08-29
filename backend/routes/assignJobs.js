const express = require("express");
const User = require("../models/userModel.js");

const router = express.Router();

router.post("/api/assignJobs", (req, res) => {
  const data = req.body;
  const { username, importers } = data;

  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user's 'importers' array with the provided 'importers'
      importers.forEach((importerObj) => {
        const { importer, importerURL } = importerObj;
        const existingImporterIndex = foundUser.importers.findIndex(
          (existingImporter) => existingImporter.importer === importer
        );

        if (existingImporterIndex !== -1) {
          // If the importer already exists, update its importerURL
          foundUser.importers[existingImporterIndex].importerURL = importerURL;
        } else {
          // If the importer does not exist, add it to the importers array
          foundUser.importers.push(importerObj);
        }
      });

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

module.exports = router;
