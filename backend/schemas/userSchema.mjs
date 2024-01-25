// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   role: {
//     type: String,
//     trim: true,
//   },
//   otp: {
//     type: String,
//     trim: true,
//   },
//   changePasswordOtp: {
//     type: String,
//     trim: true,
//   },
//   importers: [
//     {
//       importer: { type: String, trim: true },
//       importerURL: { type: String, trim: true },
//     },
//   ],
//   team: {
//     type: String,
//     trim: true,
//   },
//   port: {
//     type: String,
//     trim: true,
//   },
// });

// userSchema.index({ username: 1, importers: 1 });

// export default userSchema;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  otp: {
    type: String,
    trim: true,
  },
  changePasswordOtp: {
    type: String,
    trim: true,
  },
  importers: [
    {
      importer: { type: String, trim: true },
      importerURL: { type: String, trim: true },
    },
  ],
  team: {
    type: String,
    trim: true,
  },
  port: [{ type: String }],
});

userSchema.index({ username: 1, importers: 1 });

export default userSchema;
