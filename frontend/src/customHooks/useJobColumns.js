import React from "react";
import { Link, useParams } from "react-router-dom";

function useJobColumns(detailedStatus) {
  const params = useParams();

  const columns = [
    {
      field: "_id",
      sortable: false,
      hide: true,
    },

    {
      field: "job_no",
      sortable: false,
      headerName: "Job Number",
      width: 150,
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
      field: "awb_bl_no",
      sortable: false,
      headerName: "Bill of Lading Number",
      width: "200",
      align: "center",
      hide:
        detailedStatus === "Estimated Time of Arrival" ||
        detailedStatus === "Gateway IGM Filed" ||
        detailedStatus === ""
          ? false
          : true,
    },

    {
      field: "be_no",
      sortable: false,
      headerName: "Bill of Entry Number",
      width: 150,
      align: "center",
      hide:
        detailedStatus === "BE Noted, Arrival Pending" ||
        detailedStatus === "BE Noted, Clearance Pending" ||
        detailedStatus === "Custom Clearance Completed"
          ? false
          : true,
    },

    {
      field: "be_date",
      sortable: false,
      headerName: "Bill of Entry Date",
      width: 150,
      align: "center",
      hide:
        detailedStatus === "BE Noted, Arrival Pending" ||
        detailedStatus === "BE Noted, Clearance Pending" ||
        detailedStatus === "Custom Clearance Completed"
          ? false
          : true,
    },

    {
      field: "container_numbers",
      sortable: false,
      headerName: "Container Numbers",
      width: 150,
      align: "center",
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
      field: "eta",
      sortable: false,
      headerName: "Estimated Time of Arrival",
      width: 250,
      align: "center",
      hide:
        detailedStatus === "Estimated Time of Arrival" ||
        detailedStatus === "Gateway IGM Filed" ||
        detailedStatus === "BE Noted, Arrival Pending" ||
        detailedStatus === ""
          ? false
          : true,
      renderCell: (cell) => {
        // console.log(cell.row.eta);
        return cell.row.eta === "undefined.undefined.d." ||
          cell.row.eta === undefined
          ? ""
          : cell.row.eta;
      },
    },

    {
      field: "arrival_date",
      sortable: false,
      headerName: "Arrival Date",
      width: 250,
      align: "center",
      hide: detailedStatus !== "BE Noted, Clearance Pending" ? true : false,
      renderCell: (cell) => {
        return cell.row.container_nos.map((container, id) => {
          console.log(container);
          return (
            <React.Fragment key={id}>
              {container.arrival_date}
              <br />
            </React.Fragment>
          );
        });
      },
    },

    {
      field: "out_of_charge",
      sortable: false,
      headerName: "Out of Charge Date",
      width: 250,
      align: "center",
      hide: detailedStatus !== "Custom Clearance Completed" ? true : false,
    },

    {
      field: "pol",
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
          <Link to={`/${params.importer}/job/${cell.row.job_no}`}>
            View Job
          </Link>
        );
      },
    },
  ];

  return columns;
}

export default useJobColumns;
