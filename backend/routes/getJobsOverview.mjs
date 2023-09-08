// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/getJobsOverview/:year", async (req, res) => {
//   try {
//     const { year } = req.params;

//     // Fetch the document that matches the provided year
//     const document = await JobModel.findOne({ year: year });

//     if (!document) {
//       return res
//         .status(404)
//         .json({ error: "No data found for the specified year." });
//     }

//     // Initialize counters for total jobs, pending jobs, completed jobs, and canceled jobs
//     let totalJobs = 0;
//     let pendingJobs = 0;
//     let completedJobs = 0;
//     let canceledJobs = 0;

//     // Loop through the data array of the matched document to count the jobs
//     document.data.forEach((dataObj) => {
//       dataObj.jobs.forEach((job) => {
//         totalJobs++;
//         if (job.status === "Pending") {
//           pendingJobs++;
//         } else if (job.status === "Completed") {
//           completedJobs++;
//         } else if (job.status === "Canceled") {
//           canceledJobs++;
//         }
//       });
//     });

//     // Prepare the response object
//     const responseObj = {
//       totalJobs,
//       pendingJobs,
//       completedJobs,
//       canceledJobs,
//     };

//     res.json(responseObj);
//   } catch (error) {
//     console.error("Error fetching job counts:", error);
//     res.status(500).json({ error: "Error fetching job counts" });
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getJobsOverview/:year", async (req, res) => {
  try {
    const { year } = req.params;

    // Use Mongoose aggregation to count jobs with different statuses
    const jobCounts = await JobModel.aggregate([
      {
        $match: { year: year }, // Filter documents by year
      },
      {
        $group: {
          _id: null, // Group all documents together
          pendingJobs: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          completedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
          canceledJobs: {
            $sum: { $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0] },
          },
          totalJobs: { $sum: 1 }, // Count total jobs
        },
      },
      {
        $project: {
          _id: 0,
          pendingJobs: 1,
          completedJobs: 1,
          canceledJobs: 1,
          totalJobs: 1,
        },
      },
    ]);

    // Extract the result from the aggregation and send it as JSON response
    const responseObj = jobCounts[0] || {
      pendingCount: 0,
      completedCount: 0,
      canceledCount: 0,
      totalCount: 0,
    };

    res.json(responseObj);
  } catch (error) {
    console.error("Error fetching job counts:", error);
    res.status(500).json({ error: "Error fetching job counts" });
  }
});

export default router;
