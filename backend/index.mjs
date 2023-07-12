import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import getJob from "./routes/getJobRoute.mjs";
import getJobsList from "./routes/getJobList.js";
import updateJob from "./routes/updateJob.mjs";
import addJob from "./routes/addJobsFromExcel.js";
import login from "./routes/login.mjs";
import getReport from "./routes/getReport.js";
import register from "./routes/register.mjs";
import deleteCollection from "./routes/deleteCollection.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

mongoose.set("strictQuery", true); // Suppress deprecation warning

mongoose
  .connect(
    // process.env.MONGODB_URI,
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

    app.use(deleteCollection);

    app.listen(9002, () => {
      console.log(`BE started at port 9002`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
