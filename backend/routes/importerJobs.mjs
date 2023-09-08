// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/getImporterJobs/:importer/:year", async (req, res) => {
//   try {
//     const { year, importer } = req.params;
//     const pipeline = [
//       // Match documents for the specific year
//       { $match: { year: year } },

//       // Unwind the data array to separate individual jobs
//       { $unwind: "$data" },
//       { $unwind: "$data.jobs" },

//       // Match jobs for the specific importer
//       { $match: { "data.importerURL": importer } },

//       // Group by importer to calculate counts for each status
//       {
//         $group: {
//           _id: "$data.importer",
//           totalJobs: { $sum: 1 },
//           completedJobs: {
//             $sum: {
//               $cond: [{ $eq: ["$data.jobs.status", "Completed"] }, 1, 0],
//             },
//           },
//           pendingJobs: {
//             $sum: {
//               $cond: [{ $eq: ["$data.jobs.status", "Pending"] }, 1, 0],
//             },
//           },
//           canceledJobs: {
//             $sum: {
//               $cond: [{ $eq: ["$data.jobs.status", "Canceled"] }, 1, 0],
//             },
//           },
//         },
//       },

//       // Project to shape the output as an array
//       {
//         $project: {
//           _id: 0,
//           totalJobs: 1,
//           pendingJobs: 1,
//           completedJobs: 1,
//           canceledJobs: 1,
//         },
//       },
//     ];

//     const [result] = await JobModel.aggregate(pipeline);

//     if (!result) {
//       return res
//         .status(404)
//         .json({ error: "No data found for the specified year and importer." });
//     }

//     const responseArray = [
//       result.totalJobs,
//       result.pendingJobs,
//       result.completedJobs,
//       result.canceledJobs,
//     ];
//     res.json(responseArray);
//   } catch (error) {
//     console.error("Error fetching job counts by importer:", error);
//     res.status(500).json({ error: "Error fetching job counts by importer" });
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getImporterJobs/:importerURL/:year", async (req, res) => {
  try {
    const { year, importerURL } = req.params;

    // Use Mongoose aggregation to count jobs with different statuses
    const jobCounts = await JobModel.aggregate([
      {
        $match: {
          year: year,
          importerURL: importerURL,
        }, // Filter documents by year and importerURL
      },
      {
        $group: {
          _id: null, // Group all documents together
          pendingCount: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          completedCount: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
          canceledCount: {
            $sum: { $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0] },
          },
          totalCount: { $sum: 1 }, // Count total jobs
        },
      },
    ]);

    // Extract the result from the aggregation and format it as an array
    const responseArray = [];
    if (jobCounts.length > 0) {
      responseArray.push(jobCounts[0].totalCount);
      responseArray.push(jobCounts[0].pendingCount);
      responseArray.push(jobCounts[0].completedCount);
      responseArray.push(jobCounts[0].canceledCount);
    } else {
      // If no matching documents are found, set all counts to 0
      responseArray.push(0, 0, 0, 0);
    }

    res.json(responseArray);
  } catch (error) {
    console.error("Error fetching job counts by importer:", error);
    res.status(500).json({ error: "Error fetching job counts by importer" });
  }
});

export default router;
