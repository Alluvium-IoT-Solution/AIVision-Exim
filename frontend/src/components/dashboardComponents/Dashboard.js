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

const Dashboard = () => {
  // Modal
  const [openRegisterModal, setoOpenRegisterModal] = useState(false);
  const [openAssignJobsModal, setOpenAssignJobsModal] = useState(false);
  const handleOpenRegisterModal = () => setoOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setoOpenRegisterModal(false);
  const handleOpenAssignJobsModal = () => setOpenAssignJobsModal(true);
  const handleCloseAssignJobsModal = () => setOpenAssignJobsModal(false);

  const { user } = useContext(UserContext);

  return (
    <>
      <Container fluid className="dashboard-container">
        <div className="user-info">
          <h4>Hello, {user.username}</h4>
          {/* Hide assign jobs and add user button if user role is User */}
          {user.role !== "User" && (
            <>
              <button
                onClick={handleOpenRegisterModal}
                className="dashboard-btn"
              >
                Add User
              </button>
              <button
                onClick={handleOpenAssignJobsModal}
                className="dashboard-btn"
              >
                Assign Jobs
              </button>
            </>
          )}
        </div>

        {/* If user role is not User, show JobsOverview component */}
        {user.role !== "User" ? (
          <JobsOverview />
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
              {user.role !== "User" && <ImporterWiseDetails />}
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
    </>
  );
};

export default Dashboard;
