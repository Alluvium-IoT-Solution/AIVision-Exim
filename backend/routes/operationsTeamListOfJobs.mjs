import express from "express";
import JobModel from "../models/jobModel.mjs";
import User from "../models/userModel.mjs";

const router = express.Router();

router.get("/api/operationsTeamListOfJobs/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const port = user.port;

  let additionalCondition = {};

  if (
    email !== "mahesh@surajforwarders.com" &&
    email !== "paras@surajforwarders.com" &&
    email !== "operations@surajforwarders.com"
  ) {
    additionalCondition = {
      custom_house: { $in: port },
    };
  }

  const jobs = await JobModel.find(
    {
      be_no: { $exists: true, $ne: "" },
      bill_date: "",
      ...additionalCondition,
    },
    "job_no be_no be_date container_nos"
  );

  res.status(200).send(jobs);
});

export default router;
