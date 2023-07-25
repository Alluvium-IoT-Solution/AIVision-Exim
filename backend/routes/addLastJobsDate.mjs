// import express from "express";

// const router = express.Router();

// router.post("/api/updateJobsDate", (req, res) => {
//     const { date } = req.date;

//   res.send("ok");
// });

// export default router;

import express from "express";
import LastJobsDate from "../models/jobsLastUpdatedOnModel.mjs";

const router = express.Router();

router.post("/api/updateJobsDate", async (req, res) => {
  try {
    const { date } = req.body; // Assuming the date is present in the request body

    // Create an instance of the model with the date from req.body
    const jobsLastUpdatedOn = new LastJobsDate({ date });

    // Save the data to the database
    await jobsLastUpdatedOn.save();

    res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the date.");
  }
});

export default router;
