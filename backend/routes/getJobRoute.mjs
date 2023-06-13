import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/:client/job/:jobNo", async (req, res) => {
  try {
    const { client, jobNo } = req.params;

    const clientDoc = await JobModel.findOne({ client: client });

    if (!clientDoc) {
      return res.status(404).json({ message: "Client not found" });
    }

    const job = clientDoc.jobs.find((job) => job.job_number === jobNo);

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
