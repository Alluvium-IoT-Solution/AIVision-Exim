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
  if (data) {
    const a = data.container_nos.map((c) => c.size);
    console.log(a);
  }
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
              <strong>Importer:&nbsp;</strong>
              <span className="non-editable-text">{data.importer}</span>
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
                &#8377; {data.cif_amount} | FC {data.unit_price}
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
              <strong>POL:&nbsp;</strong>
              <span className="non-editable-text">{data.loading_port}</span>
            </Col>
            <Col>
              <strong>Shipping Line:&nbsp;</strong>
              <span className="non-editable-text">
                {data.shipping_line_airline}
              </span>
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <strong>Out of Charge:&nbsp;</strong>
              <span className="non-editable-text">{data.out_of_charge}</span>
            </Col>
          </Row>

          <Row className="job-detail-row">
            <Col>
              <strong>Bill of Entry Number:&nbsp;</strong>
              <span className="non-editable-text">{data.be_no}</span>
            </Col>
            <Col>
              <strong>Bill of Entry Date:&nbsp;</strong>
              <span className="non-editable-text">{data.be_date}</span>
            </Col>
            <Col></Col>
          </Row>

          <Row className="job-detail-row">
            <Col>
              <strong>Bill of Lading Number:&nbsp;</strong>
              <span className="non-editable-text">{data.awb_bl_no}</span>
            </Col>
            <Col>
              <strong>Bill of Lading Date:&nbsp;</strong>
              <span className="non-editable-text">{data.awb_bl_date}</span>
            </Col>
            <Col></Col>
          </Row>

          <Row className="job-detail-row">
            <Col>
              <strong>Number of Packages:&nbsp;</strong>
              <span className="non-editable-text">{data.no_of_pkgs}</span>
            </Col>
            <Col>
              <strong>Gross Weight:&nbsp;</strong>
              <span className="non-editable-text">{data.gross_weight}</span>
            </Col>
            <Col></Col>
          </Row>

          <Row className="job-detail-row">
            <Col xs={5}>
              <div className="job-detail-input-container">
                <strong>Description:&nbsp;</strong>
                <TextField
                  size="large"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  id="description"
                  name="description"
                  label=""
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </div>
            </Col>
            <Col xs={3}>
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
            <Col>
              <div className="job-detail-input-container">
                <strong>DO Validity:&nbsp;</strong>
                <TextField
                  size="large"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  id="do_validity"
                  name="do_validity"
                  label=""
                  value={formik.values.do_validity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.do_validity &&
                    Boolean(formik.errors.do_validity)
                  }
                  helperText={
                    formik.touched.do_validity && formik.errors.do_validity
                  }
                />
              </div>
            </Col>
            <Col>
              <div className="job-detail-input-container">
                <strong>Checklist:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  id="checklist"
                  name="checklist"
                  label=""
                  value={formik.values.checklist}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.checklist && Boolean(formik.errors.checklist)
                  }
                  helperText={
                    formik.touched.checklist && formik.errors.checklist
                  }
                />
              </div>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col>
              <div className="job-detail-input-container">
                <strong>Remarks:&nbsp;</strong>
                <TextField
                  multiline
                  fullWidth
                  size="large"
                  margin="normal"
                  variant="outlined"
                  id="remarks"
                  name="remarks"
                  label=""
                  value={formik.values.remarks}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.remarks && Boolean(formik.errors.remarks)
                  }
                  helperText={formik.touched.remarks && formik.errors.remarks}
                />
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
                        <Col xs={4}>
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
                      <Col xs={2}>
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

                      <Col
                        xs={3}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <strong>Detention From:&nbsp;</strong>
                        {detentionFrom[index]}
                      </Col>
                      <Col style={{ display: "flex", alignItems: "center" }}>
                        <strong>Size:&nbsp;</strong>
                        {container.size}
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
                aria-label="submit"
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
