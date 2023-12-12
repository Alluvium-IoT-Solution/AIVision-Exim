import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoModuleJobs", async (req, res) => {
  const jobs = await JobModel.find(
    {
      doPlanning: true,
    },
    "job_no awb_bl_no shipping_line_airline be_date vessel_berthing_date"
  );

  res.status(200).send(jobs);
});

export default router;
