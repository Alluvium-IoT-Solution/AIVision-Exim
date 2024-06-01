import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cluster from "cluster";
import os from "os";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import JobModel from "./models/jobModel.mjs";
// Import routes
import readMail from "./routes/readMail.mjs";
import getJobsList from "./routes/getJobList.mjs";
import getJob from "./routes/getJobRoute.mjs";
import updateJob from "./routes/updateJob.mjs";
import addJob from "./routes/addJobsFromExcel.mjs";
import login from "./routes/login.mjs";
import register from "./routes/register.mjs";
import getJobsOverview from "./routes/getJobsOverview.mjs";
import importerJobs from "./routes/importerJobs.mjs";
import getImporterList from "./routes/getImporterList.mjs";
import getUsers from "./routes/getUsers.mjs";
import getUsersWithJobs from "./routes/getUsersWithJobs.mjs";
import getAssignedimporter from "./routes/getAssignedImporter.mjs";
import assignJobs from "./routes/assignJobs.mjs";
import updateLastJobsDate from "./routes/addLastJobsDate.mjs";
import getLastJobsDate from "./routes/getLastJobsDate.mjs";
import importerListToAssignJobs from "./routes/importerListToAssignJobs.mjs";
import getYears from "./routes/getYears.mjs";
import removeUser from "./routes/removeUser.mjs";
import getReportFields from "./routes/getReportFields.mjs";
import getReport from "./routes/getReport.mjs";
import convertToExcel from "./routes/convertToExcel.mjs";
import updateStatus from "./routes/updateStatus.mjs";
import sendChangePasswordOtp from "./routes/sendChangePasswordOtp.mjs";
import feedback from "./routes/feedback.mjs";
import removeJobs from "./routes/removeJobs.mjs";
import changePassword from "./routes/changePassword.mjs";
import downloadReport from "./routes/downloadReport.mjs";
import dsr from "./routes/dsr.mjs";
import addQueries from "./routes/addQueries.mjs";
import beFilingIntimation from "./routes/beFilingIntimation.mjs";
import doTeamListOfJobs from "./routes/doTeamListOfjobs.mjs";
import updateDoTeamList from "./routes/updateDoTeamJobList.mjs";
import updateModule from "./routes/updateModule.mjs";
import updateDoPlanning from "./routes/updateDoPlanning.mjs";
import getDoModuleJobs from "./routes/getDoModuleJobs.mjs";
import operationsTeamListOfJobs from "./routes/operationsTeamListOfJobs.mjs";
import getOperationsModuleJobs from "./routes/getOperationsModuleJobs.mjs";
import updateOperationTeamJob from "./routes/updateOperationTeamJob.mjs";
import addOperationTeamUser from "./routes/addOperationsTeamUser.mjs";
import getDoJobDetails from "./routes/getDoJobDetails.mjs";
import getDoBilling from "./routes/getDoBilling.mjs";
import updateDoBilling from "./routes/updateDoBilling.mjs";

// Customer module
import customerLogin from "./routes/customer/customerLogin.mjs";
import customerDoPlanning from "./routes/customer/customerDoPlanning.mjs";
import uploadFactoryWeighment from "./routes/uploadFactoryWeighment.mjs";

// Feedback
import addFeedback from "./routes/addFeedback.mjs";
import getFeedback from "./routes/getFeedback.mjs";
import updateFeedback from "./routes/updateFeedback.mjs";

// LR
import getLrJobs from "./routes/lr/getJobs.mjs";
import getContainers from "./routes/lr/getContainers.mjs";
import updatePr from "./routes/lr/updatePr.mjs";
import getPrData from "./routes/lr/getPrData.mjs";
import updateContainer from "./routes/lr/updateContainer.mjs";
import deletePr from "./routes/lr/deletePr.mjs";
import deleteTr from "./routes/lr/deleteTr.mjs";
import viewAllPr from "./routes/lr/viewAllLr.mjs";

const numOfCPU = os.availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < numOfCPU; i++) {
    cluster.fork();
  }
  // Start a new worker when a worker dies
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Starting a new worker`);
    cluster.fork();
  });
} else {
  dotenv.config();
  const app = express();
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(compression({ level: 9 }));

  mongoose.set("strictQuery", true);

  mongoose
    .connect(
      "mongodb+srv://exim:qTT7e4YeE3YSSMiV@aivision.pxmpvlz.mongodb.net/exim?retryWrites=true&w=majority",
      // "mongodb://localhost:27017/exim",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 10,
        maxPoolSize: 1000,
      }
    )
    .then(() => {
      app.get("/", async (req, res) => {
        const jobs = await JobModel.find({});
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(jobs);
      });

      app.use(readMail);

      app.use(getJobsList);

      app.use(getJob);

      app.use(updateJob);

      app.use(addJob);

      app.use(login);

      app.use(register);

      app.use(getJobsOverview);

      app.use(importerJobs);

      app.use(getImporterList);

      app.use(getUsers);

      app.use(getUsersWithJobs);

      app.use(assignJobs);

      app.use(getAssignedimporter);

      app.use(updateLastJobsDate);

      app.use(getLastJobsDate);

      app.use(importerListToAssignJobs);

      app.use(getYears);

      app.use(getReport);

      app.use(removeUser);

      app.use(getReportFields);

      app.use(convertToExcel);

      app.use(updateStatus);

      app.use(sendChangePasswordOtp);

      app.use(feedback);

      app.use(removeJobs);

      app.use(changePassword);

      app.use(downloadReport);

      app.use(dsr);

      app.use(addQueries);

      app.use(beFilingIntimation);

      app.use(doTeamListOfJobs);

      app.use(updateDoTeamList);

      app.use(updateModule);

      app.use(updateDoPlanning);

      app.use(getDoModuleJobs);

      app.use(operationsTeamListOfJobs);

      app.use(getOperationsModuleJobs);

      app.use(updateOperationTeamJob);

      app.use(addOperationTeamUser);

      app.use(getDoJobDetails);

      app.use(getDoBilling);

      app.use(updateDoBilling);

      app.use(customerLogin);

      app.use(customerDoPlanning);

      app.use(uploadFactoryWeighment);

      app.use(getLrJobs);

      app.use(getContainers);

      app.use(updatePr);

      app.use(getPrData);

      app.use(updateContainer);

      app.use(deletePr);

      app.use(deleteTr);

      app.use(viewAllPr);

      app.use(addFeedback);

      app.use(getFeedback);

      app.use(updateFeedback);

      app.listen(9002, () => {
        console.log(`BE started at port 9002`);
      });
    })
    .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
}
