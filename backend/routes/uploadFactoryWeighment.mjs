import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.post("/api/uploadFactoryWeighmentSlip", async (req, res) => {
  const { factory_weighment_slip, job_no, year } = req.body;

  try {
    // Find the document with matching job_no and year
    const jobDocument = await JobModel.findOne({ job_no, year });

    if (!jobDocument) {
      return res.status(404).json({ error: "Job document not found" });
    }

    // Add the factory_weighment_slip to the document
    jobDocument.factory_weighment_slip = factory_weighment_slip;

    // Save the updated document
    await jobDocument.save();

    return res
      .status(200)
      .json({ message: "Factory weighment slip added successfully" });
  } catch (error) {
    console.error("Error uploading factory weighment slip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
