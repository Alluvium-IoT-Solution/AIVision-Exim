import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import getJob from "./routes/getJobRoute.mjs";
import getJobsList from "./routes/getJobList.mjs";
import updateJob from "./routes/updateJob.mjs";
import addJob from "./routes/addJobsFromExcel.mjs";
import login from "./routes/login.mjs";
import getReport from "./routes/getReport.mjs";
import register from "./routes/register.mjs";
import deleteCollection from "./routes/deleteCollection.mjs";
import getJobsOverview from "./routes/getJobsOverview.mjs";
import importerJobs from "./routes/importerJobs.mjs";
import getImporterList from "./routes/getImporterList.mjs";
import getUsers from "./routes/getUsers.mjs";
import getAssignedimporter from "./routes/getAssignedImporter.mjs";
import assignJobs from "./routes/assignJobs.mjs";
import sendMail from "./routes/sendMail.mjs";
import updateLastJobsDate from "./routes/addLastJobsDate.mjs";
import getLastJobsDate from "./routes/getLastJobsDate.mjs";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(
    // "mongodb://localhost:27017/exim",
    "mongodb+srv://exim:qTT7e4YeE3YSSMiV@aivision.pxmpvlz.mongodb.net/exim?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.use(getJobsList);

    app.use(getJob);

    app.use(updateJob);

    app.use(addJob);

    app.use(login);

    app.use(getReport);

    app.use(register);

    app.use(getJobsOverview);

    app.use(importerJobs);

    app.use(getImporterList);

    app.use(getUsers);

    app.use(assignJobs);

    app.use(getAssignedimporter);

    app.use(sendMail);

    app.use(updateLastJobsDate);

    app.use(getLastJobsDate);

    app.use(deleteCollection);

    app.listen(9002, () => {
      console.log(`BE started at port 9002`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
