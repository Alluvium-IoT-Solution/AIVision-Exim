import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  importer: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  jobs: [
    {
      job_no: { type: String, trim: true },
      custom_house: { type: String, trim: true },
      job_date: { type: String, trim: true },
      importer: { type: String, trim: true },
      supplier_exporter: { type: String, trim: true },
      invoice_number: { type: String, trim: true },
      invoice_date: { type: String, trim: true },
      awb_bl_no: { type: String, trim: true },
      awb_bl_date: { type: String, trim: true },
      description: { type: String, trim: true },
      be_no: { type: String, trim: true },
      be_date: { type: String, trim: true },
      type_of_b_e: { type: String, trim: true },
      no_of_pkgs: { type: String, trim: true },
      unit: { type: String, trim: true },
      gross_weight: { type: String, trim: true },
      unit_1: { type: String, trim: true },
      gateway_igm: { type: String, trim: true },
      gateway_igm_date: { type: String, trim: true },
      igm_no: { type: String, trim: true },
      igm_date: { type: String, trim: true },
      loading_port: { type: String, trim: true },
      origin_country: { type: String, trim: true },
      port_of_reporting: { type: String, trim: true },
      shipping_line_airline: { type: String, trim: true },
      container_nos: [
        {
          container_number: { type: String, trim: true },
          arrival_date: { type: String, trim: true },
          detention_from: { type: String, trim: true },
        },
      ],
      container_count: { type: String, trim: true },
      no_of_container: { type: String, trim: true },
      toi: { type: String, trim: true },
      unit_price: { type: String, trim: true },
      cif_amount: { type: String, trim: true },
      assbl_value: { type: String, trim: true },
      total_duty: { type: String, trim: true },
      out_of_charge: { type: String, trim: true },
      consignment_type: { type: String, trim: true },
      bill_no: { type: String, trim: true },
      bill_date: { type: String, trim: true },
      cth_no: { type: String, trim: true },
      status: { type: String, trim: true },
      detailed_status: { type: String, trim: true },
      eta: { type: String, trim: true },
      arrival_date: { type: String, trim: true },
      free_time: { type: String, trim: true },
      detention_from: { type: String, trim: true },
      size: { type: String, trim: true },
      do_validity: { type: String, trim: true },
      checklist: { type: String, trim: true },
      remarks: { type: String, trim: true },
      commodity: { type: String, trim: true },
    },
  ],
});

export default jobSchema;
