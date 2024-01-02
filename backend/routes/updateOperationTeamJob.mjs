import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.put("/api/updateOperationTeamJob/:year/:jobNo", async (req, res) => {
  const { jobNo, year } = req.params;

  const { status, detailed_status, container_nos, examination_date } = req.body;

  try {
    const matchingJob = await JobModel.findOne({
      year,
      job_no: jobNo,
    });

    if (!matchingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update the matching job with the provided data

    matchingJob.status = status;
    matchingJob.detailed_status = detailed_status;
    matchingJob.examination_date = examination_date;

    matchingJob.container_nos = container_nos.map((container) => {
      return {
        ...container,
        container_images: container.container_images,
        weighment_slip_images: container.weighment_slip_images,
        container_close_before_examination:
          container.container_close_before_examination,
        container_open_before_examination:
          container.container_open_before_examination,
        seal_intact: container.seal_intact,
        first_door_open: container.first_door_open,
        second_door_open: container.second_door_open,
        loose_material_photo: container.loose_material_photo,
        container_close_after_examination:
          container.container_close_after_examination,
        physical_weight: container.physical_weight,
        tare_weight: container.tare_weight,
        actual_weight: container.actual_weight,
        weight_shortage: container.weight_shortage,
        pre_weighment: container.pre_weighment,
        post_weighment: container.post_weighment,
        net_weight: container.net_weight,
      };
    });

    // Save the parent clientDoc (which contains the updated subdocument) to the database
    const updatedClient = await matchingJob.save();

    res.status(200).json(matchingJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
