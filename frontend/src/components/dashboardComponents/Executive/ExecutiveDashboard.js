import React, { useContext, useState } from "react";
import "../../../styles/dashboard.scss";
import RegisterModal from "../RegisterModal";
import JobsOverview from "../JobsOverview";
import ImporterWiseDetails from "../ImporterWiseDetails";
import { Container, Row, Col } from "react-bootstrap";
import AssignJobsModal from "../AssignJobsModal";
import { UserContext } from "../../../Context/UserContext";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import { SelectedYearContext } from "../../../Context/SelectedYearContext";
import { SelectedImporterContext } from "../../../Context/SelectedImporterContext";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { AssignedImportersContext } from "../../../Context/AssignedImportersContext";

const ExecutiveDashboard = () => {
  // Modal
  const [openRegisterModal, setoOpenRegisterModal] = useState(false);
  const [openAssignJobsModal, setOpenAssignJobsModal] = useState(false);
  const handleOpenRegisterModal = () => setoOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setoOpenRegisterModal(false);
  const handleOpenAssignJobsModal = () => setOpenAssignJobsModal(true);
  const handleCloseAssignJobsModal = () => setOpenAssignJobsModal(false);
  const { selectedYear } = useContext(SelectedYearContext);
  const { assignedImporters } = useContext(AssignedImportersContext);
  const { selectedImporter, setSelectedImporter } = useContext(
    SelectedImporterContext
  );

  const { user } = useContext(UserContext);

  const actions = [
    {
      icon: <PersonAddAltRoundedIcon />,
      name: "Add User",
      onClick: handleOpenRegisterModal,
    },
    {
      icon: <AssignmentIndRoundedIcon />,
      name: "Assign Jobs",
      onClick: handleOpenAssignJobsModal,
    },
  ];

  const importerList = assignedImporters.map((importer) => importer.importer);

  return (
    <>
      <Container fluid className="dashboard-container">
        <div style={{ display: "flex", marginTop: "20px" }}>
          <h4 style={{ flex: 1 }}>Hello, {user.username}</h4>
          <Autocomplete
            disablePortal
            options={importerList}
            getOptionLabel={(option) => option}
            sx={{ width: "500px !important" }}
            renderInput={(params) => (
              <TextField {...params} label="Select importer" />
            )}
            id="user"
            name="user"
            onChange={(event, newValue) => {
              setSelectedImporter(newValue);
              localStorage.setItem("selectedImporter", newValue);
            }}
            value={selectedImporter}
            style={{ marginBottom: "15px" }}
          />
        </div>

        <JobsOverview selectedYear={selectedYear} />

        <Container fluid className="dashboard-container">
          <Row>
            {user.role !== "Executive" && (
              <ImporterWiseDetails selectedYear={selectedYear} />
            )}
            <Col xs={6} className="dashboard-col"></Col>
          </Row>
        </Container>
      </Container>

      <RegisterModal
        openRegisterModal={openRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
      />

      <AssignJobsModal
        openAssignJobsModal={openAssignJobsModal}
        handleCloseAssignJobsModal={handleCloseAssignJobsModal}
      />

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default ExecutiveDashboard;
