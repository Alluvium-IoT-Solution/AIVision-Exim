const mongoose = require("mongoose");
const reportFieldsSchema = require("../schemas/reportFieldsSchema.js");

const ReportFieldsModel = new mongoose.model(
  "ReportFields",
  reportFieldsSchema
);
module.exports = ReportFieldsModel;
