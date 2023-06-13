import React, { Fragment } from "react";
import styles from './ProductivityLossStyles.module.css'

export const options_machineUtilization = {
    chartArea: { width: '50%', height: '75%', top: 5 },
    backgroundColor: "transparent",
    legend: "none",
};

const ProductivityLoss = props => {
    return (
        <Fragment>
          <div className="table-responsive">
          <table className={"table  " + styles.table}>

<tbody >
    <tr style={{ fontWeight: "bold" }}>
        <td >Productivity loss in between units</td>
        <td style={{ width: "60px" }}>M <i className="fa-solid fa-angle-down  "></i>  </td>
        <td style={{ width: "110px", textAlign: "center" }}>Unit Id  <div className="dropdown">
            <i className="fa-solid fa-angle-down "></i>
            <div className="dropdown-content">
                <a href="/">Link</a>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
            </div>
        </div></td>
        {/* <th scope="col mb-2-5">Time</th> */}
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td style={{ fontWeight: "bold", textAlign: "center" }}>Time</td>
    </tr>
    <tr>
        <td >Worker Completes Quality Check and Put the part in quality area</td>
        <td></td>
        <td >3:07:12 pm</td>
    </tr>
    <tr>
        <td>Machine Ended Process (red light)</td>
        <td></td>
        <td>3:45:00 pm</td>
    </tr>
    <tr>
        <td>Loss in production due to free time(After Handeling previous state and between new part production getting complete)</td>
        <td></td>
        <td>4:00:00 pm</td>
    </tr>
</tbody>
</table>
          </div>
        </Fragment>
    )
}

export default ProductivityLoss