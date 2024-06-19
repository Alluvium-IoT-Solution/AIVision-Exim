import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/replaceNames", async (req, res) => {
  try {
    // Find all jobs with importerURL equal to "shubham_enterprise."
    await JobModel.updateMany(
      { importerURL: "shree_shyamsunder_alloys_pvt._ltd." },
      { $set: { importerURL: "shree_shyamsunder_alloys_pvt_ltd" } }
    );

    // Fetch the updated job list
    const jobs = await JobModel.find({
      importerURL: "shree_shyamsunder_alloys_pvt_ltd",
    });
    res.json(jobs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

export default router;
