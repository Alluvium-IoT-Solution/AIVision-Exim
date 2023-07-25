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

//         // Job number doesn't exist
//         if (!existingJob) {
//           // Bill date is either empty or "--", status pending
//           if (
//             jobData.bill_date.trim() === "" ||
//             jobData.bill_date.trim() === "--"
//           ) {
//             await JobModel.updateOne(
//               { importer: i.importer, importerName: i.importerName },
//               { $push: { jobs: { ...jobData, status: "Pending" } } },
//               { upsert: true }
//             );
//           } else {
//             // Bill date exists, status completed
//             await JobModel.updateOne(
//               { importer: i.importer, importerName: i.importerName },
//               {
//                 $push: {
//                   jobs: {
//                     ...jobData,
//                     status: "Completed",
//                   },
//                 },
//               },
//               { upsert: true }
//             );
//           }
//         }
//         // Job number exists
//         else {
//           // Bill date is either empty or "--", status pending
//           if (
//             jobData.bill_date.trim() === "" ||
//             jobData.bill_date.trim() === "--"
//           ) {
//             await JobModel.updateOne(
//               {
//                 importer: i.importer,
//                 "jobs.job_no": jobData.job_no,
//               },
//               { $set: { "jobs.$.status": "Pending" } }
//             );
//           } else {
//             // Bill date exists, status completed
//             await JobModel.updateOne(
//               {
//                 importer: i.importer,
//                 "jobs.job_no": jobData.job_no,
//               },
//               { $set: { "jobs.$.status": "Completed" } }
//             );
//           }
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
      const importerName = i.importer.trim() === "" ? "" : i.importerName;

      for (const jobData of i.data) {
        const existingJob = await JobModel.findOne({
          importer: i.importer,
          "jobs.job_no": jobData.job_no,
        });

        // Job number doesn't exist
        if (!existingJob) {
          // Bill date is either empty or "--", status pending
          if (
            jobData.bill_date.trim() === "" ||
            jobData.bill_date.trim() === "--"
          ) {
            await JobModel.updateOne(
              { importer: i.importer, importerName: importerName },
              { $push: { jobs: { ...jobData, status: "Pending" } } },
              { upsert: true }
            );
          } else {
            // Bill date exists, status completed
            await JobModel.updateOne(
              { importer: i.importer, importerName: importerName },
              {
                $push: {
                  jobs: {
                    ...jobData,
                    status: "Completed",
                  },
                },
              },
              { upsert: true }
            );
          }
        }
        // Job number exists
        else {
          // Bill date is either empty or "--", status pending
          if (
            jobData.bill_date.trim() === "" ||
            jobData.bill_date.trim() === "--"
          ) {
            await JobModel.updateOne(
              {
                importer: i.importer,
                "jobs.job_no": jobData.job_no,
              },
              { $set: { "jobs.$.status": "Pending" } }
            );
          } else {
            // Bill date exists, status completed
            await JobModel.updateOne(
              {
                importer: i.importer,
                "jobs.job_no": jobData.job_no,
              },
              { $set: { "jobs.$.status": "Completed" } }
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
