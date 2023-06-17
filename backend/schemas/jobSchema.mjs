import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
    trim: true,
  },
  jobs: [
    {
      arrival_date: {
        type: String,
        trim: true,
      },
      eta: { type: String, trim: true },
      bill_date: {
        type: String,
        trim: true,
      },
      sims_registration: { type: String, trim: true },
      shipper: { type: String, trim: true },
      number_of_container: { type: String, trim: true },
      bill_number: { type: String, trim: true },
      bill_of_entry_date: { type: String, trim: true },
      bill_of_entry_number: { type: String, trim: true },
      bill_of_lading_number: { type: String, trim: true },
      bill_of_lading_date: { type: String, trim: true },
      checklist: { type: String, trim: true },
      client: { type: String, trim: true },
      commodity: { type: String, trim: true },
      container_numbers: [{ container_number: { type: String, trim: true } }],
      date: { type: String, trim: true },
      detention_from: { type: String, trim: true },
      do_validity: { type: String, trim: true },
      free_time: { type: String, trim: true },
      invoice_date: { type: String, trim: true },
      invoice_number: { type: String, trim: true },
      invoice_value_and_rate: { type: String, trim: true },
      job_number: { type: String, unique: true, trim: true },
      net_wt_mt: { type: String, trim: true },
      number_of_packages: { type: String, trim: true },
      party: { type: String, trim: true },
      pol: { type: String, trim: true },
      remarks: { type: String, trim: true },
      shipping_line: { type: String, trim: true },
      size: { type: String, trim: true },
      status: { type: String, trim: true },
      detailed_status: { type: String, trim: true },
      custom_house: { type: String, trim: true },
      out_of_duty_date: { type: String, trim: true },
    },
  ],
});

export default jobSchema;
