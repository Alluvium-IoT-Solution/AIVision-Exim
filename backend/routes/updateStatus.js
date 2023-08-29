const schedule = require("node-schedule");
const JobModel = require("../models/jobModel.js");
const express = require("express");
const router = express.Router();

// Schedule to run at every 10 seconds
schedule.scheduleJob("*/10 * * * * *", async () => {
  try {
    // Get the current date
    const currentDate = new Date();
    // Calculate the date for comparison (cargo_date + 1 day)
    const comparisonDate = new Date(currentDate);
    comparisonDate.setDate(comparisonDate.getDate() + 1);
    // Find the documents with the given year range
    const yearLastTwoDigits = currentDate.getFullYear() % 100;
    const year = yearLastTwoDigits;
    const nextYear = yearLastTwoDigits + 1;
    const documents = await JobModel.find({
      // year: `${year}-${nextYear}`,
    });

    if (!documents || !documents.length) {
      console.log("No documents found.");
      return;
    }
    for (const document of documents) {
      for (const importerData of document.data) {
        for (const job of importerData.jobs) {
          const cargoDate = new Date(job.cargo_date);
          if (
            cargoDate <= comparisonDate &&
            job.status.toLowerCase() === "pending"
          ) {
            console.log("true");
            job.status = "Completed";

            console.log(`${job.job_no}: status ${job.status}`);
            await document.save();
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
