import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import PagesPath from '../Constants/PagesPath';
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userType: '',
    login: (data) => { },
    logout: () => { }
})

// const calculateRemainingTime = (expirationTime) => {
//     const currentTime = new Date().getTime()
//     const adjExpirationTime = new Date(expirationTime).getTime()
//     const remainingTime = adjExpirationTime - currentTime;

//     return remainingTime;
// }

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const intialUserType = localStorage.getItem('usertype');
    const [token, setToken] = useState(initialToken)
    const [_UserType, setUserType] = useState(intialUserType)
    const userIsLoggedIn = !!token;



    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        Navigate(PagesPath.HomePage)
    }

    const loginHandler = (data) => {
        setToken(data.token)
        setUserType(data.UserType)

        localStorage.setItem("usertype", data.UserType)
        localStorage.setItem('token', data.token) //this is an api provided by javascript/browser
        //const remainingTime = calculateRemainingTime(expirationTime);
        //setTimeout(logoutHandler, remainingTime);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        userType: _UserType,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export const UserTypes = {
    CNCUSER: "CNCUSER",
    TEXUSER: "TEXUSER",
    STAMPUSER: "STAMPUSER"
}

export default AuthContext;