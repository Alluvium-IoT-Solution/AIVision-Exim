const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const getJob = require("./routes/getJobRoute.js");
const getJobsList = require("./routes/getJobList.js");
const updateJob = require("./routes/updateJob.js");
const addJob = require("./routes/addJobsFromExcel.js");
const login = require("./routes/login.js");
const register = require("./routes/register.js");
const getJobsOverview = require("./routes/getJobsOverview.js");
const importerJobs = require("./routes/importerJobs.js");
const getImporterList = require("./routes/getImporterList.js");
const getUsers = require("./routes/getUsers.js");
const getUsersWithJobs = require("./routes/getUsersWithJobs.js");
const getAssignedimporter = require("./routes/getAssignedImporter.js");
const assignJobs = require("./routes/assignJobs.js");
const updateLastJobsDate = require("./routes/addLastJobsDate.js");
const getLastJobsDate = require("./routes/getLastJobsDate.js");
const importerListToAssignJobs = require("./routes/importerListToAssignJobs.js");
const getYears = require("./routes/getYears.js");
const removeUser = require("./routes/removeUser.js");
const getReportFields = require("./routes/getReportFields.js");
const getReport = require("./routes/getReport.js");
const convertToExcel = require("./routes/convertToExcel.js");
const updateStatus = require("./routes/updateStatus.js");
const sendOtp = require("./routes/sendOtp.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);

mongoose
  .connect(
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

    app.use(sendOtp);

    app.listen(9002, () => {
      console.log(`BE started at port 9002`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
