import { Fragment, React } from 'react'

import styles from './ReportsStyle.module.css'
import DashboardPages from '../../DashboardConstants';

let title;
let time = "From 1st Sept 2022 to 30th Sept 2022";

let tableData = {};

const data_DeleyIntakingOutUnit = {
    Headers: ["Date",
        "Machine Id ",
        "Unit Id",
        "Threshold",
        "Time at which machine start the process[Color alert Green] HH:MM:SS",
        "Time at which machine ended the process[Color alert Red] HH:MM:SS",
        "Time at which machine restart the process after door is closed[Color alert Green] HH:MM:SS",
        "Loss in production due to deley in taking out the part HH:MM:SS",
        " Net loss in production due to deley in taking out the part HH:MM:SS",

    ],
    data: [
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
    ]
}
const data_IdleTimeDelayInTakingOutUnit = {
    Headers: ["Date",
        "Machine Id ",
        "Unit Id",
        "Threshold",
        "Time at which machine start the process[Color alert Green] HH:MM:SS",
        "Time at which machine ended the process[Color alert Red] HH:MM:SS",
        "Time at which machine restart the process after door is closed[Color alert Green] HH:MM:SS",
        "For How much time Worker is sitting idle HH:MM:SS",
        " Net loss in production due to Worker is sitting idle HH:MM:SS",

    ],
    data: [
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
        ["10 oct 2022", 10, 0, "00:00:20", "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:20", "00:00:10"],
    ]
}

const ProductivityLossInBetweenUnits_data = {
    Headers: ["Date",
        "Machine Id ",
        "Unit Id",

        "Time at which machine start the process[Color alert Green] HH:MM:SS",
        "Time at which machine ended the process[Color alert Red] HH:MM:SS",
        "Time at which machine restart the process after door is closed[Color alert Green] HH:MM:SS",
        "Loss in production due to free time after handling the part and between the new part production getting compelete part HH:MM:SS",


    ],
    data: [
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
        ["10 oct 2022", 10, 0, "03:06:40 AM", "03:20:20 PM", "02:20:20 PM", "00:00:10"],
    ]
}

const cctvs = {
    Headers: ["Machine Id",
        "Machine Category",
        "CCTV No.",
        "CCTv Manufacturer",
        "Floor",
        "Zone",
    ],
    data: [
        [1, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [2, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [3, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [4, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [5, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [6, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [7, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [8, "Injection Molding Machine", 0, "HKvision", 0, 0],
        [9, "Injection Molding Machine", 0, "HKvision", 0, 0],

    ]
}

const ItemWiseProduction_data = {
    Headers: ["Machine ",
        "Unit Id",
        "Unit Count",
        "Lifetime Unit count",
    ],
    data: [
        [1, 0, 0, 0],
        [2, 0, 0, 0],
        [3, 0, 0, 0],
        [4, 0, 0, 0],
        [5, 0, 0, 0],
        [6, 0, 0, 0],
        [7, 0, 0, 0],
        [8, 0, 0, 0],
        [9, 0, 0, 0],
        [10, 0, 0, 0],
        [11, 0, 0, 0],
        [12, 0, 0, 0],
    ]
}

const MachineDetails_data = {
    Headers: ["S.No",
        "Machine Name",
        "Machine Installation Date",
        "Machine Manufacturer",
    ],
    data: [
        [1, "Machine 1", "1 oct 2022", "xyz"],
        [2, "Machine 2", "1 oct 2022", "xyz"],
        [3, "Machine 3", "1 oct 2022", "xyz"],
        [4, "Machine 4", "1 oct 2022", "xyz"],
        [5, "Machine 5", "1 oct 2022", "xyz"],
        [6, "Machine 6", "1 oct 2022", "xyz"],
        [7, "Machine 7", "1 oct 2022", "xyz"],
        [8, "Machine 8", "1 oct 2022", "xyz"],
        [9, "Machine 9", "1 oct 2022", "xyz"],

    ]
}

const MachineWise_ThroughPut = {
    Headers: [
        "Machine Id",
        "Check level of Coolant",
        "Hydralic Check",
        "Any Leakage or Strange Sound",
        "Lubrication",
        "Turrent Parallelism Inclination checked",
        "Any Other Reason",
        "Total Hours",
        "Ideal Time in Percentage",
    ],
    data: [
        ["Machine 1", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 2", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 3", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 4", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 5", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 6", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 7", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 8", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 9", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 10", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 11", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
        ["Machine 12", 0, 0, 0, 0, 0, 0, "1 Hour", "20%"],
    ]
}

const MachineWiseUtilization_data = {
    Headers: [
        "Machine Id",
        "Unit Id",
        "Start Time",
        "End Time",
        "Unit Count ",
        "Machine Lifetime Count",
    ],
    data: [
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],
        [1, 0, " 1 AM", "2 PM", 0, 0],

    ]
}



const SetData = (props) => {
    console.log(props.tableRequest)
    title = props.tableRequest;
    switch (props.tableRequest) {
        case DashboardPages.Reports.CCTVS:
            tableData = cctvs;
            break;
        case DashboardPages.Reports.DelayInTakingOutUnit:
            tableData = data_DeleyIntakingOutUnit;
            break;
        case DashboardPages.Reports.IdleTimeDelayInTakingOutUnit:
            tableData = data_IdleTimeDelayInTakingOutUnit;
            break;
        case DashboardPages.Reports.ItemWiseProduction:
            tableData = ItemWiseProduction_data;
            break;
        case DashboardPages.Reports.MachineDetails:
            tableData = MachineDetails_data;
            break;
        case DashboardPages.Reports.MachineIdealTimeReport:
            tableData = MachineWise_ThroughPut
            break;
        case DashboardPages.Reports.MachineWiseThroughPut:
            tableData = MachineWiseUtilization_data;
            break;
        case DashboardPages.Reports.ProductivityLossInBetweenUnits:
            tableData = ProductivityLossInBetweenUnits_data;
            break;
        default:
            tableData = MachineWiseUtilization_data;
    }
}

const Reports = props => {

    SetData(props);

    return (
        <Fragment>
            <div className='d-flex justify-content-end'>
                <span><i className="fa-solid fa-clock mx-2"></i>Schedule Report</span>
                <span> <i className="fa-solid fa-share-nodes mx-2"></i></span>
                <span style={{ backgroundColor: "#B0B0B0", margin: "0px 10px" }}><i className="fa-solid fa-print mx-2"></i>
                    <i className="fa-sharp fa-solid fa-caret-down mx-2"></i></span>
                <span style={{ backgroundColor: "#B0B0B0", marginRight: "10px", padding: "0px 5px" }} >Export As <i className="fa-sharp fa-solid fa-caret-down mx-2"></i></span>
            </div>
            <hr />
            <div className='row'>
                <div className={styles.ReportsTitle + " col"}>
                    <h5>{"SAMAN ENGINEERS AND TECHNOLOGIES"}</h5>
                    <h5><strong>{title}</strong></h5>
                    <h6>{time}</h6>
                </div>
            </div>
            <div className={'row mt-2 ' + styles.reportsTable} align="center" >
                <div className='col pr-4 table-responsive  h-50'>
                <table className={'table table-bordered text-center '+styles.Table }style={{}}  >
                        <thead className={styles.tHead} >

                            <tr className={styles.tR}>
                                {tableData.Headers.map((name) => <th key={i}>{name}</th>)}
                            </tr>
                        </thead>
                        <tbody className={styles.tBody}>
                            {tableData.data.map((data) => {
                                return (
                                    <tr className={styles.tR}>
                                        {data.map((value) =>
                                            <td style={{}}>{value}</td>
                                        )}
                                    </tr>
                                )
                            }
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </Fragment>
    );
}

export default Reports