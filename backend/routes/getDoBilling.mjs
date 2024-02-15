import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoBilling", async (req, res) => {
  try {
    // Creating a string for February 1st, 2024
    const feb2024DateString = "2024-02-01";

    // Finding documents where delivery_date is greater than February 1st, 2024
    const jobs = await JobModel.find(
      {
        $or: [{ doPlanning: true }, { doPlanning: "true" }],
        do_processed_attachment: { $ne: "" },
        delivery_date: {
          $gt: feb2024DateString, // Just compare directly with the string
        },
      },
      "job_no importer awb_bl_no shipping_line_airline custom_house obl_telex_bl bill_document_sent_to_accounts"
    );

    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
