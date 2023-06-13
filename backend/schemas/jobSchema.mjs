import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  jobs: [
    {
      arrival_date: {
        type: String,
        // required: true,
      },
      bill_date: {
        type: String,
      },
      bill_number: { type: String },
      bill_of_entry_date: { type: String },
      bill_of_entry_number: { type: String },
      bill_of_lading_date: { type: String },
      checklist: { type: String },
      client: { type: String },
      commodity: { type: String },
      container_number: { type: String },
      date: { type: String },
      detention_from: { type: String },
      do_validity: { type: String },
      free_time: { type: String },
      invoice_date: { type: String },
      invoice_number: { type: String },
      invoice_value_and_rate: { type: String },
      job_number: { type: String, unique: true },
      net_wt_mt: { type: String },
      number_of_packages: { type: String },
      party: { type: String },
      pol: { type: String },
      remarks: { type: String },
      shipping_line: { type: String },
      size: { type: String },
      status: { type: String },
      detailed_status: { type: String },
      custom_house: { type: String },
    },
  ],
});

export default jobSchema;
