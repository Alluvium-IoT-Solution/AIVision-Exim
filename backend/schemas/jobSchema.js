const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    year: {
      type: String,
    },
    data: [
      {
        importer: {
          type: String,
        },

        importerURL: {
          type: String,
        },

        jobs: [
          {
            job_no: {
              type: String,
            },
            custom_house: {
              type: String,
            },
            job_date: {
              type: String,
            },
            importer: {
              type: String,
            },
            supplier_exporter: {
              type: String,
            },
            invoice_number: {
              type: String,
            },
            invoice_date: {
              type: String,
            },
            awb_bl_no: {
              type: String,
            },
            awb_bl_date: {
              type: String,
            },
            description: {
              type: String,
            },
            be_no: {
              type: String,
            },
            be_date: {
              type: String,
            },
            type_of_b_e: {
              type: String,
            },
            no_of_pkgs: {
              type: String,
            },
            unit: {
              type: String,
            },
            gross_weight: {
              type: String,
            },
            unit_1: {
              type: String,
            },
            gateway_igm: {
              type: String,
            },
            gateway_igm_date: {
              type: String,
            },
            igm_no: {
              type: String,
            },
            igm_date: {
              type: String,
            },
            loading_port: {
              type: String,
            },
            origin_country: {
              type: String,
            },
            port_of_reporting: {
              type: String,
            },
            shipping_line_airline: {
              type: String,
            },
            container_nos: [
              {
                container_number: { type: String, trim: true },
                arrival_date: { type: String, trim: true },
                detention_from: { type: String, trim: true },
                size: { type: String, trim: true },
              },
            ],
            container_count: {
              type: String,
            },
            no_of_container: {
              type: String,
            },
            toi: {
              type: String,
            },
            unit_price: {
              type: String,
            },
            cif_amount: {
              type: String,
            },
            assbl_value: {
              type: String,
            },
            total_duty: {
              type: String,
            },
            out_of_charge: {
              type: String,
            },
            consignment_type: {
              type: String,
            },
            bill_no: {
              type: String,
            },
            bill_date: {
              type: String,
            },
            cth_no: {
              type: String,
            },
            sims_reg_no: {
              type: String,
              trim: true,
            },
            pims_reg_no: {
              type: String,
              trim: true,
            },
            nfmims_reg_no: {
              type: String,
              trim: true,
            },
            sims_date: {
              type: String,
              trim: true,
            },
            pims_date: {
              type: String,
              trim: true,
            },
            nfmims_date: {
              type: String,
              trim: true,
            },
            status: {
              type: String,
              trim: true,
            },
            detailed_status: { type: String, trim: true },
            cargo_date: {
              type: String,
              trim: true,
            },
          },
        ],
      },
    ],
  },
  {
    strict: false,
  }
);

module.exports = jobSchema;
