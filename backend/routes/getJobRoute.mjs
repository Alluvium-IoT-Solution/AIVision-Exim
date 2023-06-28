import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/:importer/job/:jobNo", async (req, res) => {
  try {
    const { importer, jobNo } = req.params;

    const clientDoc = await JobModel.findOne({ importer: importer });

    if (!clientDoc) {
      return res.status(404).json({ message: "Importer not found" });
    }

    const job = clientDoc.jobs.find((job) => job.job_no === jobNo);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
