import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/:client/jobs/:status", async (req, res) => {
  try {
    const client = req.params.client;
    const status = req.params.status;

    const query = { client: client };

    const result = await JobModel.findOne(query).populate("jobs");

    if (!result) {
      return res.status(404).json({ message: "No jobs found" });
    }

    let matchingJobs = result.jobs;

    if (status !== "all") {
      matchingJobs = matchingJobs.filter(
        (job) => job.status.toLowerCase() === status
      );

      if (matchingJobs.length === 0) {
        return res.status(404).json({ message: "No matching jobs found" });
      }
    }

    // Return the complete object with matching jobs
    res.json(matchingJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
