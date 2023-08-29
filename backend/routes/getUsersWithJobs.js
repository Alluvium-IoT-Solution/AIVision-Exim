const express = require("express");
const User = require("../models/userModel.js");
const JobModel = require("../models/jobModel.js");

const router = express.Router();

router.get("/api/getUsersWithJobs/:year", async (req, res) => {
  try {
    const year = req.params.year; // Get the "year" parameter from the request params.

    const users = await User.find({}, { username: 1, importers: 1 });

    const usersWithJobs = await Promise.all(
      users.map(async (user) => {
        const { username, importers } = user;
        let totalJobsCount = 0;

        const yearJobs = await JobModel.findOne({ year: year });

        if (yearJobs) {
          for (const importerData of importers) {
            const { importer } = importerData;
            const importerJobs = yearJobs.data.filter(
              (d) => d.importer === importer
            );

            if (importerJobs.length > 0) {
              const pendingJobs = importerJobs[0].jobs.filter(
                (job) => job.status.toLowerCase() === "pending"
              );
              totalJobsCount += pendingJobs.length;
            }
          }
        }

        return { username, jobsCount: totalJobsCount };
      })
    );

    res.json(usersWithJobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users with jobs" });
  }
});

module.exports = router;
