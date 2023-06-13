import React, { Fragment } from "react";
import { Chart } from "react-google-charts";



export const options_sharecapacity = {
    backgroundColor: "transparent",
    legend: "none",
    hAxis: {
        title: "Machines",
      },
      vAxis: {
        title: "Time",
      },
};

const ShareCapacity = props => {
    return (
        <Fragment>
             <h5 className="text-center"><strong>Share Capacity</strong>  <div className="dropdown">
          <i className="fa-solid fa-angle-down "></i>
          <div className="dropdown-content">
            <a href="/">Link</a>
            <a href="/">Link 2</a>
            <a href="/">Link 3</a>
          </div>
        </div></h5>

            <div className='row'>

                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    data={props.data}
                    options={options_sharecapacity}
                />
            </div>
        </Fragment>
    )
}

export default ShareCapacity