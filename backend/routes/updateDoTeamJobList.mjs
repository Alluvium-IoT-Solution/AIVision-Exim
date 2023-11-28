import express from "express";
const router = express.Router();
import JobModel from "../models/jobModel.mjs";

router.post("/api/updateDoTeamJobList", async (req, res) => {
  const {
    job_no,
    shipping_line_bond_completed,
    shipping_line_kyc_completed,
    shipping_line_invoice_received,
  } = req.body;

  try {
    const currentDate = new Date().toLocaleDateString("en-GB"); // Get current date in dd-mm-yyyy format

    // Fetch the existing job document
    const existingJob = await JobModel.findOne({ job_no });
    console.log(existingJob);
    if (!existingJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if any of the boolean fields are already 'Yes' in the database
    const shouldUpdateBondDate =
      existingJob.shipping_line_bond_completed !== "Yes";
    const shouldUpdateKYCDate =
      existingJob.shipping_line_kyc_completed !== "Yes";
    const shouldUpdateInvoiceDate =
      existingJob.shipping_line_invoice_received !== "Yes";

    // Create an object to hold the fields to update
    const updateFields = {};

    // Update date fields based on conditions
    if (shouldUpdateBondDate && shipping_line_bond_completed === "Yes") {
      updateFields.shipping_line_bond_completed_date = currentDate;
    }
    if (shouldUpdateKYCDate && shipping_line_kyc_completed === "Yes") {
      updateFields.shipping_line_kyc_completed_date = currentDate;
    }
    if (shouldUpdateInvoiceDate && shipping_line_invoice_received === "Yes") {
      updateFields.shipping_line_invoice_received_date = currentDate;
    }

    // Update the document if there are fields to be updated
    if (Object.keys(updateFields).length > 0) {
      const updatedJob = await JobModel.findOneAndUpdate(
        { job_no }, // Find the document by job_no
        { $set: updateFields }, // Update fields based on conditions
        { new: true } // Return the updated document
      );

      return res.json({ success: true, updatedJob });
    } else {
      return res.json({ success: true, message: "No fields to update" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
