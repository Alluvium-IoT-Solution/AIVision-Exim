import express from "express";
import JobModel from "../models/jobModel.mjs";
import User from "../models/userModel.mjs";

const router = express.Router();

router.get("/api/importerListToAssignJobs", async (req, res) => {
  try {
    // Get all importers from the JobModel
    const importers = await JobModel.aggregate([
      // Unwind the data array to separate individual jobs
      { $unwind: "$data" },
      { $unwind: "$data.jobs" },

      // Group by importer to get distinct importers
      {
        $group: {
          _id: "$data.importer",
        },
      },

      // Sort the importers by name in ascending order
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    // Fetch all assigned importers from the UserModel
    const assignedImporters = await User.distinct("importer");

    // Filter out the importers that are assigned to any user
    const unassignedImporters = importers.filter((importer) => {
      return !assignedImporters.includes(importer._id);
    });

    // Extract the importer names from the filtered importers
    const importerNames = unassignedImporters.map((importer) => importer._id);

    res.status(200).json(importerNames);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching importers.");
  }
});

export default router;
