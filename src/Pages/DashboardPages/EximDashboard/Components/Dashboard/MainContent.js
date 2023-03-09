import { React } from 'react'

import Cards from '../../../../../Components/UIComponents/Card/Cards'
import OverView from './OverView/OverView'
import IdealTimeCauses from './IdealTimeCauses/IdealTimeCauses';
import ProductivityLoss from './ProductivityLoss/ProductivityLoss';
import DelayThreshold from './DelayThreshold/DelayThreshold';
import Throughput from './Throughput/Throughput';
import ShareCapacity from './ShareCapacity/ShareCapacity';

//Data Section
export const data_pichart = [
    ["Task", "Hours per Day"],
    ["Missing parts", 30],
    ["Service", 30],
    ["Broken machine", 40]
];
export const data_machineUtilization = [
    [
        "Machine",
        "Utlilization",
        { role: "style" },
        {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
        },
    ],
    ["Machine 1", 5, "grey", 5],
    ["Machine 2", 4, "grey", 4],
    ["Machine 3", 5.30, "grey", 5.30],
    ["Machine 4", 4.30, "grey", 4.30],
    ["Machine 5", 6, "grey", 6]
];
export const data_machine1 = [
    ["h1", "Density", { role: "style" }],
    ["h2", 8.94, "black"], // RGB value
    ["h3", 10.49, "red"], // English color name
    ["h4", 19.3, "black"],
    ["h5", 21.45, "red"],
    ["h5", 10, "black"],
    ["h5", 15, "red"],
    ["h5", 16, "black"] // CSS-style declaration
];
export const data_linechart = [
    ["time", "Throughput"],
    ["1", 100],
    ["1:30", 200],
    ["2", 150],
    ["2:30", 300],
    ["3", 350],
    ["3:30", 200],
    ["4", 100],
];
export const data_sharecapicity = [
    ["m1", "capacity", { role: "style" }],
    ["m2", 8.94, "black"], // RGB value
    ["m3", 10.49, "black"], // English color name
    ["m4", 19.3, "black"],
    ["m5", 21.45, "black"],
    ["m6", 10, "black"],
    ["m7", 15, "black"],
    ["m8", 16, "black"] // CSS-style declaration
];
//Data Section Ends

const MainContent = () => {
    return (
        <div className="col">

            <div className='row pr-4'>

                <Cards className={'col-7 col-12 col-xs-12 col-md-12 col-lg-6 mb-1'}>
                    <OverView></OverView>
                </Cards>

                <Cards className={'col ml-0  col-md-12 col-lg-6'}>
                    <IdealTimeCauses data={data_pichart}></IdealTimeCauses>
                </Cards>

            </div>

            <div className='row mt-1 pr-4'>

                <Cards className={'col mb-1 col-xs-12 col-sm-12 col-lg-8 col-xl-4'}>
                    <ProductivityLoss data={data_machineUtilization}></ProductivityLoss>
                </Cards>

                <Cards className={'col ml-0 mb-1 col-xs-12 col-sm-12 col-lg-8 col-xl-4'}>
                    <DelayThreshold data={data_machine1} ></DelayThreshold>
                </Cards>

            </div>

            <div className='row mt-1 mb-2 pr-4'>

                <Cards className={'col col-md-12 col-lg-6 mb-1'}>
                    <Throughput data={data_linechart}></Throughput>
                </Cards>

                <Cards className={'col ml-0 col-md-12 col-lg-6'}>
                    <ShareCapacity data={data_sharecapicity}></ShareCapacity>
                </Cards>

            </div>
        </div>
    );
}

export default MainContent