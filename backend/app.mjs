import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import getJob from "./routes/getJobRoute.mjs";
import getJobsList from "./routes/getJobList.js";
import updateJob from "./routes/updateJob.mjs";
import addJob from "./routes/addJobsFromExcel.js";
import login from "./routes/login.mjs";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
dotenv.config();
// process.env.MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Get jobs list
    app.use(getJobsList);

    // Get Job
    app.use(getJob);

    // Update Job
    app.use(updateJob);

    // Add Job
    app.use(addJob);

    // Login
    app.use(login);

    app.listen(process.env.MONGODB_PORT, () => {
      console.log("BE started at port 9002");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
