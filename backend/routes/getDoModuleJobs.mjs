import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoModuleJobs", async (req, res) => {
  try {
    const jobs = await JobModel.find(
      {
        doPlanning: true,
        out_of_charge: { $eq: "" }, // Filter out jobs where out_of_charge is not empty
      },
      "job_no importer awb_bl_no shipping_line_airline custom_house obl_telex_bl"
    );

    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
