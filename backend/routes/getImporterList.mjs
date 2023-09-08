// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/getImporterList/:year", async (req, res) => {
//   try {
//     const selectedYear = req.params.year;

//     const pipeline = [
//       // Match documents for the specific year
//       { $match: { year: selectedYear } },

//       // Unwind the data array to separate individual jobs
//       { $unwind: "$data" },

//       // Group by importer to get distinct importers
//       {
//         $group: {
//           _id: "$data.importer",
//           importerURL: { $first: "$data.importerURL" }, // Take the first importerURL for each importer
//         },
//       },

//       // Project to shape the output
//       {
//         $project: {
//           _id: 0,
//           importerName: "$_id",
//           importer: "$_id",
//           importerURL: 1, // Include the importerURL field in the output
//         },
//       },

//       // Sort the results by importer name in ascending order
//       {
//         $sort: {
//           importerName: 1,
//         },
//       },
//     ];

//     const importers = await JobModel.aggregate(pipeline);
//     res.status(200).json(importers);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while fetching importers.");
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getImporterList/:year", async (req, res) => {
  try {
    const selectedYear = req.params.year;

    // Use Mongoose aggregation to group and retrieve unique importer and importerURL values
    const uniqueImporters = await JobModel.aggregate([
      {
        $match: { year: selectedYear }, // Filter documents by year
      },
      {
        $group: {
          _id: { importer: "$importer", importerURL: "$importerURL" },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          importer: "$_id.importer",
          importerURL: "$_id.importerURL",
        },
      },
      {
        $sort: {
          importer: 1, // Sort importer in ascending order (alphabetical)
        },
      },
    ]);

    res.status(200).json(uniqueImporters);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching importers.");
  }
});

export default router;
