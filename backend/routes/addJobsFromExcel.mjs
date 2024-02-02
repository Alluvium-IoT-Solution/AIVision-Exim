import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.post("/api/jobs/addJob", async (req, res) => {
  const jsonData = req.body;

  try {
    const bulkOperations = [];

    for (const data of jsonData) {
      const { year, job_no, container_nos } = data;

      // Define the filter to find existing jobs
      const filter = { year, job_no };

      // Check if "arrival_date" is not already set in the database
      const existingJob = await JobModel.findOne(filter);
      if (existingJob && existingJob.container_nos.length > 0) {
        // Preserve the existing "arrival_date"
        data.container_nos = existingJob.container_nos;
      }
      if (existingJob) {
        // Preserve the existing "eta"
        data.vessel_berthing_date = existingJob.vessel_berthing_date;
      }

      // If the existing status is already "Completed," skip updating the status
      if (!(existingJob && existingJob.status === "Completed")) {
        // Define the update to set new data, including "container_nos"
        const update = {
          $set: {
            ...data,
            status: computeStatus(data.bill_date),
          },
        };

        // Create the bulk update operation for upsert or update
        const bulkOperation = {
          updateOne: {
            filter,
            update,
            upsert: true, // Create if it doesn't exist
          },
        };

        bulkOperations.push(bulkOperation);
      }
    }

    // Execute the bulkWrite operation to update or insert multiple jobs
    await JobModel.bulkWrite(bulkOperations);

    res.status(200).json({ message: "Jobs added/updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

function computeStatus(billDate) {
  return billDate === "" || billDate === "--" ? "Pending" : "Completed";
}

export default router;
