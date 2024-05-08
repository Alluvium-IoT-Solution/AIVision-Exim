// import express from "express";
// import Pr from "../../models/pr.mjs";

// const router = express.Router();

// router.get("/api/viewAllLr", async (req, res) => {
//   try {
//     const lr = await Pr.find({}).select("pr_no containers");

//     function formatArray(inputArray) {
//       let formattedArray = [];

//       inputArray.forEach((item) => {
//         const pr_no = item.pr_no;
//         item.containers.forEach((container) => {
//           let formattedItem = { pr_no: pr_no };
//           // Loop through all fields in the container object
//           for (let key in container) {
//             // Skip _id field
//             if (key !== "_id") {
//               formattedItem[key] = container[key];
//             }
//           }
//           formattedArray.push(formattedItem);
//         });
//       });

//       return formattedArray;
//     }

//     const data = formatArray(lr);

//     res.status(200).json(data);
//   } catch (error) {
//     // Handle any errors
//     console.error("Error retrieving LR data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// export default router;

////////////////////////////////////////////////////////////////

// import express from "express";
// import Pr from "../../models/pr.mjs";

// const router = express.Router();

// router.get("/api/viewAllLr/:branch_code", async (req, res) => {
//   const { branch_code } = req.params;
//   try {
//     const lr = await Pr.find({}).select("pr_no containers");

//     function formatArray(inputArray) {
//       let formattedArray = [];

//       inputArray.forEach((item) => {
//         const pr_no = item.pr_no;
//         const containersWithTrNo = item.containers.filter(
//           (container) => container.tr_no
//         ); // Filter out containers without tr_no
//         containersWithTrNo.forEach((container) => {
//           let formattedItem = { pr_no: pr_no };
//           // Loop through all fields in the container object
//           for (let key in container) {
//             // Skip _id field
//             if (key !== "_id") {
//               formattedItem[key] = container[key];
//             }
//           }
//           formattedArray.push(formattedItem);
//         });
//       });

//       return formattedArray;
//     }

//     const data = formatArray(lr);

//     res.status(200).json(data);
//   } catch (error) {
//     // Handle any errors
//     console.error("Error retrieving LR data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// export default router;

///////////////////////////////////////////////////////////////////////////////
import express from "express";
import Pr from "../../models/pr.mjs";

const router = express.Router();

router.get("/api/viewAllLr/:branch_code", async (req, res) => {
  const { branch_code } = req.params;
  let query = {}; // Initialize an empty query object

  // Define the query based on the branch_code parameter
  switch (branch_code) {
    case "KHD":
      query = { branch: "ICD Sabarmati, Ahmedabad" };
      break;
    case "SND":
      query = { branch: "THAR DRY PORT" };
      break;
    case "HZR":
      query = { branch: "HAZIRA" };
      break;
    case "MND":
      query = { branch: "MUNDRA" };
      break;
    case "SCH":
      query = { branch: "ICD SACHANA" };
      break;
    case "BRD":
      query = { branch: "BARODA" };
      break;
    case "AIR":
      query = { branch: "AIRPORT" };
      break;
    default:
      query = {};
      break;
  }

  try {
    // Find documents based on the constructed query
    const lr = await Pr.find(query).select("pr_no branch containers");

    function formatArray(inputArray) {
      let formattedArray = [];

      inputArray.forEach((item) => {
        const pr_no = item.pr_no;
        const containersWithTrNo = item.containers.filter(
          (container) => container.tr_no
        ); // Filter out containers without tr_no
        containersWithTrNo.forEach((container) => {
          let formattedItem = { pr_no: pr_no };
          // Loop through all fields in the container object
          for (let key in container) {
            // Skip _id field
            if (key !== "_id") {
              formattedItem[key] = container[key];
            }
          }
          formattedArray.push(formattedItem);
        });
      });

      return formattedArray;
    }

    const data = formatArray(lr);

    res.status(200).json(data);
  } catch (error) {
    // Handle any errors
    console.error("Error retrieving LR data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
