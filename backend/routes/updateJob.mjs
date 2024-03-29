import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.put("/api/updatejob/:year/:jobNo", async (req, res) => {
  const { jobNo, year } = req.params;

  const {
    vessel_berthing_date,
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
    out_of_charge,
    arrival_date,
    transporter,
    doPlanning,
    do_planning_date,
    examinationPlanning,
    examination_planning_date,
    do_copies,
  } = req.body;

  console.log(examinationPlanning);

  try {
    function addDaysToDate(dateString, days) {
      var date = new Date(dateString);
      date.setDate(date.getDate() + days);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    }

    const matchingJob = await JobModel.findOne({
      year,
      job_no: jobNo,
    });

    if (!matchingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update the matching job with the provided data
    matchingJob.vessel_berthing_date = vessel_berthing_date
      .split("-")
      .reverse()
      .join("-");
    matchingJob.vessel_berthing_date = new Date(vessel_berthing_date)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "-");

    matchingJob.status = status;
    matchingJob.detailed_status = detailed_status;
    matchingJob.doPlanning = doPlanning;
    matchingJob.do_planning_date = do_planning_date;
    matchingJob.examinationPlanning = examinationPlanning;
    matchingJob.examination_planning_date = examination_planning_date;
    matchingJob.description = description;
    matchingJob.checklist = checklist;
    matchingJob.do_validity = do_validity;
    matchingJob.remarks = remarks;
    matchingJob.sims_reg_no =
      sims_reg_no !== undefined ? `STL-${sims_reg_no}` : "";
    matchingJob.pims_reg_no =
      pims_reg_no !== undefined ? `ORIGINAL-DPIIT-PPR-${pims_reg_no}` : "";
    matchingJob.nfmims_reg_no = nfmims_reg_no ? `MIN-${nfmims_reg_no}` : "";
    matchingJob.sims_date = sims_date;
    matchingJob.pims_date = pims_date;
    matchingJob.nfmims_date = nfmims_date;
    matchingJob.delivery_date = delivery_date;
    matchingJob.discharge_date = discharge_date;
    matchingJob.assessment_date = assessment_date;
    matchingJob.examination_date = examination_date;
    matchingJob.duty_paid_date = duty_paid_date;
    matchingJob.out_of_charge = out_of_charge;
    matchingJob.free_time = free_time;
    matchingJob.transporter = transporter;
    matchingJob.do_copies = do_copies;
    if (examinationPlanning === true || examinationPlanning === "true") {
      let currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert hours to 12-hour format
      let formattedHours = hours.toString().padStart(2, "0");
      let formattedMinutes = minutes.toString().padStart(2, "0");
      matchingJob.examination_planning_time = `${formattedHours}:${formattedMinutes} ${period}`;
    }

    if (checked) {
      matchingJob.container_nos = container_nos.map((container) => {
        return {
          ...container,
          arrival_date: arrival_date,
          weighment_slip_images: container.weighment_slip_images,
          detention_from:
            arrival_date === ""
              ? ""
              : addDaysToDate(arrival_date, parseInt(free_time)),
          physical_weight: container.physical_weight,
          tare_weight: container.tare_weight,
          actual_weight: container.actual_weight,
          weight_shortage: container.weight_shortage,
          weight_excess: container.weight_excess,
        };
      });
    } else {
      matchingJob.container_nos = container_nos.map((container) => {
        return {
          ...container,
          arrival_date: container.arrival_date,
          container_images: container.container_images,
          detention_from:
            arrival_date === ""
              ? ""
              : addDaysToDate(arrival_date, parseInt(free_time)),
        };
      });
    }

    // Save the parent clientDoc (which contains the updated subdocument) to the database
    const updatedClient = await matchingJob.save();

    res.status(200).json(matchingJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
