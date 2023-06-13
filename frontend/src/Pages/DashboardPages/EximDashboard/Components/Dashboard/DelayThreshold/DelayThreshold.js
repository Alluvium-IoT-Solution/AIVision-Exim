import React, { Fragment } from "react";
import styles from './DelayThresholdStyles.module.css'

export const options_machineUtilization = {
    chartArea: { width: '50%', height: '75%', top: 5 },
    backgroundColor: "transparent",
    legend: "none",
};

const DelayThreshold = props => {
    return (
        <Fragment>
            <table className={"table " + styles.table}>

<tbody>
    <tr style={{ fontWeight: "bold" }}>
        <td >Delay in taking out unit Threshold-20 sec</td>
        <td >Machine id  <div className="dropdown">
            <i className="fa-solid fa-angle-down "></i>
            <div className="dropdown-content">
                <a href="/">Link</a>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
            </div>
        </div></td>
        <td style={{ width: "110px", textAlign: "center" }}>Unit Id  <div className="dropdown">
            <i className="fa-solid fa-angle-down "></i>
            <div className="dropdown-content">
                <a href="/">Link</a>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
            </div>
        </div></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td style={{ fontWeight: "bold", textAlign: "center" }}>Time</td>
    </tr>
    <tr>
        <td>Machine ended process(red light)</td>
        <td></td>
        <td>3:27:00 pm</td>
    </tr>
    <tr>
        <td>Machine Restarts the process (red light)</td>
        <td></td>
        <td>3:45:00 pm</td>
    </tr>
    <tr>
        <td>Loss in production due delay in taking out unit</td>
        <td></td>
        <td>4:00:00 pm</td>
    </tr>
    <tr>
        <td>Net Loss in production due delay in taking out unit</td>
        <td></td>
        <td>4:00:00 pm</td>
    </tr>
</tbody>
</table>
        </Fragment>
    )
}

export default DelayThreshold