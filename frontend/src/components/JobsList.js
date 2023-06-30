import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ClientContext } from "../Context/ClientContext";
import "../styles/job-list.scss";
import useJobColumns from "../customHooks/useJobColumns";
import { convertToExcel } from "../utils/convertToExcel";
import { getTableRowsClassname } from "../utils/getTableRowsClassname";
import useFetchJobList from "../customHooks/useFetchJobList";
import { detailedStatusOptions } from "../assets/data/detailedStatusOptions";
import { useParams } from "react-router-dom";

function JobsList() {
  const { importerName } = useContext(ClientContext);
  const [detailedStatus, setDetailedStatus] = useState("");
  const columns = useJobColumns(detailedStatus);
  const rows = useFetchJobList(detailedStatus);
  const params = useParams();

  return (
    <>
      <div className="jobs-list-header">
        <h5>
          {importerName} |&nbsp;
          {params.status === "pending"
            ? "Pending Jobs"
            : params.status === "completed"
            ? "Completed  Jobs"
            : params.status === "cancelled"
            ? "Cancelled  Jobs"
            : "All Jobs"}
        </h5>
        <select
          name="status"
          onChange={(e) => setDetailedStatus(e.target.value)}
        >
          {detailedStatusOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            convertToExcel(rows, importerName, params.status, detailedStatus)
          }
          aria-label="export"
          style={{ cursor: "pointer" }}
        >
          Export
        </button>
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
        pageSize={50}
        stickyHeader
        rowsPerPageOptions={[50]}
        rowHeight={150}
        autoHeight={true}
        disableColumnMenu={true}
        disableSelectionOnClick
        getRowClassName={getTableRowsClassname}
      />
    </>
  );
}

export default JobsList;
