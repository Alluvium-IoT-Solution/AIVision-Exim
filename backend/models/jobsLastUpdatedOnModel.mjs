import jobsLastUpdatedOnSchema from "../schemas/jobsLastUpdatedOnSchema.mjs";
import mongoose from "mongoose";

const LastJobsDate = new mongoose.model(
  "JobsLastUpdated",
  jobsLastUpdatedOnSchema
);

export default LastJobsDate;
