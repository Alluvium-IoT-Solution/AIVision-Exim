import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "../styles/job-details.scss";
import useFetchJobDetails from "../customHooks/useFetchJobDetails";
import Checkbox from "@mui/material/Checkbox";

function JobDetails() {
  const params = useParams();
  const options = Array.from({ length: 25 }, (_, index) => index);
  const [checked, setChecked] = useState(false);
  const { data, detentionFrom, formik } = useFetchJobDetails(params, checked);

  return (
    <>
      <Container>
        <Row>
          <h4>
            Job Number:&nbsp;{params.jobNo}&nbsp;|&nbsp;
            {data && `Custom House: ${data.custom_house}`}
          </h4>
        </Row>
      </Container>

      {data !== null && (
        <form onSubmit={formik.handleSubmit}>
          <Row className="job-detail-row">
            <Col>
              <strong>Party:&nbsp;</strong>
              <span className="non-editable-text">{data.party}</span>
            </Col>
            <Col>
              <strong>Invoice Number:&nbsp;</strong>
              <span className="non-editable-text">{data.invoice_number}</span>
            </Col>
            <Col>
              <strong>Invoice Date:&nbsp;</strong>
              <span className="non-editable-text">{data.invoice_date}</span>
            </Col>
          </Row>
          <Row className="job-detail-row">
            <Col>
              <strong>Invoice Value and Unit Price:&nbsp;</strong>
              <span className="non-editable-text">
                {data.invoice_value_and_rate}
              </span>
            </Col>
            <Col>
              <strong>Bill Number:&nbsp;</strong>
              <span className="non-editable-text">{data.bill_no}</span>
            </Col>
            <Col>
              <strong>Bill Date:&nbsp;</strong>
              <span className="non-editable-text">{data.bill_date}</span>
            </Col>
          </Row>
          <Row className="job-detail-row">
            <Col>
              <strong>Commodity:&nbsp;</strong>
              <span className="non-editable-text">{data.commodity}</span>
            </Col>
            <Col>
              <strong>Number of Packages:&nbsp;</strong>
              <span className="non-editable-text">
                {data.number_of_packages}
              </span>
            </Col>
            <Col>
              <strong>Gross Weight:&nbsp;</strong>
              <span className="non-editable-text">{data.gross_weight}</span>
            </Col>
          </Row>
          <Row className="job-detail-row">
            <Col>
              <strong>POL:&nbsp;</strong>
              <span className="non-editable-text">{data.loading_port}</span>
            </Col>
            <Col>
              <strong>Shipping Line:&nbsp;</strong>
              <span className="non-editable-text">
                {data.shipping_line_airline}
              </span>
            </Col>
            <Col>
              <strong>Size:&nbsp;</strong>
              <span className="non-editable-text">{data.size}</span>
            </Col>
          </Row>
          <Row className="job-detail-row">
            <Col>
              <strong>DO Validity:&nbsp;</strong>
              <span className="non-editable-text">{data.do_validity}</span>
            </Col>
            <Col>
              <strong>Bill of Entry Number:&nbsp;</strong>
              <span className="non-editable-text">{data.be_no}</span>
            </Col>
            <Col>
              <strong>Bill of Entry Date:&nbsp;</strong>
              <span className="non-editable-text">{data.be_date}</span>
            </Col>
          </Row>
          <Row className="job-detail-row">
            <Col>
              <strong>Checklist:&nbsp;</strong>
              <span className="non-editable-text">{data.checklist}</span>
            </Col>
            <Col>
              <strong>Bill of Lading Number:&nbsp;</strong>
              <span className="non-editable-text">{data.awb_bl_no}</span>
            </Col>
            <Col>
              <strong>Bill of Lading Date:&nbsp;</strong>
              <span className="non-editable-text">{data.awb_bl_date}</span>
            </Col>
          </Row>
          <Row className="job-detail-row">
            <Col style={{ display: "flex", alignItems: "center" }}>
              <strong>Out of Duty Date:&nbsp;</strong>
              <span className="non-editable-text">{data.out_of_duty_date}</span>
            </Col>
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
          </Row>

          <Row>
            <Col xs={4}>
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
                <Checkbox
                  value={checked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChecked(true);
                    } else {
                      setChecked(false);
                    }
                  }}
                />

                {!checked && (
                  <strong>All containers arrived at same date</strong>
                )}

                {checked && (
                  <>
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
                        formik.touched.arrival_date &&
                        formik.errors.arrival_date
                      }
                    />
                  </>
                )}
              </div>
            </Col>
          </Row>

          <hr />

          {formik.values.status !== "" &&
            formik.values.container_nos.map((container, index) => {
              return (
                <div key={index}>
                  <div style={{ padding: "30px" }}>
                    <h6>
                      <strong>
                        {index + 1}. Container Number:&nbsp;
                        {container.container_number}
                      </strong>
                    </h6>

                    <br />
                    <Row>
                      {!checked && (
                        <Col>
                          <div className="job-detail-input-container">
                            <strong>Arrival Date:&nbsp;</strong>
                            <TextField
                              key={index}
                              size="large"
                              margin="normal"
                              variant="outlined"
                              type="date"
                              id={`arrival_date_${index}`}
                              name={`container_nos[${index}].arrival_date`}
                              label=""
                              value={container.arrival_date}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.container_nos?.[index]
                                  ?.arrival_date &&
                                Boolean(
                                  formik.errors.container_nos?.[index]
                                    ?.arrival_date
                                )
                              }
                              helperText={
                                formik.touched.container_nos?.[index]
                                  ?.arrival_date &&
                                formik.errors.container_nos?.[index]
                                  ?.arrival_date
                              }
                            />
                          </div>
                        </Col>
                      )}
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
                              <MenuItem key={id} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </Col>

                      <Col style={{ display: "flex", alignItems: "center" }}>
                        <strong>Detention From:&nbsp;</strong>
                        {detentionFrom[index]}
                      </Col>
                      {checked && <Col></Col>}
                    </Row>
                  </div>
                  <hr />
                </div>
              );
            })}

          <Row style={{ marginTop: "20px" }}>
            <Col>
              <button
                type="submit"
                style={{ float: "right", margin: "0px 20px" }}
              >
                Submit
              </button>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
}

export default JobDetails;
