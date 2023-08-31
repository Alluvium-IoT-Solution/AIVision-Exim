const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  email: {
    type: String,
    trim: true,
    unique:true
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
  otp: {
    type: String,
    trim: true,
  },
  importers: [
    {
      importer: { type: String, trim: true },
      importerURL: { type: String, trim: true },
    },
  ],
});

module.exports = userSchema;
