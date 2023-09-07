const express = require("express");
const JobModel = require("../models/jobModel.js");

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
    sims_reg_no,
    pims_reg_no,
    nfmims_reg_no,
    sims_date,
    pims_date,
    nfmims_date,
    delivery_date,
    discharge_date,
    assessment_date,
    examination_date,
    duty_paid_date,
    out_of_charge_date,
  } = req.body;

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
    matchingJob.sims_reg_no = sims_reg_no !== "" ? `STL-${sims_reg_no}` : "";
    matchingJob.pims_reg_no =
      pims_reg_no !== "" ? `ORIGINAL-DPIIT-PPR-${pims_reg_no}` : "";
    matchingJob.nfmims_reg_no = nfmims_reg_no ? `MIN-${nfmims_reg_no}` : "";
    matchingJob.sims_date = sims_date;
    matchingJob.pims_date = pims_date;
    matchingJob.nfmims_date = nfmims_date;
    matchingJob.delivery_date = delivery_date;
    matchingJob.discharge_date = discharge_date;
    matchingJob.assessment_date = assessment_date;
    matchingJob.examination_date = examination_date;
    matchingJob.duty_paid_date = duty_paid_date;
    matchingJob.out_of_charge_date = out_of_charge_date;

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

module.exports = router;