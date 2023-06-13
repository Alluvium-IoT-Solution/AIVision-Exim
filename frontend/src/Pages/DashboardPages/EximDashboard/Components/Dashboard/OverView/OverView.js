import React, { Fragment } from "react";

import styles from './OverViewStyles.module.css'

const OverView = props => {
    return (
        <Fragment>
            <h5><strong>Hello Pradeep</strong></h5>
            <p>Welcome back to ALvision CNC !</p>

            <div className='row' style={{ margin: "1px" }}>

                <div className={"col-auto p-2 " + styles.innerBlock} align="center">
                    <span className={styles.innerBlockValues}><i className="fa-solid fa-gears"></i>
                        <span className='ml-4'>
                            <strong>10</strong>
                        </span>
                    </span><br />
                    <span>Machine count</span>
                </div>

                <div className={"col-auto p-2 ml-2 " + styles.innerBlock} align="center">
                    <span className={styles.innerBlockValues}><i className="fa-solid fa-user-gear"></i>
                        <span className='ml-4'>
                            <strong>10</strong>
                        </span>
                    </span><br />
                    <span>Worker count</span>
                </div>

                <div className={"col-auto p-2 ml-2 " + styles.innerBlock} align="center">
                    <span className={styles.innerBlockValues}><i className="fa-solid fa-video"></i>
                        <span className='ml-4'>
                            <strong>10</strong>
                        </span>
                    </span><br />
                    <span>Camera count</span>
                </div>

                <div className={"col-auto p-2 ml-2 " + styles.innerBlock} align="center">
                    <span className={styles.innerBlockValues}><i className="fa-solid fa-chart-line"></i>
                        <span className='ml-4'>
                            <strong>10</strong>
                        </span>
                    </span><br />
                    <span>Production count</span>
                    <span style={{position:"absolute",top:"0px",right:"0px",fontSize:"12px",fontWeight:"bold"}}>&#8593;34%</span>
                </div>

            </div>
        </Fragment>
    )
}

export default OverView