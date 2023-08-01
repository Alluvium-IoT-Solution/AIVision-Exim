import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getJobsOverview/:year", async (req, res) => {
  try {
    const { year } = req.params;

    // Fetch the document that matches the provided year
    const document = await JobModel.findOne({ year: year });

    if (!document) {
      return res
        .status(404)
        .json({ error: "No data found for the specified year." });
    }

    // Initialize counters for total jobs, pending jobs, completed jobs, and canceled jobs
    let totalJobs = 0;
    let pendingJobs = 0;
    let completedJobs = 0;
    let canceledJobs = 0;

    // Loop through the data array of the matched document to count the jobs
    document.data.forEach((dataObj) => {
      dataObj.jobs.forEach((job) => {
        totalJobs++;
        if (job.status === "Pending") {
          pendingJobs++;
        } else if (job.status === "Completed") {
          completedJobs++;
        } else if (job.status === "Canceled") {
          canceledJobs++;
        }
      });
    });

    // Prepare the response object
    const responseObj = {
      totalJobs,
      pendingJobs,
      completedJobs,
      canceledJobs,
    };

    res.json(responseObj);
  } catch (error) {
    console.error("Error fetching job counts:", error);
    res.status(500).json({ error: "Error fetching job counts" });
  }
});

export default router;
