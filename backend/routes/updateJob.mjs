import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.put("/api/:importer/updatejob/:jobNo", async (req, res) => {
  const importer = req.params.importer;
  const jobNo = req.params.jobNo;
  const {
    eta,
    checked,
    arrival_date,
    status,
    detailed_status,
    container_nos,
    free_time,
  } = req.body;

  try {
    const clientDoc = await JobModel.findOne({ importer: importer });
    function addDaysToDate(dateString, days) {
      var date = new Date(dateString);
      date.setDate(date.getDate() + days);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    }

    if (!clientDoc) {
      return res.status(404).json({ error: "Importer not found" });
    }

    const matchingJob = clientDoc.jobs.find((job) => job.job_no === jobNo);

    if (!matchingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    matchingJob.eta = eta;
    matchingJob.status = status;
    matchingJob.detailed_status = detailed_status;
    matchingJob.free_time = free_time;

    if (checked) {
      matchingJob.container_nos = container_nos.map((container) => {
        return {
          ...container,
          arrival_date: arrival_date,
          detention_from: addDaysToDate(arrival_date, parseInt(free_time)),
        };
      });
    } else {
      matchingJob.container_nos = container_nos.map((container) => {
        const { arrival_date } = container;
        return {
          ...container,
          detention_from: addDaysToDate(arrival_date, parseInt(free_time)),
        };
      });
    }

    const updatedClient = await clientDoc.save();

    res.status(200).json(matchingJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
