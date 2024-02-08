import express from "express";
import JobModel from "../models/jobModel.mjs";
import User from "../models/userModel.mjs";

const router = express.Router();

router.get("/api/getOperationsModuleJobs/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const port = user.port;
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "yyyy-mm-dd" format

  let additionalCondition = {
    examination_planning_date: { $gte: currentDate },
  };

  if (
    email !== "mahesh@surajforwarders.com" &&
    email !== "paras@surajforwarders.com" &&
    email !== "operations@surajforwarders.com"
  ) {
    additionalCondition.custom_house = { $in: port };
  }

  const jobs = await JobModel.find(
    {
      examinationPlanning: "true",
      ...additionalCondition,
    },
    "job_no be_no be_date container_nos examination_planning_date"
  ).sort({ examination_planning_date: 1 }); // Sort in ascending order by examination_planning_date

  res.status(200).send(jobs);
});

export default router;
