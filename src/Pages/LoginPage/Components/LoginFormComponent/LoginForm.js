import React, { useState, useRef, useContext } from 'react'
import styles from './LoginFormStyle.module.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../Context/auth-context'
import PagesPath from "../../../../Constants/PagesPath"

import eyeopen from './Images/eyeopen.png'
import eyeclose from './Images/eyeclose.png'


const LoginForm = () => {

    const ctx = useContext(AuthContext);
    const _passwordInputRef = useRef()
    const _navigate = useNavigate();

    const [_isPasswordInvalid, setIsPasswordInvalid] = useState(false)
    const [_InvalidPasswordMessage, setPasswordInvalidMessage] = useState("Password Cannot be empty")
    const [_isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [showPassword, setPasswordState] = useState(false);

    const passwordInputInvalid = _isPasswordTouched && _isPasswordInvalid;


    const passwordStateHandler = () => {
        setPasswordState((prevState) => {
            return prevState ? false : true
        })
    }

    const onPasswordBlur = (e) => {

        setIsPasswordTouched(true);

        _passwordInputRef.current.value
            ? setIsPasswordInvalid(false)
            : setIsPasswordInvalid(true)

        setPasswordInvalidMessage("Password Cannot be empty !");
    }

    const OnFormSubmit = (event) => {
        event.preventDefault();

        setIsPasswordTouched(true);

        if (!_passwordInputRef.current.value) {
            setIsPasswordInvalid(true)
            setPasswordInvalidMessage("Password Cannot be empty !");
            return;
        }

        TryLoginUser(_passwordInputRef.current.value);
    }

    const TryLoginUser = (password) => {
        console.log(password)
        if (password !== "CNCUSER" && password !== "TEXUSER" && password !== "STAMPUSER") {
            setIsPasswordInvalid(true)
            setPasswordInvalidMessage("Password is incorrect !");
            return;
        }

        const data = { token: "token", UserType: password }
        ctx.login(data);
        _navigate(PagesPath.DashboardPage, { replace: true })
    }

    return (
        <div className={styles.loginFormContainer}>
            <form onSubmit={OnFormSubmit}>

                {/* <div className={styles.inputPassword + " " + styles.ElementSize}>
    <input type="text"placeholder="Email"></input>
</div>
<br></br> */}
                <div>
                    <h3>User Login</h3>
                </div>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" />
                </div>
                <div className={"col-12 " + styles.inputPassword + " " + styles.ElementSize + " " + (passwordInputInvalid && styles.passwordError)}>
                    <label htmlFor="">Password</label>
                    <input type={showPassword ? "text" : "password"} onBlur={onPasswordBlur} placeholder="Password" ref={_passwordInputRef}></input>
                    <img src={showPassword ? eyeopen : eyeclose} onClick={passwordStateHandler} width="20px" alt="eyeicon"></img>
                </div>

                {passwordInputInvalid && <div className={styles.errorShown}><span>{_InvalidPasswordMessage}</span></div>}

                <div className={"mt-2 " + styles.rememberMeSection}>
                    <label>
                        <input type="checkbox" className={styles.styledCheckbox} />
                        <span style={{ marginRight: '10px'}}> Remember me?</span>
                    </label>
                    <a href='/' class="Remember-space" style={{ color: 'black'}}>Forgot password</a>
                </div>
                <div className={"mt-2 " + styles.rememberMeSection}>
                    <label>
                        <input type="checkbox" className={styles.styledCheckbox} />
                        <span>2F Authenticator</span>
                    </label>
                </div>
                <br />
                <button type='submit' className={'mt-4 ' + styles.ElementSize + " " + styles.button}>LOGIN</button>
            </form >
        </div>
    );
}

export default LoginForm