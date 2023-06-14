import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { validationSchema } from "../schema/JobSchema";
import { useFormik } from "formik";
import "../styles/job-details.scss";

function JobDetails() {
  const params = useParams();
  const [data, setData] = useState(null);
  const options = Array.from({ length: 25 }, (_, index) => index);
  const navigate = useNavigate();
  const [detentionFrom, setDetentionFrom] = useState("");

  useEffect(() => {
    async function getJobDetails() {
      const response = await axios.get(
        `http://localhost:9002/${params.client}/job/${params.jobNo}`
      );
      setData(response.data);
    }

    getJobDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      arrival_date: "",
      eta: "",
      free_time: "",
      status: "",
      detailed_status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");
        const formattedDate = `${day}.${month}.${year.slice(-2)}`;
        return formattedDate;
      }

      const eta = convertDateFormat(values.eta);

      console.log({
        arrival_date: values.arrival_date,
        eta: eta,
        free_time: values.free_time,
        status: values.status,
        detailed_status: values.detailed_status,
      });

      const res = await axios.put(
        `http://localhost:9002/${params.client}/updatejob/${params.jobNo}`,
        {
          arrival_date: values.arrival_date,
          eta: eta,
          free_time: values.free_time,
          status: values.status,
          detailed_status: values.detailed_status,
        }
      );
      console.log(res);
      navigate(`/${params.client}/jobs/pending`);
    },
  });
  console.log(formik.values.free_time);

  useEffect(() => {
    if (data) {
      function convertDateFormat(dateString) {
        return dateString.replace(/^(\d{2})\.(\d{2})\.(\d{2})$/, "20$3-$2-$1");
      }

      const arrival_date = convertDateFormat(data.arrival_date);
      const eta = convertDateFormat(data.eta);

      formik.setValues({
        arrival_date: arrival_date,
        eta: eta,
        free_time: data.free_time,
        status: data.status,
        detailed_status: data.detailed_status,
      });
    }
  }, [data]);

  console.log(formik.values.free_time);

  return (
    <>
      <Container>
        <Row>
          <h4>Job Number:&nbsp;{params.jobNo}</h4>
        </Row>
      </Container>

      {data !== null && (
        <form onSubmit={formik.handleSubmit}>
          <Row className="job-detail-row">
            <Col>
              <strong>Bill of Lading Number:&nbsp;</strong>
              {data.bill_of_lading_number}
            </Col>
            <Col>
              <strong>Bill of Lading Date:&nbsp;</strong>
              {data.bill_of_lading_date}
            </Col>
            <Col>
              <strong>Bill of Entry Date:&nbsp;</strong>
              {data.bill_of_entry_date}
            </Col>
          </Row>

          <Row className="job-detail-row">
            <Col>
              <strong>Port of Discharge:&nbsp;</strong>
              {data.port_of_discharge}
            </Col>
            <Col>
              <strong>Shipping Line:&nbsp;</strong>
              {data.shipping_line}
            </Col>
            <Col></Col>
          </Row>

          <Row className="job-detail-row">
            <Col>
              <div className="job-detail-input-container">
                <strong>Arrival Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="arrival_date"
                  name="arrival_date"
                  label=""
                  value={formik.values.arrival_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.arrival_date &&
                    Boolean(formik.errors.arrival_date)
                  }
                  helperText={
                    formik.touched.arrival_date && formik.errors.arrival_date
                  }
                />
              </div>
            </Col>
            <Col>
              <div className="job-detail-input-container">
                <strong>ETA/ Discharge Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="eta"
                  name="eta"
                  label=""
                  value={formik.values.eta}
                  onChange={formik.handleChange}
                  error={formik.touched.eta && Boolean(formik.errors.eta)}
                  helperText={formik.touched.eta && formik.errors.eta}
                />
              </div>
            </Col>
            <Col>
              <div className="job-detail-input-container">
                <strong>Free Time:&nbsp;</strong>
                <TextField
                  select
                  size="large"
                  margin="normal"
                  variant="outlined"
                  id="free_time"
                  name="free_time"
                  label=""
                  value={formik.values.free_time}
                  onChange={formik.handleChange}
                >
                  {options.map((option, id) => (
                    <MenuItem key={id} value={(option, id)}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Col>
          </Row>

          <Row className="job-detail-row">
            <Col>
              <div className="job-detail-input-container">
                <strong>Status:&nbsp;</strong>
                <TextField
                  select
                  size="large"
                  margin="normal"
                  variant="outlined"
                  id="status"
                  name="status"
                  label=""
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </div>
            </Col>
            <Col>
              <div className="job-detail-input-container">
                <strong>Detailed Status:&nbsp;</strong>
                <TextField
                  select
                  size="large"
                  margin="normal"
                  variant="outlined"
                  id="detailed_status"
                  name="detailed_status"
                  label=""
                  value={formik.values.detailed_status}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Estimated Time of Arrival">
                    Estimated Time of Arrival
                  </MenuItem>
                  <MenuItem value="Gateway IGM Filed">
                    Gateway IGM Filed
                  </MenuItem>
                  <MenuItem value="BE Noted, Arrival Pending">
                    BE Noted, Arrival Pending
                  </MenuItem>
                  <MenuItem value="BE Noted, Clearance Pending">
                    BE Noted, Clearance Pending
                  </MenuItem>
                  <MenuItem value="Custom Clearance Completed">
                    Custom Clearance Completed
                  </MenuItem>
                </TextField>
              </div>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <strong>Detention From:</strong> */}
            </Col>
          </Row>

          <Row className="job-detail-row">
            <Col></Col>
            <Col></Col>
            <Col>
              <button type="submit">Submit</button>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
}

export default JobDetails;
