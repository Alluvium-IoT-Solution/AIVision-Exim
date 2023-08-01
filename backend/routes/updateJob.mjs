import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.put("/api/:importer/updatejob/:year/:jobNo", async (req, res) => {
  const { importer, jobNo, year } = req.params;

  const {
    eta,
    checked,
    status,
    detailed_status,
    container_nos,
    free_time,
    description,
    checklist,
    do_validity,
    remarks,
  } = req.body;
  console.log({
    eta,
    checked,
    status,
    detailed_status,
    container_nos,
    free_time,
    description,
    checklist,
    do_validity,
    remarks,
  });

  try {
    function addDaysToDate(dateString, days) {
      var date = new Date(dateString);
      date.setDate(date.getDate() + days);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    }

    const clientDoc = await JobModel.findOne({
      year,
      "data.importerURL": importer,
    });

    if (!clientDoc) {
      return res.status(404).json({ error: "Importer not found" });
    }

    const dataItem = clientDoc.data.find(
      (item) => item.importerURL === importer
    );

    if (!dataItem) {
      return res.status(404).json({ error: "Importer not found" });
    }

    const matchingJob = dataItem.jobs.find((job) => job.job_no === jobNo);

    if (!matchingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update the matching job with the provided data
    matchingJob.eta = eta;
    matchingJob.status = status;
    matchingJob.detailed_status = detailed_status;
    matchingJob.free_time = free_time;
    matchingJob.description = description;
    matchingJob.checklist = checklist;
    matchingJob.do_validity = do_validity;
    matchingJob.remarks = remarks;

    if (checked) {
      matchingJob.container_nos = container_nos.map((container) => {
        return {
          ...container,
          arrival_date: arrival_date,
          detention_from:
            arrival_date === ""
              ? ""
              : addDaysToDate(arrival_date, parseInt(free_time)),
        };
      });
    } else {
      matchingJob.container_nos = container_nos.map((container) => {
        const { arrival_date } = container;
        return {
          ...container,
          detention_from:
            arrival_date === ""
              ? ""
              : addDaysToDate(arrival_date, parseInt(free_time)),
        };
      });
    }

    // Mark the matchingJob as modified
    dataItem.markModified("jobs");

    // Save the parent clientDoc (which contains the updated subdocument) to the database
    const updatedClient = await clientDoc.save();

    res.status(200).json(matchingJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
