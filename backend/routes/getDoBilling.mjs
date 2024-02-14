import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoBilling", async (req, res) => {
  try {
    const jobs = await JobModel.find(
      {
        do_processed_attachment: { $ne: "" },
        out_of_charge: { $ne: "" },
      },
      "job_no importer awb_bl_no shipping_line_airline custom_house obl_telex_bl bill_document_sent_to_accounts"
    );

    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
