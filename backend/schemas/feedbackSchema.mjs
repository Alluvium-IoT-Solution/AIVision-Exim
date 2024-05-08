import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  id: { type: Number },
  name: {
    type: String,
  },
  module: {
    type: String,
  },
  issue: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
});

export default feedbackSchema;
