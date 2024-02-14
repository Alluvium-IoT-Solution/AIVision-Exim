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
    obl_telex_bl,
    other_invoices_img,
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

    const updateFields = {};
    updateFields.shipping_line_invoice = shipping_line_invoice;
    updateFields.icd_cfs_invoice = icd_cfs_invoice;
    updateFields.other_invoices = other_invoices;
    updateFields.payment_made = payment_made;
    updateFields.do_processed = do_processed;
    updateFields.do_received = do_received;
    updateFields.kyc = kyc;
    updateFields.kyc_date = currentDate;
    updateFields.payment_made_date = currentDate;
    updateFields.do_processed_date = currentDate;
    updateFields.do_processed_attachment = do_processed_attachment;
    updateFields.do_received_date = currentDate;
    updateFields.shipping_line_invoice_date = currentDate;
    updateFields.shipping_line_attachment = shipping_line_attachment;
    updateFields.other_invoices_date = currentDate;

    updateFields.do_validity = do_validity;
    updateFields.obl_telex_bl = obl_telex_bl;
    updateFields.other_invoices_img = other_invoices_img;

    if (Object.keys(updateFields).length > 0) {
      const updatedJob = await JobModel.findOneAndUpdate(
        { job_no },
        { $set: updateFields },
        { new: true }
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
