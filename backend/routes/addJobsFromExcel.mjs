// import express from "express";
// import JobModel from "../models/jobModel.mjs";
// const router = express.Router();
// router.post("/api/jobs/addJob", async (req, res) => {
//   const jsonData = req.body;

//   try {
//     // Extract the unique identifiers (year and job_no) from the documents
//     const uniqueIdentifiers = jsonData.map((data) => ({
//       year: data.year,
//       job_no: data.job_no,
//     }));

//     // Use bulkWrite to perform the insert or update in a batch
//     const bulkOperations = uniqueIdentifiers.map((identifier) => {
//       const dataToUpdate = jsonData.find(
//         (data) =>
//           data.year === identifier.year && data.job_no === identifier.job_no
//       );
//       // Set the status field based on the bill_date value
//       const status =
//         dataToUpdate.bill_date === "" || dataToUpdate.bill_date === "--"
//           ? "Pending"
//           : "Completed";

//       return {
//         updateOne: {
//           filter: identifier,
//           update: {
//             $set: {
//               ...dataToUpdate,
//               status: status,
//             },
//           },
//           upsert: true, // Create if it doesn't exist
//         },
//       };
//     });

//     // Execute the bulkWrite operation
//     await JobModel.bulkWrite(bulkOperations);

//     res.status(200).json({ message: "Jobs added successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// });

// export default router;

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
