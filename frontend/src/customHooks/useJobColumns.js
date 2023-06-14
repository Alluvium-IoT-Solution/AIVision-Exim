import React from "react";
import { Link, useParams } from "react-router-dom";

function useJobColumns() {
  const params = useParams();

  const columns = [
    {
      field: "_id",
      sortable: false,
      hide: true,
    },

    {
      field: "job_number",
      sortable: false,
      headerName: "Job Number",
      width: "150",
      align: "center",
    },

    {
      field: "custom_house",
      sortable: false,
      headerName: "Custom House",
      width: "150",
      align: "center",
    },

    {
      field: "bill_of_lading_number",
      sortable: false,
      headerName: "Bill of Lading Number",
      width: "200",
      align: "center",
    },

    {
      field: "container_number",
      sortable: false,
      headerName: "Container Number",
      width: 150,
      align: "center",
    },

    {
      field: "eta",
      sortable: false,
      headerName: "Estimated Time of Arrival",
      width: 350,
      align: "center",
    },

    {
      field: "bill_of_entry_date",
      sortable: false,
      hide: true,
    },

    {
      field: "pol",
      sortable: false,
      hide: true,
    },

    {
      field: "arrival_date",
      sortable: false,
      hide: true,
    },

    {
      field: "date",
      sortable: false,
      hide: true,
    },

    {
      field: "party",
      sortable: false,
      hide: true,
    },

    {
      field: "invoice_number",
      sortable: false,
      hide: true,
    },

    {
      field: "invoice_date",
      sortable: false,
      headerName: "Invoice Date",
      width: "160",
      hide: true,
    },

    {
      field: "invoice_value_and_rate",
      sortable: false,
      hide: true,
    },

    {
      field: "bill_number",
      sortable: false,
      hide: true,
    },

    {
      field: "bill_date",
      sortable: false,
      hide: true,
    },

    {
      field: "commodity",
      sortable: false,
      hide: true,
    },

    {
      field: "number_of_packages",
      sortable: false,
      hide: true,
    },

    {
      field: "net_wt_mt",
      sortable: false,
      hide: true,
    },

    {
      field: "free_time",
      sortable: false,
      hide: true,
    },

    {
      field: "detention_from",
      sortable: false,
      hide: true,
    },

    {
      field: "shipping_line",
      sortable: false,
      hide: true,
    },

    {
      field: "size",
      sortable: false,
      hide: true,
    },

    {
      field: "remarks",
      sortable: false,
      headerName: "Remarks",
      width: "300",
      hide: true,
    },

    {
      field: "do_validity",
      sortable: false,
      hide: true,
    },

    {
      field: "bill_of_entry_number",
      sortable: false,
      hide: true,
    },

    {
      field: "checklist",
      sortable: false,
      hide: true,
    },

    {
      field: "client",
      sortable: false,
      hide: true,
    },

    {
      field: "status",
      sortable: false,
      headerName: "Status",
      width: "200",
      hide: true,
      // renderCell: (params) => {
      //   if (params.row.status?.toLowerCase() === "pending") {
      //     return (
      //       <div
      //         style={{
      //           backgroundColor: "rgb(255, 217, 102, 0.36)",
      //           color: "rgb(236, 168, 105)",
      //           padding: "5px 10px",
      //           borderRadius: "6px",
      //           fontWeight: "600",
      //           fontSize: "0.75rem",
      //           letterSpacing: "0.5px",
      //         }}
      //       >
      //         Pending
      //       </div>
      //     );
      //   } else if (params.row.status?.toLowerCase() === "completed") {
      //     return (
      //       <div
      //         style={{
      //           backgroundColor: "rgba(84, 214, 44, 0.16)",
      //           color: "rgb(34, 154, 22)",
      //           padding: "5px 10px",
      //           borderRadius: "6px",
      //           fontWeight: "600",
      //           fontSize: "0.75rem",
      //           letterSpacing: "0.5px",
      //         }}
      //       >
      //         Completed
      //       </div>
      //     );
      //   } else if (params.row.status?.toLowerCase() === "cancelled") {
      //     return (
      //       <div
      //         style={{
      //           backgroundColor: "rgba(255, 72, 66, 0.16)",
      //           color: "rgb(183, 33, 54)",
      //           padding: "5px 10px",
      //           borderRadius: "6px",
      //           fontWeight: "600",
      //           fontSize: "0.75rem",
      //           letterSpacing: "0.5px",
      //         }}
      //       >
      //         Cancelled
      //       </div>
      //     );
      //   } else {
      //     return (
      //       <div
      //         style={{
      //           backgroundColor: "rgba(84, 214, 44, 0.16)",
      //           color: "rgb(34, 154, 22)",
      //           padding: "5px 10px",
      //           borderRadius: "6px",
      //           fontWeight: "600",
      //           fontSize: "0.75rem",
      //           letterSpacing: "0.5px",
      //         }}
      //       >
      //         {params.row.status === "pending"
      //           ? "Pending"
      //           : params.row.status === "completed"
      //           ? "Completed"
      //           : "Cancelled"}
      //       </div>
      //     );
      //   }
      // },
    },

    {
      field: "detailed_status",
      sortable: false,
      hide: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: "80",
      align: "center",
      renderCell: (cell) => {
        return (
          <Link to={`/${params.client}/job/${cell.row.job_number}`}>
            View Job
          </Link>
        );
      },
    },
  ];

  return columns;
}

export default useJobColumns;
