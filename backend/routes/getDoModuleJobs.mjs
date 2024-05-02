// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/getDoModuleJobs/:do_planning_date", async (req, res) => {
//   const { do_planning_date } = req.params;
//   try {
//     const jobs = await JobModel.find(
//       {
//         $and: [
//           { $or: [{ doPlanning: true }, { doPlanning: "true" }] },
//           { $or: [{ out_of_charge: "" }, { out_of_charge: "--" }] },
//           { do_planning_date },
//         ],
//       },
//       "job_no importer awb_bl_no shipping_line_airline custom_house obl_telex_bl payment_made"
//     );

//     res.status(200).send(jobs);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getDoModuleJobs/:do_planning_date", async (req, res) => {
  const { do_planning_date } = req.params;
  try {
    const jobs = await JobModel.find(
      {
        $and: [
          { $or: [{ out_of_charge: "" }, { out_of_charge: "--" }] },
          {
            $or: [
              { do_processed_attachment: { $exists: false } },
              { do_processed_attachment: [] },
            ],
          },
          { $or: [{ doPlanning: true }, { doPlanning: "true" }] },
          { do_planning_date },
        ],
      },
      "job_no importer awb_bl_no shipping_line_airline custom_house obl_telex_bl payment_made"
    );

    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
