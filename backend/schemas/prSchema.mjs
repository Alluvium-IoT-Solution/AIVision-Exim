import mongoose from "mongoose";

const prSchema = new mongoose.Schema({
  pr_no: {
    type: String,
    required: true,
  },
});

export default prSchema;
