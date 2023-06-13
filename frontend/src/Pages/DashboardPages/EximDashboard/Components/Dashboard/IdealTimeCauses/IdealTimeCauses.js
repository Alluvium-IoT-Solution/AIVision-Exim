import React, { Fragment } from "react";

import { Chart } from "react-google-charts";

export const options_pichart = {
  title: null,
  pieHole: 0.6,
  is3D: false,
  legend: 'none',
  backgroundColor: "transparent",
  pieSliceTextStyle: {
    color: "black"
  },
  chartArea: { top: 0, left: 0, width: '50%', height: '75%' },
  pieSliceBorderColor: 'none',
  pieSliceText: 'none',
  width: 300, slices: {
    0: { color: "#BF3938" },
    1: { color: "#939395" },
    2: { color: "#606060" },
  },

};

const IdealTimeCauses = props => {
  return (
    <Fragment>
      <h5 className="ml-3">
        <strong>Ideal time causes</strong>
      </h5>
      <h5 style={{ textAlign: "end", marginTop: "-30px", marginRight: "15px" }}>
        <strong>All</strong>
      </h5>
      <div className="row">
        <div className={"mt-3 col-12 col-xs-12 col-sm-5 col-lg-5 ml-5"}>
          <Chart chartType="PieChart" data={props.data} options={options_pichart} />
          <h5 style={{ position: "absolute", top: "55px", left: "58px", fontSize: "16px", textAlign: "center", }}>
            <strong>7.5%</strong> <br /> Idealtime
          </h5>
        </div>
        {/* <p style={{ height: "180px", width: "2px", backgroundColor: "black", position: "absolute", right: "55%", }}></p> */}
        <div className="col- ml-2 table-responsive mt-4 col-xs-12 col-md-5  overflow-auto" align="left">
          <table style={{ fontSize: "large", width: "100%", borderCollapse: "separate", borderSpacing: "0 15px", }}>
            <tbody>
              <tr>
                <td><i className="fa-solid fa-square mx-2" style={{ color: "#606060" }}  ></i>  Lubrication</td>
                <td>30%</td>
              </tr>

              <tr>
                <td> <i className="fa-solid fa-square mx-2" style={{ color: "#939395" }}></i>Hydraulic Check</td>
                <td>30%</td>
              </tr>

              <tr>
                <td><i className="fa-solid fa-square mx-2" style={{ color: "#BF3938" }}></i>Strange Sound</td>
                <td>40%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default IdealTimeCauses