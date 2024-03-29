import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/doTeamListOfJobs", async (req, res) => {
  const jobs = await JobModel.find(
    {
      detailed_status: "Gateway IGM Filed",
    },
    "job_no awb_bl_no shipping_line_airline custom_house obl_telex_bl importer"
  );

  res.status(200).send(jobs);
});

export default router;
