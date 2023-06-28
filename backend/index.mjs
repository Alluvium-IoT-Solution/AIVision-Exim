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
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Add 'extended: true' option
app.use(
  cors({
    credentials: true,
    origin: "https://localhost:3000",
    allowedHeaders: "Content-Type,Authorization,Set-Cookie",
    exposedHeaders: "Set-Cookie",
  })
);
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.use(getJobsList);

    app.use(getJob);

    app.use(updateJob);

    app.use(addJob);

    app.use(login);

    app.use(getReport);

    app.listen(process.env.MONGODB_PORT, () => {
      console.log(`BE started at port ${process.env.MONGODB_PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
