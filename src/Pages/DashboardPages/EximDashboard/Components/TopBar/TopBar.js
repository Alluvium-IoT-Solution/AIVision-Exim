import { Fragment, React, useContext } from 'react'

import profilepic from './Images/profile.jpg'

import styles from './TopBarStyle.module.css'
import AuthContext from '../../../../../Context/auth-context'

const TopBar = ({setOpen}) => {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      <div className={" mt-1  " }>
      <button className='btn btn-dark' onClick={() =>  setOpen(true) && <Popup setOpen={setOpen}></Popup>}>Job No</button>
      </div>

      <div className="col-md-1 col-lg-3 col-xl-6 "></div>


      <div className={" mt-1 " + styles.topbaricons}>
        <i className="fa fa-solid fa-bell ">
          <span className={"position-relative  translate-middle badge rounded-pill bg-danger " +
            styles.notification}>2
          </span>
        </i>
        <i className="fa fa-solid fa-envelope ml-3"></i>
        <i className="fa fa-solid fa-gear ml-3 mr-3"></i>
      </div>

      <div className={"col-4  col-xs-4 col-md-2 col-lg-1  p-1  mt-1 mb-2  " + styles.filters}>
        <span>Filter </span>
        <i className="fa-solid fa-filter ml-1 "></i>
      </div>

      <div className={" col-10 col-md-1 " + styles.profile} style={{ border: "0.5px solid black" }}>
        <h5 className={styles.title}>SHAHI </h5>
        <img className={styles.profileimage} width="25px" height="25px" alt="profilepic" src={profilepic} />
      </div>
      <div className="dropdown ">
        <i id={styles.topDrop} style={{ width: "15px", height: "15px" }} className="fa-solid fa-angle-down "></i>
        <div id={styles.topDropItem} className={"dropdown-content mt-2 "}>
          <a className={'pl-3 pr-3 pt-1 '} onClick={ctx.logout}>
            Logout
          </a>
          <a href="">Link</a>
        </div>
      </div>
    </Fragment>
  )
}

export default TopBar