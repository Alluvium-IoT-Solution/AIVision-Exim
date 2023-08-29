const express = require("express");
const JobModel = require("../models/jobModel.js");

const router = express.Router();

router.get("/api/getImporterJobs/:importer/:year", async (req, res) => {
  try {
    const { year, importer } = req.params;
    const pipeline = [
      // Match documents for the specific year
      { $match: { year: year } },

      // Unwind the data array to separate individual jobs
      { $unwind: "$data" },
      { $unwind: "$data.jobs" },

      // Match jobs for the specific importer
      { $match: { "data.importerURL": importer } },

      // Group by importer to calculate counts for each status
      {
        $group: {
          _id: "$data.importer",
          totalJobs: { $sum: 1 },
          completedJobs: {
            $sum: {
              $cond: [{ $eq: ["$data.jobs.status", "Completed"] }, 1, 0],
            },
          },
          pendingJobs: {
            $sum: {
              $cond: [{ $eq: ["$data.jobs.status", "Pending"] }, 1, 0],
            },
          },
          canceledJobs: {
            $sum: {
              $cond: [{ $eq: ["$data.jobs.status", "Canceled"] }, 1, 0],
            },
          },
        },
      },

      // Project to shape the output as an array
      {
        $project: {
          _id: 0,
          totalJobs: 1,
          pendingJobs: 1,
          completedJobs: 1,
          canceledJobs: 1,
        },
      },
    ];

    const [result] = await JobModel.aggregate(pipeline);

    if (!result) {
      return res
        .status(404)
        .json({ error: "No data found for the specified year and importer." });
    }

    const responseArray = [
      result.totalJobs,
      result.pendingJobs,
      result.completedJobs,
      result.canceledJobs,
    ];
    res.json(responseArray);
  } catch (error) {
    console.error("Error fetching job counts by importer:", error);
    res.status(500).json({ error: "Error fetching job counts by importer" });
  }
});

module.exports = router;
