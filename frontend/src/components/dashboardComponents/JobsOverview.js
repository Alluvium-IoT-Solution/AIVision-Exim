import React, { useContext, useEffect, useState } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { IconButton } from "@mui/material";
import axios from "axios";
import { apiRoutes } from "../../utils/apiRoutes";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";

function JobsOverview() {
  const [jobs, setJobs] = useState();
  const { jobsOverviewAPI, importerJobsAPI } = apiRoutes();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getJobsOverview() {
      const res = await axios.get(
        user.role === "User"
          ? `${importerJobsAPI}/${user.importer}`
          : jobsOverviewAPI
      );
      setJobs(res.data);
    }

    getJobsOverview();
  }, []);

  return (
    <Row className="jobs-overview">
      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton>
            <DensitySmallIcon />
          </IconButton>
          <div>
            <p>Total Jobs</p>
            <h3>{jobs?.totalJobs}</h3>
          </div>
        </div>
      </Col>

      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton>
            <HourglassBottomIcon />
          </IconButton>
          <div>
            <p>Pending Jobs</p>
            <h3>{jobs?.pendingJobs}</h3>
          </div>
        </div>
      </Col>

      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton>
            <CheckCircleOutlineIcon />
          </IconButton>
          <div>
            <p>Completed Jobs</p>
            <h3>{jobs?.completedJobs}</h3>
          </div>
        </div>
      </Col>

      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton>
            <DoDisturbIcon />
          </IconButton>
          <div>
            <p>Canceled Jobs</p>
            <h3>{jobs?.canceledJobs}</h3>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default JobsOverview;
