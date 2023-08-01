import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/report/:year", async (req, res) => {
  try {
    const { year } = req.params;

    // Find documents with the specified year
    const matchingDocs = await JobModel.find({ year });

    // Extract all jobs from the matching documents
    const allJobs = matchingDocs.reduce((acc, doc) => {
      const jobsInData = doc.data.flatMap((dataItem) => dataItem.jobs);
      return acc.concat(jobsInData);
    }, []);

    res.json(allJobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
