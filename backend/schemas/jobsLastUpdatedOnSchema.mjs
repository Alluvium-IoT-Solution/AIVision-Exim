import mongoose from "mongoose";

export const jobsLastUpdatedOnSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    trim: true,
  },
});

export default jobsLastUpdatedOnSchema;
