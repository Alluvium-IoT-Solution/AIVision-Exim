import React, { Fragment } from "react";
import { Chart } from "react-google-charts";

export const options_machine1 = {
    backgroundColor: "transparent",
    legend: "none",
};

const MachineOverview = props => {
    return (
        <Fragment>
            <h5><strong>{props.title}</strong><i className="fa-solid fa-angle-down"></i></h5>

            <div className='row'>
                <div className={'col-4 mt-4'} style={{ "display": "flex" }}>

                    <table style={{ "fontSize": "small", "width": "100%" }}>
                        <tbody>
                            <tr>
                                <td>Throughput</td>
                                <td>1</td>
                            </tr>

                            <tr>
                                <td>OEE</td>
                                <td>85%</td>
                            </tr>

                            <tr>
                                <td>Capicity Utilization</td>
                                <td>55%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={'col-7'}>
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        data={props.data}
                        options={options_machine1}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MachineOverview