import express from "express";
import PrData from "../../models/pr.mjs";
import PrModel from "../../models/prModel.mjs";

const router = express.Router();

router.post("/api/updatePr", async (req, res) => {
  const {
    pr_no,
    type_of_vehicle,
    goods_pickup,
    goods_delivery,
    container_count,
    containers,
    ...updatedJobData
  } = req.body; // Extract relevant data from req.body
  console.log(pr_no, container_count);

  try {
    let prDataToUpdate = await PrData.findOne({ pr_no }).sort({ _id: -1 });

    if (prDataToUpdate) {
      // If document found, update it
      prDataToUpdate.set({
        type_of_vehicle,
        goods_pickup,
        goods_delivery,
        containers,
        container_count,
        ...updatedJobData,
      });

      // Update type_of_vehicle, goods_pickup, and goods_delivery in each container
      containers.forEach((container) => {
        container.type_of_vehicle = type_of_vehicle;
        container.goods_pickup = goods_pickup;
        container.goods_delivery = goods_delivery;
      });
      prDataToUpdate.containers = containers;

      await prDataToUpdate.save();
      res.status(200).send({ message: "PR updated successfully" });
    } else {
      // Determine the branch_code based on the custom_house field
      let branch_code;
      switch (req.body.branch) {
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

      // Fetch the last document from PrModel and generate a 5-digit number
      const lastPr = await PrModel.findOne().sort({ _id: -1 });

      let lastPrNo;
      if (lastPr) {
        lastPrNo = parseInt(lastPr.pr_no) + 1;
      } else {
        lastPrNo = 1;
      }
      const paddedNo = lastPrNo.toString().padStart(5, "0");
      const fiveDigitNo = "0".repeat(5 - paddedNo.length) + paddedNo;

      // Construct the new pr_no
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const isBeforeApril =
        currentDate.getMonth() < 3 ||
        (currentDate.getMonth() === 3 && currentDate.getDate() < 1); // April is month index 3
      const financialYearStart = isBeforeApril ? currentYear - 1 : currentYear;
      const financialYearEnd = financialYearStart + 1;
      const financialYear = `${financialYearStart
        .toString()
        .slice(2)}-${financialYearEnd.toString().slice(2)}`;

      const newPrNo = `PR/${branch_code}/${fiveDigitNo}/${financialYear}`;

      let containerArray = [];
      for (let i = 0; i < container_count; i++) {
        containerArray.push({
          type_of_vehicle,
          goods_pickup,
          goods_delivery,
        });
      }

      // Create a new PrData document
      const newPrData = new PrData({
        pr_date: new Date().toLocaleDateString(),
        pr_no: newPrNo,
        branch: req.body.branch,
        consignor: req.body.consignor,
        consignee: req.body.consignee,
        container_type: req.body.container_type,
        container_count: containers?.length || 0,
        gross_weight: req.body.gross_weight,
        type_of_vehicle: req.body.type_of_vehicle,
        description: req.body.description,
        shipping_line: req.body.shipping_line_airline,
        container_loading: req.body.container_loading,
        container_offloading: req.body.container_offloading,
        do_validity: req.body.do_validity,
        document_no: req.body.document_no,
        document_date: req.body.be_date,
        goods_pickup: req.body.goods_pickup,
        goods_delivery: req.body.goods_delivery,
        containers: containerArray,
      });

      // Save the new PrData document to the database
      await newPrData.save();

      const newPr = new PrModel({
        pr_no: fiveDigitNo,
      });

      // Save the new PrModel document to the database
      await newPr.save();

      res.status(200).send({ message: "New PR added successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
