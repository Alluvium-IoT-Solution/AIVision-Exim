import mongoose from "mongoose";

const trSchema = new mongoose.Schema({
  tr_no: {
    type: String,
    required: true,
  },
});

export default trSchema;
