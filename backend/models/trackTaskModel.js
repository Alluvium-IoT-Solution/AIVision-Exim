const mongoose = require("mongoose");
const trackTaskSchema = require("../schemas/trackTaskSchema.js");

const trackTaskModel = new mongoose.model("TrackTask", trackTaskSchema);
module.exports = trackTaskModel;
