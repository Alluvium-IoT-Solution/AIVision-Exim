import { Fragment, React, useState } from 'react'


import Modal from "../../../Components/UIComponents/Modal/Modal"
import Popup from '../../../Components/UIComponents/Popup/Popup';
import SideBar from './Components/SideBar/SideBar';
import TopBar from './Components/TopBar/TopBar';
import Reports from './Components/Reports/Reports';
import Importer from './Components/Importer/Importer';
import MainContent from './Components/Dashboard/MainContent'
import styles from './DashboardStyle.module.css'
import DashboardPages from './DashboardConstants';
import PendingJobs from './Components/PendingJobs/PendingJobs';
import Completed from './Components/Completed/Completed';
import MainReport from './Components/MainReport/MainReport';
import SFPL_Importer from './Components/SFPL_Importer/SFPL_Importer';

const CNCDashboardPage = () => {

    const [currentDashboardPage, setDashboardState] = useState(DashboardPages.DashboardOverview);
    const [open, setOpen] = useState(false)
    const ChangeDashboardState = (state) => {
        setDashboardState(state)
    }
    const [menuCollapse, setMenuCollapse] = useState(true)
    const [topCollapse, seTopCollapse] = useState(false)
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    const profileIconClick = () => {
        //condition checking to change state from true to false and vice versa
        topCollapse ? seTopCollapse(false) : seTopCollapse(true);

    };
    return (

        <Fragment>
            <Modal></Modal>
            <div className={styles.maindashboardbody}>
                <div className='row'>

                    <div className='col-12 col-xs-2 col-md-2   border-right-5' id={styles.sidemenu}>
                        <SideBar setOpen={setOpen} currentActive={currentDashboardPage} onClick={ChangeDashboardState} menuCollapse={menuCollapse} menuIconClick={menuIconClick} profileIconClick={profileIconClick} topCollapse={topCollapse} ></SideBar>
                        {currentDashboardPage === DashboardPages.DashboardOverview && currentDashboardPage !== DashboardPages.FloorBoard && 
                            <span className={styles.bar}>
                                <h5 style={{ color: "#414143", fontWeight: "bold" }}>Causes</h5>
                                <h5 style={{ color: "#BF3938", fontWeight: "bold" }}>Effect</h5>
                                <h5 style={{ color: "#414143", fontWeight: "bold" }}>Result</h5>
                            </span>}
                          
                    </div>

                    <div className='col-12 col-sm-12 col-md-10 '>
                        <div className={`row pt-1 pl-4  ${topCollapse ? " topClose" : "topOpen"}`}>
                            <TopBar topCollapse={topCollapse} profileIconClick={profileIconClick} open={open} setOpen={setOpen}></TopBar>
                           
                        </div>

                        <hr />

                        <div className='row mt-2 pl-2'>
                            <div className={"col " + styles.MainContentContainer}>
                            {open && <Popup setOpen={setOpen} />}
                                {currentDashboardPage === DashboardPages.DashboardOverview && < MainContent ></MainContent>}
                                {currentDashboardPage !== DashboardPages.DashboardOverview && currentDashboardPage !== DashboardPages.FloorBoard &&  currentDashboardPage !== DashboardPages.Completed &&  currentDashboardPage !== DashboardPages.Alljobs && currentDashboardPage !== DashboardPages.MainReport && currentDashboardPage !== DashboardPages.SFPL_Importer &&<Reports tableRequest={currentDashboardPage}></Reports>}
                                {currentDashboardPage === DashboardPages.FloorBoard && <PendingJobs open={open} setOpen={setOpen}></PendingJobs>}
                                {currentDashboardPage === DashboardPages.Completed && <Completed open={open} setOpen={setOpen}></Completed>}
                                {currentDashboardPage === DashboardPages.Alljobs && <Completed open={open} setOpen={setOpen}></Completed>}
                                {currentDashboardPage === DashboardPages.MainReport && <MainReport open={open} setOpen={setOpen}></MainReport>}
                                {currentDashboardPage === DashboardPages.SFPL_Importer && <SFPL_Importer open={open} setOpen={setOpen}></SFPL_Importer>}

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Fragment>

    )
}

export default CNCDashboardPage