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

                    <img src={CNClogo} alt={"logo"} width="150px" className={styles.logo} />
                    <div className="dropdown3 ">
                        <i style={{ backgroundColor: "#ABA9AA", padding: "2px", marginLeft: "4px" }} className={"fa-solid fa-angle-down"} id={styles.LogoDrop}></i>

                    </div>
                </div>
                <div className='row mt-4 justify-content-left pr-2'>
                    <ul id={styles.sideMenuItems}>
                        <li onClick={() => Navigate(DashboardPages.DashboardOverview)} className={currentActive === DashboardPages.DashboardOverview && styles.pageselected} ><span><i className={"fa fa-thin fa-house-user"}></i> </span>Importer</li>
                        {/* <li><span onClick={ExpandList} ><i className="fa fa-thin fa-chart-column"></i> Reports <i className="fa-solid fa-angle-down"></i></span>
                            <ul className={showList ? styles.ReportsListShown : styles.ReportsListHidden}> 

                                {Object.keys(DashboardPages.Reports).map((data,index) => {
                                    return (<li key={index} onClick={() => Navigate(DashboardPages.Reports[data])} className={currentActive === DashboardPages.Reports[data] && styles.pageselected} >{DashboardPages.Reports[data]}</li>)
                                })}

                            </ul>
                        </li> */}
                        {/* {open && <Popup setOpen={setOpen} />} */}
                        {/* <li onClick={() => Navigate(DashboardPages.FloorBoard) &&  props.setOpen(true) } className={currentActive === DashboardPages.FloorBoard && styles.pageselected}><span><i  className="fa-solid fa-border-none"></i> </span>Importer</li> */}
                       

                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default SideBar;