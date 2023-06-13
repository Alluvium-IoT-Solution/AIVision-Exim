import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.put("/:client/updatejob/:jobNo", async (req, res) => {
  const client = req.params.client;
  const jobNo = req.params.jobNo;
  const {
    arrival_date,
    free_time,
    detention_from,
    remarks,
    status,
    detailed_status,
    bill_of_lading_date,
  } = req.body;
  try {
    const clientDoc = await JobModel.findOne({ client: client });

    if (!clientDoc) {
      return res.status(404).json({ error: "Client not found" });
    }

    const matchingJob = clientDoc.jobs.find((job) => job.job_number === jobNo);

    if (!matchingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    matchingJob.arrival_date = arrival_date;
    matchingJob.free_time = free_time;
    matchingJob.detention_from = detention_from;
    matchingJob.remarks = remarks;
    matchingJob.status = status;
    matchingJob.detailed_status = detailed_status;
    matchingJob.bill_of_lading_date = bill_of_lading_date;
    console.log(matchingJob.detailed_status, detailed_status);

    const updatedClient = await clientDoc.save();

    res.status(200).json(matchingJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
