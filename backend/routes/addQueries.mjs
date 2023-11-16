import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.put("/api/addQuery/:year/:jobNo", async (req, res) => {
  const { jobNo, year } = req.params;
  const { queries } = req.body;

  const matchingJob = await JobModel.findOne({
    year,
    job_no: jobNo,
  });

  if (!matchingJob) {
    return res.status(404).json({ error: "Job not found" });
  }

  // Filter out queries with both empty query and response
  const validQueries = queries.filter(
    (query) => query.query.trim() !== "" || query.response.trim() !== ""
  );

  // Check if the same query and response already exist in matchingJob
  validQueries.forEach(({ query, response }) => {
    const existingQuery = matchingJob.queries.find(
      (existing) =>
        existing.query.trim() === query.trim() &&
        existing.response.trim() === response.trim()
    );

    if (!existingQuery) {
      matchingJob.queries.push({ query, response });
    }
  });

  // Update the job's queries in the database
  try {
    await matchingJob.save();
    return res.status(200).json({ message: "Queries added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save queries" });
  }
});

export default router;
