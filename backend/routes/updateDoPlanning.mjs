import express from "express";
import schedule from "node-schedule";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

// schedule.scheduleJob("*/10 * * * * *", async () => {
schedule.scheduleJob("1 0 * * *", async () => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const doPlanningJobs = await JobModel.find({
      do_planning_date: currentDate,
    });

    const examinationPlanningJobs = await JobModel.find({
      examination_planning_date: currentDate,
    });

    // Update doPlanning field for doPlanningJobs
    for (const job of doPlanningJobs) {
      job.doPlanning = true;
      await job.save(); // Save the updated job
    }

    // Update examinationPlanning field for examinationPlanningJobs
    for (const job of examinationPlanningJobs) {
      job.examinationPlanning = true;
      await job.save(); // Save the updated job
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
