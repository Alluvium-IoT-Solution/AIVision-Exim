import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoModuleJobs/", async (req, res) => {
  try {
    const jobs = await JobModel.find(
      {
        $and: [
          { $or: [{ out_of_charge: "" }, { out_of_charge: "--" }] },
          {
            $or: [
              { do_processed_attachment: { $exists: false } },
              { do_processed_attachment: [] },
            ],
          },
          { $or: [{ doPlanning: true }, { doPlanning: "true" }] },
        ],
      },
      "job_no importer awb_bl_no shipping_line_airline custom_house obl_telex_bl payment_made"
    );

    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
