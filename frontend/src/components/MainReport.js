import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/job-list.scss";
import { getTableRowsClassname } from "../utils/getTableRowsClassname";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

function MainReport() {
  const [rows, setRows] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const { mainReportAPI } = apiRoutes();

  useEffect(() => {
    async function getReport() {
      const res = await axios.get(mainReportAPI);
      setRows(res.data.sort((a, b) => a.job_no - b.job_no));
    }

    getReport();
    // eslint-disable-next-line
  }, []);

  const filteresRows = rows.filter((job) => {
    if (jobFilter === "") {
      return job;
    } else if (job.job_no.includes(jobFilter)) {
      return job;
    }
    return false;
  });

  const columns = [
    {
      field: "_id",
      sortable: false,
      hide: true,
    },

    {
      field: "job_no",
      sortable: false,
      headerName: "Job No",
      width: 100,
      align: "center",
    },

    {
      field: "custom_house",
      sortable: false,
      headerName: "Custom House",
      width: 150,
      align: "center",
    },

    {
      field: "job_date",
      sortable: false,
      headerName: "Job Date",
      width: 130,
      align: "center",
    },

    {
      field: "importer",
      sortable: false,
      headerName: "Importer",
      width: 350,
      align: "center",
    },

    {
      field: "supplier_exporter",
      sortable: false,
      headerName: "Supplier/Exporter",
      width: 350,
      align: "center",
    },

    {
      field: "invoice_number",
      sortable: false,
      headerName: "Invoice Number",
      width: 140,
      align: "center",
    },

    {
      field: "invoice_date",
      sortable: false,
      headerName: "Invoice Date",
      width: 150,
      align: "center",
    },

    {
      field: "awb_bl_no",
      sortable: false,
      headerName: "AWB/BL No.",
      width: 200,
      align: "center",
    },

    {
      field: "awb_bl_date",
      sortable: false,
      headerName: "AWB/BL Date",
      width: 150,
      align: "center",
    },

    {
      field: "description",
      sortable: false,
      headerName: "Description",
      width: 500,
    },

    {
      field: "be_no",
      sortable: false,
      headerName: "BE No",
      align: "center",
    },

    {
      field: "be_date",
      sortable: false,
      headerName: "BE Date",
      width: 120,
      align: "center",
    },

    {
      field: "type_of_b_e",
      sortable: false,
      headerName: "Type Of B/E",
      width: 150,
      align: "center",
    },

    {
      field: "no_of_pkgs",
      sortable: false,
      headerName: "No Of Pkgs",
      align: "center",
    },

    {
      field: "unit",
      sortable: false,
      headerName: "Unit",
      align: "center",
      width: 100,
    },

    {
      field: "gross_weight",
      sortable: false,
      headerName: "Gross Weight",
      align: "center",
      width: 150,
    },

    {
      field: "unit_1",
      sortable: false,
      headerName: "Unit",
      align: "center",
      width: 100,
    },

    {
      field: "gateway_igm",
      sortable: false,
      headerName: "Gateway IGM",
      align: "center",
      width: 150,
    },

    {
      field: "gateway_igm_date",
      sortable: false,
      headerName: "Gateway IGM Date",
      align: "center",
      width: 150,
    },

    {
      field: "igm_no",
      sortable: false,
      headerName: "IGM No",
      align: "center",
      width: 150,
    },

    {
      field: "igm_date",
      sortable: false,
      headerName: "IGM Date",
      align: "center",
      width: 150,
    },

    {
      field: "loading_port",
      sortable: false,
      headerName: "Loading Port",
      align: "center",
      width: 200,
    },

    {
      field: "origin_country",
      sortable: false,
      headerName: "Origin Country",
      align: "center",
      width: 200,
    },

    {
      field: "port_of_reporting",
      sortable: false,
      headerName: "Port of Reporting",
      width: 200,
      align: "center",
    },

    {
      field: "shipping_line_airline",
      sortable: false,
      headerName: "Shipping Line/Airline",
      align: "center",
      width: 200,
    },

    {
      field: "container_nos",
      sortable: false,
      headerName: "Container Nos.",
      align: "center",
      width: 150,
      renderCell: (cell) => {
        return cell.row.container_nos.map((container, id) => {
          return (
            <React.Fragment key={id}>
              {container.container_number}
              <br />
            </React.Fragment>
          );
        });
      },
    },

    {
      field: "container_count",
      sortable: false,
      headerName: "Container Count",
      align: "center",
      width: 150,
    },

    {
      field: "no_of_container",
      sortable: false,
      headerName: "No Of Container",
      align: "center",
      width: 150,
    },

    {
      field: "toi",
      sortable: false,
      headerName: "TOI",
      align: "center",
      width: 150,
    },

    {
      field: "unit_price",
      sortable: false,
      headerName: "Unit Price",
      align: "center",
      width: 150,
    },

    {
      field: "cif_amount",
      sortable: false,
      headerName: "CIF Amount",
      align: "center",
      width: 150,
    },

    {
      field: "assbl_value",
      sortable: false,
      headerName: "Assbl. Value",
      align: "center",
      width: 150,
    },

    {
      field: "total_duty",
      sortable: false,
      headerName: "Total Duty",
      align: "center",
      width: 150,
    },

    {
      field: "out_of_charge",
      sortable: false,
      headerName: "Out of Charge",
      align: "center",
      width: 150,
    },

    {
      field: "consignment_type",
      sortable: false,
      headerName: "Consignment Type",
      align: "center",
      width: 150,
    },

    {
      field: "bill_no",
      sortable: false,
      headerName: "Bill No",
      align: "center",
      width: 150,
    },

    {
      field: "bill_date",
      sortable: false,
      headerName: "Bill Date",
      align: "center",
      width: 150,
    },

    {
      field: "cth_no",
      sortable: false,
      headerName: "CTH No",
      align: "center",
      width: 150,
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <h3 style={{ flex: 1 }}>Main Report</h3>
        {/* <br /> */}

        <input
          type="text"
          placeholder="Search job..."
          onChange={(e) => setJobFilter(e.target.value)}
          className="search-job-input"
        />
      </div>

      <DataGrid
        getRowId={(row) => row._id}
        sx={{
          padding: "0 30px",
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f8f5ff",
          },
        }}
        className="table expense-table"
        headerAlign="center"
        rows={filteresRows}
        columns={columns}
        pageSize={50}
        stickyHeader
        rowsPerPageOptions={[50]}
        rowHeight={150}
        disableColumnMenu={true}
        disableSelectionOnClick
        getRowClassName={getTableRowsClassname}
      />
    </>
  );
}

export default MainReport;
