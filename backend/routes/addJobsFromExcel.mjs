// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.post("/api/jobs/addJob", async (req, res) => {
//   const jsonData = req.body;

//   if (!Array.isArray(jsonData)) {
//     return res
//       .status(400)
//       .json({ error: "Invalid JSON format. Expecting an array of job data." });
//   }

//   try {
//     const bulkOperations = [];

//     for (const jobEntry of jsonData) {
//       const { year, data } = jobEntry;
//       if (!data || !Array.isArray(data)) {
//         continue; // Skip processing if data is missing or not an array
//       }

//       for (const importerData of data) {
//         const { importerURL, jobs } = importerData;

//         if (!importerURL || !Array.isArray(jobs)) {
//           continue; // Skip processing if essential data is missing
//         }

//         // Determine the status based on the bill date logic for each job
//         const importerJobs = jobs.map((job) => {
//           const { bill_date } = job;
//           const status =
//             bill_date.trim() === "" || bill_date.trim() === "--"
//               ? "Pending"
//               : "Completed";
//           return {
//             ...job,
//             status,
//           };
//         });

//         // Push the update operation for each importer to the bulk operations array
//         const query = { year, "data.importerURL": importerURL };
//         const update = { $set: { "data.$[element].jobs": importerJobs } };
//         const options = {
//           arrayFilters: [{ "element.importerURL": importerURL }],
//         };
//         bulkOperations.push({
//           updateOne: {
//             filter: query,
//             update,
//             arrayFilters: options.arrayFilters,
//           },
//         });
//       }
//     }

//     // Find the documents that would be matched by the update operation
//     const matchedDocuments = await JobModel.find({
//       $or: bulkOperations.map((operation) => operation.updateOne.filter),
//     });

//     // Get the importerURLs of the matched documents
//     const matchedImporterURLs = matchedDocuments.map(
//       (doc) => doc.data[0].importerURL
//     );

//     // Filter the bulkOperations to only include documents that do not match
//     const newDocuments = bulkOperations.filter(
//       (operation) =>
//         !matchedImporterURLs.includes(
//           operation.updateOne.filter["data.importerURL"]
//         )
//     );

//     // Execute the bulk write operation for new documents
//     if (newDocuments.length > 0) {
//       const newImporterURLs = newDocuments.map(
//         (operation) => operation.updateOne.filter["data.importerURL"]
//       );
//       const newImporterJobs = jsonData.filter((entry) =>
//         newImporterURLs.includes(entry.data[0].importerURL)
//       );

//       // Determine the status based on the bill date logic for each job
//       newImporterJobs.forEach((importerEntry) => {
//         importerEntry.data[0].jobs.forEach((job) => {
//           const { bill_date } = job;
//           job.status =
//             bill_date.trim() === "" || bill_date.trim() === "--"
//               ? "Pending"
//               : "Completed";
//         });
//       });

//       const newDocsToInsert = newImporterJobs.map((entry) => ({
//         year: entry.year,
//         data: entry.data,
//       }));

//       await JobModel.insertMany(newDocsToInsert);
//     }

//     // Execute the bulk write operation for updating existing documents
//     const result = await JobModel.bulkWrite(bulkOperations);

//     return res
//       .status(200)
//       .json({ message: "Data added/updated successfully." });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// });

// export default router;

//******************************************************************************************************

// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.post("/api/jobs/addJob", async (req, res) => {
//   const jsonData = req.body;

//   try {
//     // Iterate through each object in the JSON array
//     for (const data of jsonData) {
//       const { year, job_no, bill_date } = data;
//       console.log(year, job_no, bill_date);

//       // Check if a document with the same year and job_no exists in the database
//       const existingJob = await JobModel.findOne({ year, job_no });

//       // Create a new job document with the incoming data
//       const newJob = new JobModel(data);

//       if (!existingJob) {
//         // Document does not exist, add it and set status based on bill_date
//         if (bill_date === "" || bill_date === "--") {
//           newJob.status = "Pending";
//         } else {
//           newJob.status = "Completed";
//         }

//         // Save the new document to the database
//         await newJob.save();
//       } else {
//         // Document exists, update it and set status based on bill_date
//         if (bill_date === "" || bill_date === "--") {
//           existingJob.status = "Pending";
//         } else {
//           existingJob.status = "Completed";
//         }

//         // Update the existing document in the database
//         await existingJob.save();
//       }
//     }

//     res.status(201).json({ message: "Jobs added/updated successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// });

// export default router;

// ***************************************************************************************************

import express from "express";
import JobModel from "../models/jobModel.mjs";
const router = express.Router();
router.post("/api/jobs/addJob", async (req, res) => {
  const jsonData = req.body;

  try {
    // Extract the unique identifiers (year and job_no) from the documents
    const uniqueIdentifiers = jsonData.map((data) => ({
      year: data.year,
      job_no: data.job_no,
    }));

    // Use bulkWrite to perform the insert or update in a batch
    const bulkOperations = uniqueIdentifiers.map((identifier) => {
      const dataToUpdate = jsonData.find(
        (data) =>
          data.year === identifier.year && data.job_no === identifier.job_no
      );
      // Set the status field based on the bill_date value
      const status =
        dataToUpdate.bill_date === "" || dataToUpdate.bill_date === "--"
          ? "Pending"
          : "Completed";

      return {
        updateOne: {
          filter: identifier,
          update: {
            $set: {
              ...dataToUpdate,
              status: status,
            },
          },
          upsert: true, // Create if it doesn't exist
        },
      };
    });

    // Execute the bulkWrite operation
    await JobModel.bulkWrite(bulkOperations);

    res.status(200).json({ message: "Jobs added successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
