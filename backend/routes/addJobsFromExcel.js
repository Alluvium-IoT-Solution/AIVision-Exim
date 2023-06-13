import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.post("/jobs/addjob", async (req, res) => {
  const requestData = req.body; // Assuming the frontend sends an array of data

  try {
    for (const i of requestData) {
      for (const jobData of i.data) {
        const existingJob = await JobModel.findOne({
          client: i.client,
          "jobs.job_number": jobData.job_number,
        });

        if (existingJob) {
          // Duplicate job_number found, skip adding the job
          continue;
        }

        const job = await JobModel.findOne({ client: i.client });

        if (job) {
          job.jobs.push(jobData); // Append the job object to the existing jobs array in the document
          await job.save(); // Save the updated document
        } else {
          await JobModel.create({ client: i.client, jobs: [jobData] }); // Create a new document with the client and jobs array
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
