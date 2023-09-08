// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/getYears", async (req, res) => {
//   try {
//     const pipeline = [
//       // Unwind the data array to separate individual jobs
//       { $unwind: "$data" },

//       // Group by year to get distinct years
//       {
//         $group: {
//           _id: null,
//           years: { $addToSet: "$year" },
//         },
//       },

//       // Project to shape the output
//       {
//         $project: {
//           _id: 0,
//           years: 1,
//         },
//       },
//     ];

//     const result = await JobModel.aggregate(pipeline);
//     const yearsList = result[0]?.years;

//     // Sort the yearsList in ascending order
//     yearsList && yearsList.sort();

//     res.status(200).json(yearsList);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while fetching years list.");
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getYears", async (req, res) => {
  try {
    const pipeline = [
      // Group by year to get distinct years
      {
        $group: {
          _id: "$year",
        },
      },

      // Sort the years in ascending order
      {
        $sort: {
          _id: 1,
        },
      },

      // Project to shape the output
      {
        $project: {
          year: "$_id",
          _id: 0,
        },
      },
    ];

    const result = await JobModel.aggregate(pipeline);

    // Extract the sorted years from the result
    const yearsList = result.map((item) => item.year);

    res.status(200).json(yearsList);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching years list.");
  }
});

export default router;
