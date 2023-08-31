


const express = require("express");
const User = require("../models/userModel.js");
const ReportFieldsModel = require("../models/reportFieldsModel.js")

const router = express.Router();

router.post("/api/assignJobs", async (req, res) => {
  const data = req.body;
  const { username, importers } = data;

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const importerObj of importers) {
      const { importer, importerURL } = importerObj;

      // Check if the importer already exists in the reporterFields collection
      const existingImporter = await ReportFieldsModel.findOne({ importer });

      if (!existingImporter) {
        // If importer doesn't exist, create a new document
        const newData = {
          importer: importer,
          importerURL: importerURL,
          field: [
            "JOB NO",
                    "JOB DATE",
                    "SUPPLIER/ EXPORTER",
                    "INVOICE NUMBER",
                    "INVOICE DATE",
                    "INVOICE VALUE AND UNIT PRICE",
                    "AWB/ BL NUMBER",
                    "AWB/ BL DATE",
                    "COMMODITY",
                    "NUMBER OF PACKAGES",
                    "NET WEIGHT",
                    "LOADING PORT",
                    "ARRIVAL DATE",
                    "FREE TIME",
                    "DETENTION FROM",
                    "SHIPPING LINE",
                    "CONTAINER NUMBER",
                    "SIZE",
                    "REMARKS",
                    "DO VALIDITY",
                    "BE NUMBER",
                    "BE DATE",
                    "ASSESSMENT DATE",
                    "EXAMINATION DATE",
                    "DUTY PAID DATE",
                    "OUT OF CHARGE DATE"
          ],
          email: "manu@surajforwarders.com",
          senderEmail: foundUser.email
        };

        await ReportFieldsModel.create(newData);
      }
      
      // Update the user's 'importers' array with the provided 'importers'
      importers.forEach(async (importerObj) => {
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
        }})
    }

    foundUser
      .save()
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error("Error while saving user:", err);
        res.status(500).json({ error: "Error while saving user" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
