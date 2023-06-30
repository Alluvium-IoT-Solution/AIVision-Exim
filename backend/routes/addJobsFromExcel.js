import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.post("/api/jobs/addJob", async (req, res) => {
  const requestData = req.body; // Assuming the frontend sends an array of data

  try {
    for (const i of requestData) {
      for (const jobData of i.data) {
        const existingJob = await JobModel.findOne({
          importer: i.importer,
          "jobs.job_no": jobData.job_no,
        });

        if (!existingJob) {
          // Job number doesn't exist, add the job with status "Pending"
          await JobModel.updateOne(
            { importer: i.importer },
            { $push: { jobs: { ...jobData, status: "Pending", } } },
            { upsert: true }
          );
        } else {
          // Job number exists, update other fields excluding status and detailed_status
          await JobModel.updateOne(
            {
              importer: i.importer,
              "jobs.job_no": jobData.job_no,
            },
            {
              $set: { "jobs.$.custom_house": jobData.custom_house },
            }
          );
        }
      }
    }

    res.status(200).send("Jobs added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding jobs.");
  }
});

export default router;
