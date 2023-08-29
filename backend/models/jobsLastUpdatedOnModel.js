const mongoose = require("mongoose");
const jobsLastUpdatedOnSchema = require("../schemas/jobsLastUpdatedOnSchema.js");

const LastJobsDate = new mongoose.model(
  "JobsLastUpdated",
  jobsLastUpdatedOnSchema
);
module.exports = LastJobsDate;
