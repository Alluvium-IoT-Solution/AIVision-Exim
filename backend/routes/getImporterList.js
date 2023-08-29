const express = require("express");
const JobModel = require("../models/jobModel.js");

const router = express.Router();

router.get("/api/getImporterList/:year", async (req, res) => {
  try {
    const selectedYear = req.params.year;

    const pipeline = [
      // Match documents for the specific year
      { $match: { year: selectedYear } },

      // Unwind the data array to separate individual jobs
      { $unwind: "$data" },

      // Group by importer to get distinct importers
      {
        $group: {
          _id: "$data.importer",
          importerURL: { $first: "$data.importerURL" }, // Take the first importerURL for each importer
        },
      },

      // Project to shape the output
      {
        $project: {
          _id: 0,
          importerName: "$_id",
          importer: "$_id",
          importerURL: 1, // Include the importerURL field in the output
        },
      },

      // Sort the results by importer name in ascending order
      {
        $sort: {
          importerName: 1,
        },
      },
    ];

    const importers = await JobModel.aggregate(pipeline);
    res.status(200).json(importers);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching importers.");
  }
});

module.exports = router;
