import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/report", async (req, res) => {
  try {
    const result = await JobModel.find({}, "jobs");

    if (result.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    // Extract the jobs array from each document and combine them into a single array
    const jobsArray = result.flatMap((document) => document.jobs);

    res.json(jobsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
