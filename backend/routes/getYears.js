const express = require("express");
const JobModel = require("../models/jobModel.js");

const router = express.Router();

router.get("/api/getYears", async (req, res) => {
  try {
    const pipeline = [
      // Unwind the data array to separate individual jobs
      { $unwind: "$data" },

      // Group by year to get distinct years
      {
        $group: {
          _id: null,
          years: { $addToSet: "$year" },
        },
      },

      // Project to shape the output
      {
        $project: {
          _id: 0,
          years: 1,
        },
      },
    ];

    const result = await JobModel.aggregate(pipeline);
    const yearsList = result[0].years;

    // Sort the yearsList in ascending order
    yearsList.sort();

    res.status(200).json(yearsList);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching years list.");
  }
});

module.exports = router;
