import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { ClientContext } from "../Context/ClientContext";
import axios from "axios";
import "../styles/job-list.scss";
import useJobColumns from "../customHooks/useJobColumns";
import { convertToExcel } from "../utils/convertToExcel";
import { getTableRowsClassname } from "../utils/getTableRowsClassname";
import { convertToTimestamp } from "../utils/convertToTimestamp";

function JobsList() {
  const params = useParams();
  const { clientName } = useContext(ClientContext);
  const [detailedStatus, setDetailedStatus] = useState("");
  const columns = useJobColumns();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      setRows([]);
      const res = await axios.get(
        `http://localhost:9002/${params.client}/jobs/${params.status}`
      );

      if (detailedStatus === "") {
        setRows(res.data);
      } else if (detailedStatus === "Estimated Time of Arrival") {
        const filteredRows = res.data.filter(
          (item) => item.detailed_status === detailedStatus
        );

        const sortedRows = filteredRows.sort((a, b) => {
          const dateA = convertToTimestamp(a.bill_of_entry_date);
          const dateB = convertToTimestamp(b.bill_of_entry_date);
          return dateA - dateB;
        });
        setRows(sortedRows);
      } else if (detailedStatus === "Sea IGM Filed") {
        const filteredRows = res.data.filter(
          (item) => item.detailed_status === detailedStatus
        );
        setRows(filteredRows);
      } else if (detailedStatus === "BE Noted, Arrival Pending") {
        const filteredRows = res.data.filter(
          (item) => item.detailed_status === detailedStatus
        );
        const sortedRows = filteredRows.sort((a, b) => {
          const dateA = convertToTimestamp(a.arrival_date);
          const dateB = convertToTimestamp(b.arrival_date);
          return dateA - dateB;
        });
        setRows(sortedRows);
      } else if (detailedStatus === "BE Noted, Clearance Pending") {
        const filteredRows = res.data.filter(
          (item) => item.detailed_status === detailedStatus
        );
        setRows(filteredRows);
      } else if (detailedStatus === "Custom Clearance Completed") {
        const filteredRows = res.data.filter(
          (item) => item.detailed_status === detailedStatus
        );
        setRows(filteredRows);
      }
    }
    getData();
  }, [params.client, params.status, detailedStatus]);

  return (
    <>
      <div className="jobs-list-header">
        <h3>{clientName}</h3>
        <select
          name="status"
          onChange={(e) => setDetailedStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Custom Clearance Completed">
            Custom Clearance Completed
          </option>
          <option value="BE Noted, Clearance Pending">
            BE Noted, Clearance Pending
          </option>
          <option value="BE Noted, Arrival Pending">
            BE Noted, Arrival Pending
          </option>
          <option value="Sea IGM Filed">Sea IGM Filed</option>
          <option value="Estimated Time of Arrival">
            Estimated Time of Arrival
          </option>
        </select>

        <button onClick={() => convertToExcel(rows)}>Export</button>
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
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        rowHeight={50}
        autoHeight={true}
        disableColumnMenu={true}
        disableSelectionOnClick
        getRowClassName={getTableRowsClassname}
      />
    </>
  );
}

export default JobsList;
