import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/:year/:importer/jobs/:status", async (req, res) => {
  try {
    const { year, importer, status } = req.params;

    // Find documents with the specified year and matching importerURL
    const matchingDocs = await JobModel.find({
      year,
      "data.importerURL": importer,
    });

    // If status is "all", return all jobs without filtering for the status
    if (status === "all") {
      const allJobs = matchingDocs.reduce((acc, doc) => {
        const dataItem = doc.data.find((item) => item.importerURL === importer);
        if (dataItem) {
          return acc.concat(dataItem.jobs);
        }
        return acc;
      }, []);
      return res.json(allJobs);
    }

    // Find the jobs with the specified status for the matching importerURL
    const matchingJobs = matchingDocs.reduce((acc, doc) => {
      const dataItem = doc.data.find((item) => item.importerURL === importer);
      if (dataItem) {
        const matchingJobsInData = dataItem.jobs.filter(
          (job) => job.status.toLowerCase() === status.toLowerCase()
        );
        return acc.concat(matchingJobsInData);
      }
      return acc;
    }, []);

    res.json(matchingJobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
