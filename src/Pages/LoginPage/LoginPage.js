import { React } from 'react'

import LoginForm from './Components/LoginFormComponent/LoginForm'
import styles from './LoginPageStyle.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import logoImage from './Images/logo.png'
import lockimage from './Images/Lock.png'
import surajLogo from "./Images/surajLogo.png"
const LoginPage = () => {
    return (
        <div className={"container-fluid"} id={styles.loginContainer}>
            <div className={"row " + styles.verticalCenter}>
                <LeftPage></LeftPage>
                <RightPage></RightPage>
            </div>
        </div >
    )
}

const LeftPage = () => {
    return (<div className={"col-md-6 " + styles.verticalCenter + " " + styles.leftchild} >
        <div className={'row justify-content-center ' + styles.logo} >
            <div className='col-12'>
                {/* <img src={logoImage} alt='Logo' /> */}

                <Carousel autoFocus={true} showThumbs={false} infiniteLoop={true} useKeyboardArrows width={"300px"} transitionTime={2000} autoPlay={true} interval={3000} emulateTouch={true} className="row justify-content-center">
                <div>
                    <img src={logoImage} width="200px" />
             
                </div>
                <div>
                    <img src={surajLogo}  width="200px"/>

                </div>
                
            </Carousel>
                
            </div>
            {/* <div className='col-12 mt-2'>
                <strong><span className={styles.redtext}>"</span>Building world's best computer vision products<span className={styles.redtext}>"</span></strong>
            </div> */}
        </div>
    </div>);
}

const RightPage = () => {
    return (
        <div className={"col-md-6 " + styles.verticalCenter + " " + styles.rightchild} >
            <div align="center" className={styles.loginForm}>
                <div className={'col-12 mb-3'}>
                    {/* <img src={lockimage} width="100px" alt='lockimage' /> */}
                </div>
                <LoginForm></LoginForm>
            </div>
            <div className={styles.footer} >
                <span>Version</span>
                <span>Support</span>
                <span>Privacy Policy</span>
                <span>T & C</span>
            </div>
        </div>
    )
}

export default LoginPage