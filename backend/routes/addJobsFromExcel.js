// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.post("/api/jobs/addJob", async (req, res) => {
//   const requestData = req.body; // Assuming the frontend sends an array of data

//   try {
//     for (const i of requestData) {
//       for (const jobData of i.data) {
//         const existingJob = await JobModel.findOne({
//           importer: i.importer,
//           "jobs.job_no": jobData.job_no,
//         });

//         if (existingJob) {
//           // Duplicate job_number found, skip adding the job
//           continue;
//         }

//         const job = await JobModel.findOne({ importer: i.importer });

//         if (job) {
//           job.jobs.push(jobData); // Append the job object to the existing jobs array in the document
//           await job.save(); // Save the updated document
//         } else {
//           await JobModel.create({ importer: i.importer, jobs: [jobData] }); // Create a new document with the importer and jobs array
//         }
//       }
//     }

//     res.status(200).send("Jobs added successfully");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while adding jobs.");
//   }
// });

// export default router;

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
            { $push: { jobs: { ...jobData, status: "Pending" } } },
            { upsert: true }
          );
        } else {
          // Job number exists, update the fields excluding the status field
          const { status, ...updatedFields } = jobData;

          if (status !== existingJob.jobs[0].status) {
            // If the status is different, update all fields
            await JobModel.updateOne(
              {
                importer: i.importer,
                "jobs.job_no": jobData.job_no,
              },
              {
                $set: { "jobs.$": jobData },
              }
            );
          } else {
            // If the status is the same, update other fields excluding the status
            await JobModel.updateOne(
              {
                importer: i.importer,
                "jobs.job_no": jobData.job_no,
              },
              {
                $set: { "jobs.$.custom_house": updatedFields.custom_house },
              }
            );
          }
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
