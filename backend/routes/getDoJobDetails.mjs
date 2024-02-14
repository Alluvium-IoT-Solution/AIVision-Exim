import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoJobDetails/:job_no", async (req, res) => {
  try {
    const { job_no } = req.params;
    const job = await JobModel.findOne({ job_no });

    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
