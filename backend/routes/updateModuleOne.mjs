import express from "express";
import JobModel from "../models/jobModel.mjs";
const router = express.Router();

router.post("/api/updateModuleOne", async (req, res) => {
  const {
    job_no,
    payment_made,
    do_processed,
    do_received,
    do_validity,
    bill_document_sent_to_accounts,
  } = req.body;

  try {
    const currentDate = new Date().toLocaleDateString("en-GB"); // Get current date in dd-mm-yyyy format

    // Fetch the existing job document
    const existingJob = await JobModel.findOne({ job_no });

    if (!existingJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if any of the boolean fields are already 'Yes' in the database
    const shouldUpdatePaymentMadeDate = existingJob.payment_made !== "Yes";
    const shouldUpdateDoProcessedDate = existingJob.do_processed !== "Yes";
    const shouldUpdateDoReceivedDate = existingJob.do_received !== "Yes";
    const shouldUpdateDoValidity = existingJob.do_validity !== do_validity;
    const shouldUpdateBillSentToAccounts =
      existingJob.bill_document_sent_to_accounts !==
      bill_document_sent_to_accounts;

    // Create an object to hold the fields to update
    const updateFields = {};

    // Update date fields based on conditions
    if (shouldUpdatePaymentMadeDate && payment_made === "Yes") {
      updateFields.payment_made_date = currentDate;
    }
    if (shouldUpdateDoProcessedDate && do_processed === "Yes") {
      updateFields.do_processed_date = currentDate;
    }
    if (shouldUpdateDoReceivedDate && do_received === "Yes") {
      updateFields.do_received_date = currentDate;
    }

    // Update other fields
    if (shouldUpdateDoValidity) {
      updateFields.do_validity = do_validity;
    }
    if (shouldUpdateBillSentToAccounts) {
      updateFields.bill_document_sent_to_accounts =
        bill_document_sent_to_accounts;
    }

    // Update the document if there are fields to be updated
    if (
      Object.keys(updateFields).length > 0 ||
      shouldUpdateDoValidity ||
      shouldUpdateBillSentToAccounts
    ) {
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

// router.post("/api/updateModuleOne", async (req, res) => {
//   const {
//     job_no,
//     payment_made,
//     do_processed,
//     do_received,
//     do_validity,
//     bill_document_sent_to_accounts,
//   } = req.body;

//   try {
//     const currentDate = new Date().toLocaleDateString("en-GB"); // Get current date in dd-mm-yyyy format

//     const updateFields = {
//       payment_made,
//       do_processed,
//       do_received,
//       do_validity,
//       bill_document_sent_to_accounts: bill_document_sent_to_accounts,
//     };

//     // Check and update fields with date if the value is "Yes"
//     if (payment_made === "Yes") {
//       updateFields.payment_made_date = currentDate;
//     }
//     if (do_processed === "Yes") {
//       updateFields.do_processed_date = currentDate;
//     }
//     if (do_received === "Yes") {
//       updateFields.do_received_date = currentDate;
//     }

//     // Find the document with matching job_no and update the specified fields
//     const updatedJob = await JobModel.findOneAndUpdate(
//       { job_no },
//       updateFields,
//       { new: true }
//     );

//     if (updatedJob) {
//       return res.json({ success: true, updatedJob });
//     } else {
//       return res.status(404).json({ success: false, message: "Job not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

export default router;
