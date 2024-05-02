import express from "express";
import JobModel from "../../models/jobModel.mjs";

const router = express.Router();

router.post("/api/customerDoPlanning", async (req, res) => {
  const { date, year, job_no } = req.body;

  try {
    // Find the job with matching job_no and year, and update do_planning_date
    const updatedJob = await JobModel.findOneAndUpdate(
      // Match the job based on job_no and year
      { job_no, year },
      // Update the do_planning_date and do_planning field
      { $set: { do_planning_date: date, doPlanning: true } },
      // Set new to true to return the updated document
      { new: true }
    );

    if (updatedJob) {
      // If the job is found and updated successfully
      return res.status(200).json({ success: true, updatedJob });
    } else {
      // If no job matches the provided job_no and year
      console.log("Job not found with the provided job_no and year.");
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }
  } catch (error) {
    // If an error occurs during the database operation
    console.error("Error updating job:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

export default router;
