// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/report/:year", async (req, res) => {
//   try {
//     const { year } = req.params;

//     // Find documents with the specified year
//     const matchingDocs = await JobModel.find({ year });

//     // Extract all jobs from the matching documents
//     const allJobs = matchingDocs.reduce((acc, doc) => {
//       const jobsInData = doc.data.flatMap((dataItem) => dataItem.jobs);
//       return acc.concat(jobsInData);
//     }, []);

//     res.json(allJobs);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

// Define the page size (number of documents per page)
const pageSize = 25;

router.get("/api/report/:year/:pageNo", async (req, res) => {
  try {
    const { year, pageNo } = req.params;

    // Calculate the skip value based on the page number and page size
    const skip = (pageNo - 1) * pageSize;

    // Count the total number of documents with the specified year
    const totalCount = await JobModel.countDocuments({ year });

    // Find documents with the specified year, applying pagination
    const matchingDocs = await JobModel.find({ year })
      .skip(skip) // Skip the appropriate number of documents
      .limit(pageSize); // Limit the result to the specified page size

    // Extract all jobs from the matching documents
    // const allJobs = matchingDocs.reduce((acc, doc) => {
    //   const jobsInData = doc.data.flatMap((dataItem) => dataItem.jobs);
    //   return acc.concat(jobsInData);
    // }, []);

    res.json({ total: totalCount, data: matchingDocs });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
