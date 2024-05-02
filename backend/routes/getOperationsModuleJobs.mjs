import express from "express";
import JobModel from "../models/jobModel.mjs";
import User from "../models/userModel.mjs";

const router = express.Router();

router.get("/api/getOperationsModuleJobs/:email/:date", async (req, res) => {
  const { email, date } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const port = user.port;

  let additionalCondition = {
    examination_planning_date: { $eq: date },
  };

  if (
    email !== "mahesh@surajforwarders.com" &&
    email !== "paras@surajforwarders.com" &&
    email !== "operations@surajforwarders.com"
  ) {
    additionalCondition.custom_house = { $in: port };
  }

  if (email === "majhar@surajforwarders.com") {
    // Exclude jobs with out_of_charge present and equal to "" or
    additionalCondition.out_of_charge = { $in: ["", "--"] };
  } else if (email === "prakash@surajforwarders.com") {
    // Exclude jobs with delivery_date equal to ""
    additionalCondition.delivery_date = { $eq: "" };
  }

  const jobs = await JobModel.find(
    {
      $or: [{ examinationPlanning: true }, { examinationPlanning: "true" }],
      ...additionalCondition,
    },
    "job_no be_no be_date container_nos examination_planning_date examination_planning_time pcv_date custom_house out_of_charge year"
  ).sort({ examination_planning_date: 1 });

  res.status(200).send(jobs);
});

export default router;
