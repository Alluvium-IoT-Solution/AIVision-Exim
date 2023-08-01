import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ClientContext } from "../Context/ClientContext";
import "../styles/job-list.scss";
import useJobColumns from "../customHooks/useJobColumns";
import { getTableRowsClassname } from "../utils/getTableRowsClassname";
import useFetchJobList from "../customHooks/useFetchJobList";
import { detailedStatusOptions } from "../assets/data/detailedStatusOptions";
import { useParams } from "react-router-dom";
import SelectFieldsModal from "./SelectFieldsModal";
import { UserContext } from "../Context/UserContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function JobsList(props) {
  const { importerName } = useContext(ClientContext);
  const { user } = useContext(UserContext);

  const [detailedStatus, setDetailedStatus] = useState("");
  const columns = useJobColumns(detailedStatus);
  const { rows } = useFetchJobList(detailedStatus, props.selectedYear);
  const params = useParams();

  // Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <div className="jobs-list-header">
        <h5>{user.role !== "User" ? importerName : user.importer}</h5>
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
          onClick={handleOpenModal}
          style={{ cursor: "pointer" }}
          aria-label="export-btn"
        >
          Export
        </button>
      </div>

      <DataGrid
        getRowId={(row) => row.job_no}
        sx={{
          padding: "0 30px",
          height: "680px",
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
        getRowHeight={() => "auto"}
        autoHeight={false}
        disableSelectionOnClick
        getRowClassName={getTableRowsClassname}
      />

      <SelectFieldsModal
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        rows={rows}
        importerName={user.role !== "User" ? importerName : user.importer}
        status={params.status}
        detailedStatus={detailedStatus}
      />
    </>
  );
}

export default JobsList;
