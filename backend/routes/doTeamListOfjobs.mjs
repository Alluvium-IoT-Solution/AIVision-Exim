import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/doTeamListOfJobs", async (req, res) => {
  const jobs = await JobModel.find(
    {
      be_no: { $exists: true, $ne: "" },
      bill_date: "",
    },
    "job_no be_no be_date vessel_berthing_date"
  );

  res.status(200).send(jobs);
});

export default router;