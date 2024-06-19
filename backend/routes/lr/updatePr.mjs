// import express from "express";
// import PrData from "../../models/pr.mjs";
// import PrModel from "../../models/prModel.mjs";

// const router = express.Router();

// router.post("/api/updatePr", async (req, res) => {
//   const {
//     pr_no,
//     branch,
//     type_of_vehicle,
//     goods_pickup,
//     goods_delivery,
//     container_count,
//     containers,
//     ...updatedJobData
//   } = req.body; // Extract relevant data from req.body

//   try {
//     let prDataToUpdate = await PrData.findOne({ pr_no }).sort({ _id: -1 });

//     if (prDataToUpdate) {
//       // Trying to update branch
//       if (prDataToUpdate.branch !== branch) {
//         // Check if any container has tr_no
//         const hasTrNo = prDataToUpdate.containers.some(
//           (container) => container.tr_no
//         );
//         if (hasTrNo) {
//           return res.status(200).send({
//             message: "Cannot update branch. Please delete LR to update branch.",
//           });
//         }
//         // Otherwise, update branch
//         prDataToUpdate.branch = branch;
//       }

//       prDataToUpdate.set({
//         type_of_vehicle,
//         goods_pickup,
//         goods_delivery,
//         containers,
//         container_count,
//         ...updatedJobData,
//       });
//       // Update type_of_vehicle, goods_pickup, and goods_delivery in each container
//       containers.forEach((container) => {
//         if (!container.tr_no) {
//           container.type_of_vehicle = type_of_vehicle;
//           container.goods_pickup = goods_pickup;
//           container.goods_delivery = goods_delivery;
//         }
//       });

//       prDataToUpdate.containers = containers;
//       await prDataToUpdate.save();
//       res.status(200).send({ message: "PR updated successfully" });
//     } else {
//       // Determine the branch_code based on the custom_house field
//       let branch_code;
//       switch (req.body.branch) {
//         case "THAR DRY PORT":
//           branch_code = "SND";
//           break;
//         case "ICD Sabarmati, Ahmedabad":
//           branch_code = "KHD";
//           break;
//         case "HAZIRA":
//           branch_code = "HZR";
//           break;
//         case "MUNDRA":
//           branch_code = "MND";
//           break;
//         case "ICD SACHANA":
//           branch_code = "SCH";
//           break;
//         case "BARODA":
//           branch_code = "BRD";
//           break;
//         case "AIRPORT":
//           branch_code = "AIR";
//           break;
//         default:
//           break;
//       }

//       // Fetch the last document from PrModel and generate a 5-digit number
//       const lastPr = await PrModel.findOne().sort({ _id: -1 });

//       let lastPrNo;
//       if (lastPr) {
//         lastPrNo = parseInt(lastPr.pr_no) + 1;
//       } else {
//         lastPrNo = 1;
//       }
//       const paddedNo = lastPrNo.toString().padStart(5, "0");
//       const fiveDigitNo = "0".repeat(5 - paddedNo.length) + paddedNo;

//       // Construct the new pr_no
//       const currentDate = new Date();
//       const currentYear = currentDate.getFullYear();
//       const isBeforeApril =
//         currentDate.getMonth() < 3 ||
//         (currentDate.getMonth() === 3 && currentDate.getDate() < 1); // April is month index 3
//       const financialYearStart = isBeforeApril ? currentYear - 1 : currentYear;
//       const financialYearEnd = financialYearStart + 1;
//       const financialYear = `${financialYearStart
//         .toString()
//         .slice(2)}-${financialYearEnd.toString().slice(2)}`;

//       const newPrNo = `PR/${branch_code}/${fiveDigitNo}/${financialYear}`;

//       let containerArray = [];
//       for (let i = 0; i < container_count; i++) {
//         containerArray.push({
//           type_of_vehicle,
//           goods_pickup,
//           goods_delivery,
//         });
//       }

//       // Create a new PrData document
//       const newPrData = new PrData({
//         pr_date: new Date().toLocaleDateString("en-GB"),
//         pr_no: newPrNo,
//         branch: req.body.branch,
//         consignor: req.body.consignor,
//         consignee: req.body.consignee,
//         container_type: req.body.container_type,
//         container_count: container_count,
//         gross_weight: req.body.gross_weight,
//         type_of_vehicle: req.body.type_of_vehicle,
//         description: req.body.description,
//         shipping_line: req.body.shipping_line_airline,
//         container_loading: req.body.container_loading,
//         container_offloading: req.body.container_offloading,
//         do_validity: req.body.do_validity,
//         document_no: req.body.document_no,
//         document_date: req.body.be_date,
//         goods_pickup: req.body.goods_pickup,
//         goods_delivery: req.body.goods_delivery,
//         containers: containerArray,
//       });

//       // Save the new PrData document to the database
//       await newPrData.save();

//       const newPr = new PrModel({
//         pr_no: fiveDigitNo,
//       });

//       // Save the new PrModel document to the database
//       await newPr.save();

//       res.status(200).send({ message: "New PR added successfully" });
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// export default router;

import express from "express";
import PrData from "../../models/pr.mjs";
import PrModel from "../../models/prModel.mjs";

const router = express.Router();

router.post("/api/updatePr", async (req, res) => {
  const {
    pr_no,
    branch,
    type_of_vehicle,
    goods_pickup,
    goods_delivery,
    container_count,
    containers,
    ...updatedJobData
  } = req.body; // Extract relevant data from req.body

  try {
    let prDataToUpdate = await PrData.findOne({ pr_no }).sort({ _id: -1 });

    if (!prDataToUpdate) {
      // Handle case where PR document does not exist
      return res.status(404).send({
        message: "PR document not found. Please create a new PR instead.",
      });
    }

    if (container_count < prDataToUpdate.container_count) {
      // Calculate how many containers need to be deleted
      const containersToDelete =
        prDataToUpdate.container_count - container_count;

      // Check if any container does not have tr_no
      const containersWithoutTrNo = prDataToUpdate.containers.filter(
        (container) => !container.tr_no
      );

      if (containersWithoutTrNo.length < containersToDelete) {
        // Can't delete containers with tr_no
        return res.status(200).send({
          message:
            "Cannot update container count. Some containers have LR assigned.",
        });
      }

      // Filter out containers without tr_no to delete
      let containersToDeleteCount = 0;
      prDataToUpdate.containers = prDataToUpdate.containers.filter(
        (container) => {
          if (
            !container.tr_no &&
            containersToDeleteCount < containersToDelete
          ) {
            containersToDeleteCount++;
            return false; // Exclude this container
          }
          return true; // Keep this container
        }
      );

      // Update container_count in prDataToUpdate
      prDataToUpdate.container_count = container_count;
    } else if (container_count > prDataToUpdate.container_count) {
      // Add additional containers to prDataToUpdate.containers
      const additionalContainersCount =
        container_count - prDataToUpdate.container_count;

      // Add additional containers to prDataToUpdate.containers
      for (let i = 0; i < additionalContainersCount; i++) {
        prDataToUpdate.containers.push({
          type_of_vehicle,
          goods_pickup,
          goods_delivery,
          // Add other fields as needed
        });
        // Update container_count in prDataToUpdate
        prDataToUpdate.container_count = container_count;
      }
    } else {
      // No change in container_count, update other fields if needed
      prDataToUpdate.set({
        branch,
        type_of_vehicle,
        goods_pickup,
        goods_delivery,
        ...updatedJobData,
      });
      // Update type_of_vehicle, goods_pickup, and goods_delivery in each container
      prDataToUpdate.containers.forEach((container) => {
        if (!container.tr_no) {
          container.type_of_vehicle = type_of_vehicle;
          container.goods_pickup = goods_pickup;
          container.goods_delivery = goods_delivery;
        }
      });
    }

    await prDataToUpdate.save();

    res.status(200).send({ message: "PR updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// router.post("/api/updatePr", async (req, res) => {
//   const {
//     pr_no,
//     branch,
//     type_of_vehicle,
//     goods_pickup,
//     goods_delivery,
//     container_count,
//     containers,
//     ...updatedJobData
//   } = req.body; // Extract relevant data from req.body

//   try {
//     let prDataToUpdate = await PrData.findOne({ pr_no }).sort({ _id: -1 });

//     if (!prDataToUpdate) {
//       // Handle case where PR document does not exist
//       return res.status(404).send({
//         message: "PR document not found. Please create a new PR instead.",
//       });
//     }

//     // Check if container_count in req.body is less than container_count in db
//     if (container_count < prDataToUpdate.container_count) {
//       // Calculate how many containers need to be deleted
//       const containersToDelete =
//         prDataToUpdate.container_count - container_count;

//       // Check if any container does not have tr_no
//       const containerWithoutTrNo = prDataToUpdate.containers.filter(
//         (container) => !container.tr_no
//       );
//       if (containerWithoutTrNo.length < containersToDelete) {
//         // Can't delete containers with tr_no
//         return res.status(200).send({
//           message:
//             "Cannot update container count. Some containers have LR assigned.",
//         });
//       }

//       // Filter out containers without tr_no to delete
//       let containersToDeleteCount = 0;
//       prDataToUpdate.containers = prDataToUpdate.containers.filter(
//         (container) => {
//           if (
//             !container.tr_no &&
//             containersToDeleteCount < containersToDelete
//           ) {
//             containersToDeleteCount++;
//             return false; // Exclude this container
//           }
//           return true; // Keep this container
//         }
//       );

//       // Update container_count in prDataToUpdate
//       prDataToUpdate.container_count = container_count;
//     } else if (container_count > prDataToUpdate.container_count) {
//       // Handle case where container_count is increasing (if needed)
//       // You can add logic here based on your requirements
//     }

//     // Update other fields in prDataToUpdate
//     prDataToUpdate.set({
//       branch,
//       type_of_vehicle,
//       goods_pickup,
//       goods_delivery,
//       ...updatedJobData,
//     });

//     // Update type_of_vehicle, goods_pickup, and goods_delivery in each container
//     prDataToUpdate.containers.forEach((container) => {
//       if (!container.tr_no) {
//         container.type_of_vehicle = type_of_vehicle;
//         container.goods_pickup = goods_pickup;
//         container.goods_delivery = goods_delivery;
//       }
//     });

//     await prDataToUpdate.save();

//     res.status(200).send({ message: "PR updated successfully" });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

export default router;
