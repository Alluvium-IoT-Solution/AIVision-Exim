// import express from "express";
// import JobModel from "../models/jobModel.mjs";

// const router = express.Router();

// router.get("/api/:importer/job/:year/:jobNo", async (req, res) => {
//   try {
//     const { importer, jobNo, year } = req.params;

//     const clientDoc = await JobModel.findOne({
//       year,
//       "data.importerURL": importer,
//     });

//     if (!clientDoc) {
//       return res.status(404).json({ message: "No matching document found" });
//     }

//     const dataItem = clientDoc.data.find(
//       (item) => item.importerURL === importer
//     );

//     if (!dataItem) {
//       return res.status(404).json({ message: "Importer not found" });
//     }

//     const job = dataItem.jobs.find((job) => job.job_no === jobNo);

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     res.json(job);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// export default router;

import express from "express";
import JobModel from "../models/jobModel.mjs";

const router = express.Router();

router.get("/api/getJob/job/:year/:jobNo", async (req, res) => {
  try {
    const { jobNo, year } = req.params;

    const job = await JobModel.findOne({
      year,
      job_no: jobNo,
    });

    // if (!clientDoc) {
    //   return res.status(404).json({ message: "No matching document found" });
    // }

    // const dataItem = clientDoc.data.find(
    //   (item) => item.importerURL === importer
    // );

    // if (!dataItem) {
    //   return res.status(404).json({ message: "Importer not found" });
    // }

    // const job = dataItem.jobs.find((job) => job.job_no === jobNo);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
