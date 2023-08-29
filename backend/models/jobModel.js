const mongoose = require("mongoose");
const jobSchema = require("../schemas/jobSchema.js");

const JobModel = new mongoose.model("Job", jobSchema);
module.exports = JobModel;
