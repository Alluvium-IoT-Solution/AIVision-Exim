const mongoose = require("mongoose");

const reportFieldsSchema = new mongoose.Schema(
  {
    importer: {
      type: String,
      required: true,
    },
    importerURL: { type: String, trim: true },
    email: { type: String, trim: true },
    senderEmail: { type: String, trim: true },
    field: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { collection: "reportFields" }
);

module.exports = reportFieldsSchema;