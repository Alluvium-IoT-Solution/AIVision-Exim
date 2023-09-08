// // import express from "express";
// // import JobModel from "../models/jobModel.mjs";

// // const router = express.Router();

// // router.get("/api/:year/:importer/jobs/:status", async (req, res) => {
// //   try {
// //     const { year, importer, status } = req.params;

// //     // Find documents with the specified year and matching importerURL
// //     const matchingDocs = await JobModel.find({
// //       year,
// //       "data.importerURL": importer,
// //     });

// //     // If status is "all", return all jobs without filtering for the status
// //     if (status === "all") {
// //       const allJobs = matchingDocs.reduce((acc, doc) => {
// //         const dataItem = doc.data.find((item) => item.importerURL === importer);
// //         if (dataItem) {
// //           return acc.concat(dataItem.jobs);
// //         }
// //         return acc;
// //       }, []);
// //       return res.json(allJobs);
// //     }

// //     // Find the jobs with the specified status for the matching importerURL
// //     const matchingJobs = matchingDocs.reduce((acc, doc) => {
// //       const dataItem = doc.data.find((item) => item.importerURL === importer);
// //       if (dataItem) {
// //         const matchingJobsInData = dataItem.jobs.filter(
// //           (job) => job.status.toLowerCase() === status.toLowerCase()
// //         );
// //         return acc.concat(matchingJobsInData);
// //       }
// //       return acc;
// //     }, []);

// //     res.json(matchingJobs);
// //   } catch (error) {
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // export default router;

// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/:year/:importer/jobs/:status", async (req, res) => {
//   try {
//     const { year, importer, status } = req.params;

//     // Use the index to efficiently find documents with the specified year and matching importerURL
//     const matchingDocs = await JobModel.find({
//       year,
//       "data.importerURL": importer,
//     }).lean(); // Use .lean() to get plain JavaScript objects instead of Mongoose documents

//     // If status is "all", return all jobs without filtering for the status
//     if (status === "all") {
//       const allJobs = matchingDocs.reduce((acc, doc) => {
//         const dataItem = doc.data.find((item) => item.importerURL === importer);
//         if (dataItem) {
//           return acc.concat(dataItem.jobs);
//         }
//         return acc;
//       }, []);
//       return res.json(allJobs);
//     }

//     // Use the index to efficiently find the jobs with the specified status for the matching importerURL
//     const matchingJobs = matchingDocs.reduce((acc, doc) => {
//       const dataItem = doc.data.find((item) => item.importerURL === importer);
//       if (dataItem) {
//         const matchingJobsInData = dataItem.jobs.filter(
//           (job) => job.status.toLowerCase() === status.toLowerCase()
//         );
//         return acc.concat(matchingJobsInData);
//       }
//       return acc;
//     }, []);

//     res.json(matchingJobs);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;

// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/:year/:importer/jobs/:status", async (req, res) => {
//   try {
//     const { year, importer, status } = req.params;

//     // Find documents with the specified year and matching importerURL
//     const matchingDocs = await JobModel.find({
//       year,
//       "data.importerURL": importer,
//     });

//     // If status is "all", return all jobs without filtering for the status
//     if (status === "all") {
//       const allJobs = matchingDocs.reduce((acc, doc) => {
//         const dataItem = doc.data.find((item) => item.importerURL === importer);
//         if (dataItem) {
//           return acc.concat(dataItem.jobs);
//         }
//         return acc;
//       }, []);
//       return res.json(allJobs);
//     }

//     // Find the jobs with the specified status for the matching importerURL
//     const matchingJobs = matchingDocs.reduce((acc, doc) => {
//       const dataItem = doc.data.find((item) => item.importerURL === importer);
//       if (dataItem) {
//         const matchingJobsInData = dataItem.jobs.filter(
//           (job) => job.status.toLowerCase() === status.toLowerCase()
//         );
//         return acc.concat(matchingJobsInData);
//       }
//       return acc;
//     }, []);

//     res.json(matchingJobs);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;

// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get(
//   "/api/:year/:importerURL/jobs/:status/:pageNo/:filterText",
//   async (req, res) => {
//     try {
//       const { year, importerURL, status, pageNo } = req.params;
//       const itemsPerPage = 25; // Number of items to show per page
//       const skip = (pageNo - 1) * itemsPerPage;

//       // Create a query object with year and importerURL criteria
//       const query = {
//         year,
//         importerURL,
//       };

//       // Convert the status parameter to title case (e.g., "pending" to "Pending")
//       const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

//       // Check if status is one of the specific values ("Pending", "Completed", "Canceled")
//       if (
//         formattedStatus === "Pending" ||
//         formattedStatus === "Completed" ||
//         formattedStatus === "Cancelled"
//       ) {
//         query.status = formattedStatus; // Filter by specific status
//       }

//       // Query the database based on the criteria in the query object
//       const jobs = await JobModel.find(query).skip(skip).limit(itemsPerPage);

//       // Calculate the total count of matching documents
//       const total = await JobModel.countDocuments(query);

//       res.send({ data: jobs, total });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get(
  "/api/:year/:importerURL/jobs/:status/:pageNo/:filterText",
  async (req, res) => {
    try {
      const { year, importerURL, status, pageNo, filterText } = req.params;
      const itemsPerPage = 25; // Number of items to show per page
      const skip = (pageNo - 1) * itemsPerPage;

      // Create a query object with year and importerURL criteria
      const query = {
        year,
        importerURL,
      };

      // Convert the status parameter to title case (e.g., "pending" to "Pending")
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

      // Check if status is one of the specific values ("Pending", "Completed", "Canceled")
      if (
        formattedStatus === "Pending" ||
        formattedStatus === "Completed" ||
        formattedStatus === "Cancelled"
      ) {
        query.status = formattedStatus; // Filter by specific status
      }

      // Check if filterText is provided and not empty
      if (filterText && filterText.trim() !== "all") {
        // Add a condition to filter by job_no containing filterText
        query.job_no = { $regex: filterText, $options: "i" }; // Case-insensitive matching
      }

      // Query the database based on the criteria in the query object
      const jobs = await JobModel.find(query).skip(skip).limit(itemsPerPage);

      // Calculate the total count of matching documents
      const total = await JobModel.countDocuments(query);

      res.send({ data: jobs, total });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
