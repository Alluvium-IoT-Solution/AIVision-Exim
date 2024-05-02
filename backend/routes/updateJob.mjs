import express from "express";
import JobModel from "../models/jobModel.mjs";
import PrModel from "../models/prModel.mjs";
import PrData from "../models/pr.mjs";

const router = express.Router();

router.put("/api/updatejob/:year/:jobNo", async (req, res) => {
  const { jobNo, year } = req.params;

  try {
    // 1. Retrieve the matching job document
    const matchingJob = await JobModel.findOne({ year, job_no: jobNo });

    if (!matchingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // 2. Determine the branch_code based on the custom_house field
    let branch_code;
    switch (matchingJob.custom_house) {
      case "THAR DRY PORT":
        branch_code = "SND";
        break;
      case "ICD Sabarmati, Ahmedabad":
        branch_code = "KHD";
        break;
      case "HAZIRA":
        branch_code = "HZR";
        break;
      case "MUNDRA":
        branch_code = "MND";
        break;
      case "ICD SACHANA":
        branch_code = "SCH";
        break;
      case "BARODA":
        branch_code = "BRD";
        break;
      case "AIRPORT":
        branch_code = "AIR";
        break;
      default:
        break;
    }

    // 3. Check if the transporter is "SRCC" in the request body
    if (req.body.container_nos) {
      const transporterContainers = req.body.container_nos.filter(
        (container) => container.transporter === "SRCC"
      );

      if (transporterContainers.length > 0) {
        // 4. Fetch the last document from PrModel and generate a 5-digit number
        const lastPr = await PrModel.findOne().sort({ _id: -1 });
        let lastPrNo;
        if (lastPr) {
          lastPrNo = parseInt(lastPr.pr_no) + 1;
        } else {
          lastPrNo = 1;
        }
        const paddedNo = lastPrNo.toString().padStart(5, "0");
        const fiveDigitNo = "0".repeat(5 - paddedNo.length) + paddedNo;
        console.log("Five Digit No:", fiveDigitNo);

        // 5. Update the job model
        matchingJob.pr_no = `PR/${branch_code}/${fiveDigitNo}/${matchingJob.year}`;

        // 6. Create a new document in PrData collection
        const newPrData = new PrData({
          pr_date: new Date().toLocaleDateString(),
          pr_no: matchingJob.pr_no,
          branch: matchingJob.custom_house,
          consignor: matchingJob.importer,
          consignee: matchingJob.importer,
          container_type: "",
          container_count: transporterContainers.length,
          gross_weight: matchingJob.gross_weight,
          type_of_vehicle: "",
          description: "",
          shipping_line: matchingJob.shipping_line_airline,
          container_loading: "",
          container_offloading: "",
          do_validity: matchingJob.do_validity,
          document_no: matchingJob.be_no,
          document_date: matchingJob.be_date,
          goods_pickup: "",
          goods_delivery: "",
          containers: transporterContainers,
        });

        // Save the new PrData document to the database
        await newPrData.save();

        const newPr = new PrModel({
          pr_no: fiveDigitNo,
        });

        // Save the new PrModel document to the database
        await newPr.save();
      }
    }

    // Step 7: Add remaining fields from req.body to matching job
    Object.assign(matchingJob, req.body);

    // Step 8: Save the updated job document
    await matchingJob.save();

    res.status(200).json(matchingJob);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
