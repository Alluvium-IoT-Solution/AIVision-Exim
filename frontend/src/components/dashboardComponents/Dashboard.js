import React, { useContext, useState } from "react";
import "../../styles/dashboard.scss";
import RegisterModal from "../RegisterModal";
import JobsOverview from "./JobsOverview";
import ImporterWiseDetails from "./ImporterWiseDetails";
import { Container, Row, Col } from "react-bootstrap";
import AssignJobsModal from "./AssignJobsModal";
import { UserContext } from "../../Context/UserContext";
import Lottie from "lottie-react";
import notFound from "../../assets/lottie-files/notFound.json";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";

const Dashboard = (props) => {
  // Modal
  const [openRegisterModal, setoOpenRegisterModal] = useState(false);
  const [openAssignJobsModal, setOpenAssignJobsModal] = useState(false);
  const handleOpenRegisterModal = () => setoOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setoOpenRegisterModal(false);
  const handleOpenAssignJobsModal = () => setOpenAssignJobsModal(true);
  const handleCloseAssignJobsModal = () => setOpenAssignJobsModal(false);

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

  return (
    <>
      <Container fluid className="dashboard-container">
        <h4>Hello, {user.username}</h4>

        {/* If user role is not User, show JobsOverview component */}
        {user.role !== "User" ? (
          <JobsOverview selectedYear={props.selectedYear} />
        ) : // If user role is User and importer has been assigned to that user show JobsOverview component
        user.role === "User" && user.importer ? (
          <>
            <p>Importer - {user.importer}</p>
            <JobsOverview />
          </>
        ) : // If user role is User and importer has not been assigned to that user show the text "You have not been assigned any importer yet"
        user.role === "User" && user.importer === undefined ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Lottie loop={true} animationData={notFound}></Lottie>
            <h3 style={{ marginTop: "50px" }}>
              You have not been assigned any importer yet
            </h3>
          </div>
        ) : (
          ""
        )}

        <>
          <Container fluid className="dashboard-container">
            <Row>
              {user.role !== "User" && (
                <ImporterWiseDetails selectedYear={props.selectedYear} />
              )}
              <Col xs={6} className="dashboard-col"></Col>
            </Row>
          </Container>
        </>
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

export default Dashboard;
