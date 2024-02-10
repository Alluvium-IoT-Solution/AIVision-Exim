import express from "express";
import JobModel from "../models/jobModel.mjs";
const router = express.Router();

router.post("/api/updateModule", async (req, res) => {
  const {
    job_no,
    kyc,
    shipping_line_invoice,
    shipping_line_attachment,
    icd_cfs_invoice,
    other_invoices,
    payment_made,
    do_processed,
    do_processed_attachment,
    do_received,
    do_validity,
    bill_document_sent_to_accounts,
    obl_telex_bl,
  } = req.body;
  console.log(obl_telex_bl);
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

    // Check if any of the boolean fields are already 'Yes' in the database
    const shouldUpdateKycDate = existingJob.kyc !== "Yes";
    const shouldUpdatePaymentMadeDate = existingJob.payment_made !== "Yes";
    const shouldUpdateDoProcessedDate = existingJob.do_processed !== "Yes";
    const shouldUpdateDoReceivedDate = existingJob.do_received !== "Yes";
    const shouldUpdateShippingLineDate =
      existingJob.shipping_line_invoice !== "Yes";
    const shouldUpdateICD_CFSDate = existingJob.icd_cfs_invoice !== "Yes";
    const shouldUpdateOtherInvoicesDate = existingJob.other_invoices !== "Yes";

    // Create an object to hold the fields to update
    const updateFields = {};

    // Update date fields based on conditions
    if (shouldUpdateKycDate && kyc === "Yes") {
      updateFields.kyc_date = currentDate;
    }
    if (shouldUpdatePaymentMadeDate && payment_made === "Yes") {
      updateFields.payment_made_date = currentDate;
    }
    if (shouldUpdateDoProcessedDate && do_processed === "Yes") {
      updateFields.do_processed_date = currentDate;
      updateFields.do_processed_attachment = do_processed_attachment;
    }
    if (shouldUpdateDoReceivedDate && do_received === "Yes") {
      updateFields.do_received_date = currentDate;
    }
    if (shouldUpdateShippingLineDate && shipping_line_invoice === "Yes") {
      updateFields.shipping_line_invoice_date = currentDate;
      updateFields.shipping_line_attachment = shipping_line_attachment;
    }
    if (shouldUpdateICD_CFSDate && icd_cfs_invoice === "Yes") {
      updateFields.icd_cfs_invoice_date = currentDate;
    }
    if (shouldUpdateOtherInvoicesDate && other_invoices === "Yes") {
      updateFields.other_invoices_date = currentDate;
    }

    updateFields.do_validity = do_validity;
    updateFields.obl_telex_bl = obl_telex_bl;

    // Always update bill_document_sent_to_accounts field
    updateFields.bill_document_sent_to_accounts =
      bill_document_sent_to_accounts;

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
