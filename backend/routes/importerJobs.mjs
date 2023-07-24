import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getImporterJobs/:importer", async (req, res) => {
  try {
    const importer = req.params.importer;
    const pipeline = [
      // Match jobs for the specific importer
      { $match: { importerName: importer } },

      // Unwind the jobs array to separate individual jobs
      { $unwind: "$jobs" },

      // Group by importer to calculate counts for each status
      {
        $group: {
          _id: "$importer",
          totalJobs: { $sum: 1 },
          completedJobs: {
            $sum: {
              $cond: [{ $eq: ["$jobs.status", "Completed"] }, 1, 0],
            },
          },
          pendingJobs: {
            $sum: {
              $cond: [{ $eq: ["$jobs.status", "Pending"] }, 1, 0],
            },
          },
          canceledJobs: {
            $sum: {
              $cond: [{ $eq: ["$jobs.status", "Canceled"] }, 1, 0],
            },
          },
        },
      },

      // Project to shape the output
      {
        $project: {
          _id: 0,
          importer: "$_id",
          totalJobs: 1,
          completedJobs: 1,
          pendingJobs: 1,
          canceledJobs: 1,
        },
      },
    ];

    const jobCountsByImporter = await JobModel.aggregate(pipeline);
    res.json(jobCountsByImporter[0]);
  } catch (error) {
    console.error("Error fetching job counts by importer:", error);
    res.status(500).json({ error: "Error fetching job counts by importer" });
  }
});

export default router;
