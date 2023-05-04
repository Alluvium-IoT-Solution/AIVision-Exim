import { Fragment, React, useState } from 'react'
import styles from './SideBarStyle.module.css'
import DashboardPages from '../../DashboardConstants';
import Popup from '../../../../../Components/UIComponents/Popup/Popup';
import CNClogo from './images/CNC.png'
import menu from "./images/menu.png"
import close from "./images/close.png"
import profile from "./images/profile.png"


const SideBar = props => {
    const [showList, setListState] = useState(false);
    const currentActive = props.currentActive;
    const ExpandList = () => {
        Navigate(DashboardPages.Reports.IdealTimeReport)
        setListState((prevState) => {
            console.log(prevState);
            return prevState ? false : true
        });
    }

    const Navigate = (page) => {
        props.onClick(page);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {

        setIsOpen(!isOpen);
    };

    const [isOpen2, setIsOpen2] = useState(false);

    const toggleDropdown2 = () => {
      
        setIsOpen2(!isOpen2);
    };

    const [isOpen3, setIsOpen3] = useState(false);

    const toggleDropdown3 = () => {
      
        setIsOpen3(!isOpen3);
    };


    const [isOpen4, setIsOpen4] = useState(false);

    const toggleDropdown4 = () => {
      
        setIsOpen4(!isOpen4);
    };

    

    return (
        <Fragment>
            <div className={styles.TopMobileIcon}>
                {/* for sidebar and menu  */}
                {!props.topCollapse && <div className={styles.MenuIcon} onClick={props.menuIconClick}>
                    {props.menuCollapse ? (
                        <img style={{ height: "40px", width: "40px" }} src={menu} alt="Menu" />
                    ) : (
                        <img style={{ height: "40px", width: "40px" }} src={close} alt="close" />
                    )}
                </div>}
                {/* for profile and topbar topCollapse */}
                {props.menuCollapse && <div className={styles.MenuIcon} onClick={props.profileIconClick}>
                    {props.topCollapse ? (
                        <img style={{ height: "40px", width: "40px" }} src={close} alt="close" />
                    ) : (
                        <img style={{ height: "40px", width: "40px" }} src={profile} alt="profile" />
                    )}

                </div>}
            </div>
            <div className={`${props.menuCollapse ? "sidebar" : "side"}`}>
                <div className='ml-2 mt-3 pt-1 row'>

                    <img src={CNClogo} style={{marginLeft: "20px"}}alt={"logo"} width="150px" className={styles.logo} />
                    {/* <div className="dropdown3 ">
                        <i style={{ backgroundColor: "#ABA9AA", padding: "2px", marginLeft: "4px" }} className={"fa-solid fa-angle-down"} id={styles.LogoDrop}></i>

                    </div> */}
                </div>
                <div className='row mt-4 justify-content-left pr-2'>
                    <ul id={styles.sideMenuItems}>
                        <li onClick={() => Navigate(DashboardPages.SFPL_Importer)} className={currentActive === DashboardPages.SFPL_Importer && styles.pageselected} ><span><i className={"fa fa-thin fa-house-user"}></i> </span>Importer</li>
                        <li onClick={() => Navigate(DashboardPages.DashboardOverview)} className={currentActive === DashboardPages.DashboardOverview && styles.pageselected} ><span><i className={"fa fa-thin fa-house-user"}></i> </span>DEMO</li>
                        {/* <li><span onClick={ExpandList} ><i className="fa fa-thin fa-chart-column"></i> Reports <i className="fa-solid fa-angle-down"></i></span>
                            <ul className={showList ? styles.ReportsListShown : styles.ReportsListHidden}> 

                                {Object.keys(DashboardPages.Reports).map((data,index) => {
                                    return (<li key={index} onClick={() => Navigate(DashboardPages.Reports[data])} className={currentActive === DashboardPages.Reports[data] && styles.pageselected} >{DashboardPages.Reports[data]}</li>)
                                })}

                            </ul>
                        </li> */}
                        {/* {open && <Popup setOpen={setOpen} />} */}
                        
                        <li onClick={toggleDropdown}><span></span>Jobs</li>
                        {isOpen && (
                            <ul>
                                <li onClick={() => {Navigate(DashboardPages.FloorBoard);toggleDropdown2()} } className={currentActive === DashboardPages.FloorBoard && styles.pendingjob}><span></span>Pending Jobs</li>
                                {isOpen2 && (
                                    <ul>
                                        <li>0001</li>
                                        <li>0002</li>
                                        <li>0003</li>
                                        <li>0004</li>
                                        <li>0005</li>
                                    </ul>
                                )}
                                <li onClick={() => {Navigate(DashboardPages.Completed);toggleDropdown3()} } className={currentActive === DashboardPages.Completed && styles.completedjob}><span></span>Completed Jobs</li>
                                {isOpen3 && (
                                    <ul>
                                        <li>0006</li>
                                        <li>0007</li>
                                        <li>0008</li>
                                        <li>0009</li>
                                        <li>0010</li>
                                    </ul>
                                )}
                                <li onClick={() => {Navigate(DashboardPages.Alljobs); toggleDropdown4()}} className={currentActive === DashboardPages.Alljobs && styles.alljob}><span></span>All Jobs</li>
                                {isOpen4 && (
                                    <ul>
                                        <li className={styles.pendingjob}>0001</li>
                                        <li className={styles.pendingjob}>0002</li>
                                        <li className={styles.pendingjob}>0003</li>
                                        <li className={styles.completedjob}>0006</li>
                                        <li className={styles.completedjob}>0007</li>
                                        <li className={styles.completedjob}>0008</li> 
                                        <li className={styles.alljob}>0011</li>   
                                        <li className={styles.alljob}>0012</li> 
                                        <li className={styles.alljob}>0013</li> 
                                    </ul>
                                )}

                            </ul>
                        )}

                        <li onClick={() => Navigate(DashboardPages.MainReport) &&  props.setOpen(true)} className={currentActive === DashboardPages.MainReport && styles.mainreport}><span></span>Main Report</li>
                
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default SideBar;