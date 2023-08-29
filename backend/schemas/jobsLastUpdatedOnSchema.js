const mongoose = require("mongoose");

const jobsLastUpdatedOnSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = jobsLastUpdatedOnSchema;
