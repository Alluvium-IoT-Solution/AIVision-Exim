const mongoose = require("mongoose");

const trackTaskSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    counts: {
      date: { type: String, trim: true },
      count: { type: Number, trim: true },
    },
  },
  { collection: "trackTasks" }
);

module.exports = trackTaskSchema;
