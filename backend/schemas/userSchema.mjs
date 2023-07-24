import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  importer: { type: String, trim: true },
  importerURL: { type: String, trim: true },
});

export default userSchema;
