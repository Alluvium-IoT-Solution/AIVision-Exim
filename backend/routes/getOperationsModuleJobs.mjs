import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getOperationsModuleJobs", async (req, res) => {
  const jobs = await JobModel.find(
    {
      examinationPlanning: true,
    },
    "job_no be_no be_date container_nos"
  );

  res.status(200).send(jobs);
});

export default router;
