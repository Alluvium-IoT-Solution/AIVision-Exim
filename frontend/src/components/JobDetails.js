import React, { useState, useRef, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IconButton, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "../styles/job-details.scss";
import useFetchJobDetails from "../customHooks/useFetchJobDetails";
import Checkbox from "@mui/material/Checkbox";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import { SelectedYearContext } from "../Context/SelectedYearContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

function JobDetails() {
  const params = useParams();
  const options = Array.from({ length: 25 }, (_, index) => index);
  const [checked, setChecked] = useState(false);
  const { selectedYear } = useContext(SelectedYearContext);
  const [selectedRegNo, setSelectedRegNo] = useState();
  const { data, detentionFrom, formik } = useFetchJobDetails(
    params,
    checked,
    selectedYear,
    setSelectedRegNo
  );
  const bl_no_ref = useRef();
  const container_number_ref = useRef([]);
  const [snackbar, setSnackbar] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedRegNo(event.target.value);
  };

  const handleCopyClick = () => {
    if (bl_no_ref.current) {
      const textToCopy = bl_no_ref.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 1000);
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });
    }
  };

  const handleCopyContainerNumber = (container_number) => {
    let containerNumber = container_number;
    navigator.clipboard.writeText(containerNumber).then(() => {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 1000);
    });
  };

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
            <Col xs={5}>
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
            <Col xs={5}>
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
            <Col xs={5}>
              <strong>POL:&nbsp;</strong>
              <span className="non-editable-text">{data.loading_port}</span>
            </Col>
            <Col>
              <strong>Shipping Line:&nbsp;</strong>
              <span className="non-editable-text">
                {data.shipping_line_airline}
              </span>
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}></Col>
          </Row>

          <Row className="job-detail-row">
            <Col xs={5}>
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
            <Col xs={5}>
              <strong>Bill of Lading Number:&nbsp;</strong>
              <span ref={bl_no_ref} className="non-editable-text">
                {data.awb_bl_no}
              </span>
              <IconButton onClick={handleCopyClick} aria-label="copy-btn">
                <ContentCopyIcon />
              </IconButton>
            </Col>
            <Col xs={7}>
              <strong>Bill of Lading Date:&nbsp;</strong>
              <span className="non-editable-text">{data.awb_bl_date}</span>
            </Col>
            <Col></Col>
          </Row>

          <Row className="job-detail-row">
            <Col xs={5}>
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
                  <MenuItem value="Discharged">Discharged</MenuItem>
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
            <Col>
              <div className="job-detail-input-container">
                <strong>Delivery Date:&nbsp;</strong>
                <TextField
                  size="large"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  id="delivery_date"
                  name="delivery_date"
                  label=""
                  value={formik.values.delivery_date}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "10px" }}>
            <Col xs={4}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={setSelectedRegNo}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="sims"
                    control={<Radio checked={selectedRegNo === "sims"} />}
                    label="SIMS"
                  />
                  <FormControlLabel
                    value="pims"
                    control={<Radio checked={selectedRegNo === "pims"} />}
                    label="PIMS"
                  />
                  <FormControlLabel
                    value="nfmims"
                    control={<Radio checked={selectedRegNo === "nfmims"} />}
                    label="NFMIMS"
                  />
                </RadioGroup>
              </FormControl>
            </Col>
            <Col xs={5}>
              <div className="job-detail-input-container">
                {selectedRegNo && (
                  <>
                    <strong>
                      {selectedRegNo === "sims"
                        ? "SIMS Reg"
                        : selectedRegNo === "pims"
                        ? "PIMS Reg"
                        : selectedRegNo === "nfmims"
                        ? "NFMIMS Reg"
                        : ""}
                      &nbsp;
                    </strong>
                    <TextField
                      id="outlined-start-adornment"
                      fullWidth={true}
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {selectedRegNo === "sims"
                              ? "STL"
                              : selectedRegNo === "pims"
                              ? "ORIGINAL-DPIIT-PPR"
                              : selectedRegNo === "nfmims"
                              ? "MIN"
                              : ""}
                          </InputAdornment>
                        ),
                      }}
                      name={
                        selectedRegNo === "sims"
                          ? "sims_reg_no"
                          : selectedRegNo === "pims"
                          ? "pims_reg_no"
                          : selectedRegNo === "nfmims"
                          ? "nfmims_reg_no"
                          : ""
                      }
                      value={
                        selectedRegNo === "sims"
                          ? formik.values.sims_reg_no
                          : selectedRegNo === "pims"
                          ? formik.values.pims_reg_no
                          : selectedRegNo === "nfmims"
                          ? formik.values.nfmims_reg_no
                          : ""
                      }
                      onChange={formik.handleChange}
                    />
                  </>
                )}
              </div>
            </Col>
            <Col xs={3}>
              {selectedRegNo && (
                <div className="job-detail-input-container">
                  <strong>
                    {selectedRegNo === "sims"
                      ? "SIMS Date"
                      : selectedRegNo === "pims"
                      ? "PIMS Date"
                      : "NFMIMS Date"}
                    &nbsp;
                  </strong>
                  <TextField
                    fullWidth={true}
                    size="large"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    id={
                      selectedRegNo === "sims"
                        ? "sims_date"
                        : selectedRegNo === "pims"
                        ? "pims_date"
                        : "nfmims_date"
                    }
                    name={
                      selectedRegNo === "sims"
                        ? "sims_date"
                        : selectedRegNo === "pims"
                        ? "pims_date"
                        : "nfmims_date"
                    }
                    value={
                      selectedRegNo === "sims"
                        ? formik.values.sims_date
                        : selectedRegNo === "pims"
                        ? formik.values.pims_date
                        : formik.values.nfmims_date
                    }
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
              )}
            </Col>
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
                <strong>Assessment Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="assessment_date"
                  name="assessment_date"
                  value={formik.values.assessment_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.assessment_date &&
                    Boolean(formik.errors.assessment_date)
                  }
                  helperText={
                    formik.touched.assessment_date &&
                    formik.errors.assessment_date
                  }
                />
              </div>
            </Col>
            <Col>
              <div className="job-detail-input-container">
                <strong>Examination Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="examination_date"
                  name="examination_date"
                  value={formik.values.examination_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.examination_date &&
                    Boolean(formik.errors.examination_date)
                  }
                  helperText={
                    formik.touched.examination_date &&
                    formik.errors.examination_date
                  }
                />
              </div>
            </Col>
            <Col>
              <div className="job-detail-input-container">
                <strong>Duty Paid Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="duty_paid_date"
                  name="duty_paid_date"
                  value={formik.values.duty_paid_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.duty_paid_date &&
                    Boolean(formik.errors.duty_paid_date)
                  }
                  helperText={
                    formik.touched.duty_paid_date &&
                    formik.errors.duty_paid_date
                  }
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <div className="job-detail-input-container">
                <strong>Out of Charge Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="out_of_charge_date"
                  name="out_of_charge_date"
                  value={formik.values.out_of_charge_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.out_of_charge_date &&
                    Boolean(formik.errors.out_of_charge_date)
                  }
                  helperText={
                    formik.touched.out_of_charge_date &&
                    formik.errors.out_of_charge_date
                  }
                />
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>

          <Row>
            <Col xs={4}>
              <div className="job-detail-input-container">
                <strong>ETA Date:&nbsp;</strong>
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
                <strong>Discharge Date:&nbsp;</strong>
                <TextField
                  size="large"
                  margin="normal"
                  variant="outlined"
                  type="date"
                  id="discharge_date"
                  name="discharge_date"
                  value={formik.values.discharge_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.discharge_date &&
                    Boolean(formik.errors.discharge_date)
                  }
                  helperText={
                    formik.touched.discharge_date &&
                    formik.errors.discharge_date
                  }
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
                        <span ref={container_number_ref[index]}>
                          {container.container_number}
                        </span>
                        <IconButton
                          onClick={() =>
                            handleCopyContainerNumber(
                              container.container_number
                            )
                          }
                          aria-label="copy-btn"
                        >
                          <ContentCopyIcon />
                        </IconButton>
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
                        <div className="job-detail-input-container">
                          <strong>Size:&nbsp;</strong>
                          <TextField
                            select
                            size="large"
                            margin="normal"
                            variant="outlined"
                            id={`size_${index}`}
                            name={`container_nos[${index}].size`}
                            label=""
                            value={container.size}
                            onChange={formik.handleChange}
                          >
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="40">40</MenuItem>
                          </TextField>
                        </div>
                      </Col>
                      {checked && <Col></Col>}
                    </Row>
                  </div>
                  <hr />
                </div>
              );
            })}

          <Row style={{ margin: "20px 0" }}>
            <Col>
              <button
                type="submit"
                style={{ float: "right", margin: "0px 20px" }}
                aria-label="submit-btn"
              >
                Submit
              </button>
            </Col>
          </Row>
        </form>
      )}

      <Snackbar
        open={snackbar}
        message="Copied to clipboard"
        sx={{ left: "auto !important", right: "24px !important" }}
      />
    </>
  );
}

export default JobDetails;
