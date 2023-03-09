import { React, Fragment } from 'react'
import { Chart } from "react-google-charts";

export const options_linechart = {
    legend: "none",
    backgroundColor: "transparent",
    hAxis: {
        title: "Time",
      },
      vAxis: {
        title: "Production",
      },
};

const Throughput = props => {
    return (
        <Fragment>
                 <h5 className="text-center"><strong>Throughput </strong>  <div className="dropdown">
          <i className="fa-solid fa-angle-down "></i>
          <div className="dropdown-content">
            <a href="/">Link</a>
            <a href="/">Link 2</a>
            <a href="/">Link 3</a>
          </div>
        </div></h5>


            <div className='row'>
                <Chart
                    chartType="LineChart"
                    data={props.data}
                    options={options_linechart}
                    width="100%"
                />
            </div>
        </Fragment>
    )
}

export default Throughput