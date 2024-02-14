import express from "express";
import JobModel from "../models/jobModel.mjs";
const router = express.Router();

router.post("/api/updateDoBilling", async (req, res) => {
  const { icd_cfs_invoice, bill_document_sent_to_accounts, job_no } = req.body;

  try {
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Fetch the existing job document
    const existingJob = await JobModel.findOne({ job_no });

    if (!existingJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    const updateFields = {};
    updateFields.icd_cfs_invoice = icd_cfs_invoice;
    updateFields.icd_cfs_invoice_date = currentDate;
    updateFields.bill_document_sent_to_accounts =
      bill_document_sent_to_accounts;

    const updatedJob = await JobModel.findOneAndUpdate(
      { job_no },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).send(updatedJob);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
