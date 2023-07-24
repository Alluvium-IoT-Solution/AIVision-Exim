import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getJobsOverview", async (req, res) => {
  try {
    const pipeline = [
      // Unwind the jobs array to separate individual jobs
      { $unwind: "$jobs" },

      // Group by null to calculate counts across all importers
      {
        $group: {
          _id: null,
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
          totalJobs: 1,
          completedJobs: 1,
          pendingJobs: 1,
          canceledJobs: 1,
        },
      },
    ];

    const jobCounts = await JobModel.aggregate(pipeline);

    // Since we grouped by null, there will be only one result
    const counts = jobCounts[0];

    res.json(counts);
  } catch (error) {
    console.error("Error fetching job counts:", error);
    res.status(500).json({ error: "Error fetching job counts" });
  }
});

export default router;
