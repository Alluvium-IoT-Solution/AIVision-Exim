import express from "express";
import PrData from "../../models/pr.mjs";
import Tr from "../../models/tr.mjs";

const router = express.Router();

// Assuming you are handling this logic in an Express route handler
router.post("/api/updateContainer", async (req, res) => {
  try {
    const {
      tr_no,
      container_number,
      tare_weight,
      net_weight,
      goods_pickup,
      goods_delivery,
      own_hired,
      type_of_vehicle,
      driver_name,
      driver_phone,
      seal_no,
      gross_weight,
      vehicle_no,
      pr_no,
    } = req.body;

    // Get the last TR document
    const lastTr = await Tr.findOne().sort({ _id: -1 });

    let lastTrNo;
    if (lastTr) {
      lastTrNo = parseInt(lastTr.tr_no) + 1;
    } else {
      lastTrNo = 1;
    }
    const paddedNo = lastTrNo.toString().padStart(5, "0");
    const fiveDigitNo = "0".repeat(5 - paddedNo.length) + paddedNo;
    const tr = `TR/${pr_no.split("/")[1]}/${fiveDigitNo}/${
      pr_no.split("/")[3]
    }`;

    // Create and save new Tr document
    await Tr.create({ tr_no: fiveDigitNo.toString() });

    // Find the document with matching pr_no and is at the last index
    const lastPrDocument = await PrData.findOne({ pr_no })
      .sort({ _id: -1 })
      .exec();
    if (!lastPrDocument) {
      return res.status(404).json({ error: "PR document not found" });
    }

    // Find the index of the container with matching container_number in the lastPrDocument
    const containerIndex = lastPrDocument.containers.findIndex(
      (container) => container.container_number === container_number
    );

    // If container not found and there's a document without container number, update it
    if (containerIndex === -1) {
      const containerWithoutNumberIndex = lastPrDocument.containers.findIndex(
        (container) => !container.container_number
      );
      if (containerWithoutNumberIndex !== -1) {
        const containerWithoutNumber =
          lastPrDocument.containers[containerWithoutNumberIndex];
        containerWithoutNumber.container_number = container_number;
        containerWithoutNumber.tare_weight = tare_weight;
        containerWithoutNumber.net_weight = net_weight;
        containerWithoutNumber.goods_pickup = goods_pickup;
        containerWithoutNumber.goods_delivery = goods_delivery;
        containerWithoutNumber.own_hired = own_hired;
        containerWithoutNumber.type_of_vehicle = type_of_vehicle;
        containerWithoutNumber.driver_name = driver_name;
        containerWithoutNumber.driver_phone = driver_phone;
        containerWithoutNumber.seal_no = seal_no;
        containerWithoutNumber.gross_weight = gross_weight;
        containerWithoutNumber.vehicle_no = vehicle_no;
        containerWithoutNumber.tr_no = tr;
      } else {
        // If no document without container number, create a new one
        lastPrDocument.containers.push({
          container_number,
          tare_weight,
          net_weight,
          goods_pickup,
          goods_delivery,
          own_hired,
          type_of_vehicle,
          driver_name,
          driver_phone,
          seal_no,
          gross_weight,
          vehicle_no,
          tr_no: tr,
        });
      }
    } else {
      // Update the fields of the matching container with the data sent in req.body
      const matchingContainer = lastPrDocument.containers[containerIndex];
      const trDigit = tr_no.split("/")[2];

      if (matchingContainer.tr_no !== tr_no) {
        // Check if tr_no exists in Tr model
        const trDocument = await Tr.findOne({ trDigit }).exec();

        if (trDocument) {
          return res.status(200).json({ message: "LR no already exists" });
        }
      }
      matchingContainer.tare_weight = tare_weight;
      matchingContainer.net_weight = net_weight;
      matchingContainer.goods_pickup = goods_pickup;
      matchingContainer.goods_delivery = goods_delivery;
      matchingContainer.own_hired = own_hired;
      matchingContainer.type_of_vehicle = type_of_vehicle;
      matchingContainer.driver_name = driver_name;
      matchingContainer.driver_phone = driver_phone;
      matchingContainer.seal_no = seal_no;
      matchingContainer.gross_weight = gross_weight;
      matchingContainer.vehicle_no = vehicle_no;

      // Check if tr_no is present, if not, update it
      if (!matchingContainer.tr_no) {
        matchingContainer.tr_no = tr;
      }
    }

    // Save the updated document
    await lastPrDocument.save();

    res.status(200).json({ message: "Container data updated successfully" });
  } catch (error) {
    console.error("Error updating container data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
