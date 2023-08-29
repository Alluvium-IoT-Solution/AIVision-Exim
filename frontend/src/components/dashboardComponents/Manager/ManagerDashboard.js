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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { SelectedYearContext } from "../../../Context/SelectedYearContext";
import RemoveUserModal from "../RemoveUserModal";
import TrackTasks from "./TrackTasks";

const ManagerDashboard = () => {
  // Register Modal
  const [openRegisterModal, setoOpenRegisterModal] = useState(false);
  const handleOpenRegisterModal = () => setoOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setoOpenRegisterModal(false);
  // Remove User Modal
  const [openRemoveUserModal, setOpenRemoveUserModal] = useState(false);
  const handleOpenRemoveUserModal = () => setOpenRemoveUserModal(true);
  const handleCloseRemoveUserModal = () => setOpenRemoveUserModal(false);
  // Assign Jobs Modal
  const [openAssignJobsModal, setOpenAssignJobsModal] = useState(false);
  const handleOpenAssignJobsModal = () => setOpenAssignJobsModal(true);
  const handleCloseAssignJobsModal = () => setOpenAssignJobsModal(false);

  const { selectedYear } = useContext(SelectedYearContext);

  const { user } = useContext(UserContext);

  const actions = [
    {
      icon: <PersonAddAltRoundedIcon />,
      name: "Add User",
      onClick: handleOpenRegisterModal,
    },
    {
      icon: <PersonRemoveIcon />,
      name: "Remove User",
      onClick: handleOpenRemoveUserModal,
    },
    {
      icon: <AssignmentIndRoundedIcon />,
      name: "Assign Jobs",
      onClick: handleOpenAssignJobsModal,
    },
  ];

  return (
    <>
      <Container fluid className="dashboard-container">
        <h4>Hello, {user.username}</h4>

        <JobsOverview selectedYear={selectedYear} />
        <Container fluid className="dashboard-container">
          <Row>
            {user.role !== "Executive" && (
              <ImporterWiseDetails selectedYear={selectedYear} />
            )}
            <Col
              xs={6}
              className="dashboard-col"
              style={{ display:"flex !important" }}
            >
              <TrackTasks />
            </Col>
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
      <RemoveUserModal
        openRemoveUserModal={openRemoveUserModal}
        handleCloseRemoveUserModal={handleCloseRemoveUserModal}
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

export default ManagerDashboard;
