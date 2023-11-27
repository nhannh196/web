import React from 'react';
//import { useNavigate } from "react-router-dom";


import {
    formatError,
    login,
    getUserDetails,
    runLogoutTimer,
    saveTokenInLocalStorage,
    userLocalStorage,
    signUp,

} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';



export function signupAction(username, email, fullname, password, navigate) {

    return (dispatch) => {
        signUp(username, email, fullname, password)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                // runLogoutTimer(
                //     dispatch,
                //     response.data.expiresIn * 1000,
                //     //history,
                // );
                dispatch(confirmedSignupAction(response.data));
                navigate('/login');
                //history.push('/dashboard');
            })
            .catch((error) => {
                console.log(error.response.data);
                const errorMessage = formatError(error.response.data);
                dispatch(signupFailedAction(errorMessage));
            });
    };
}

export function Logout(navigate) {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('accessToken');
    navigate('/login');
    //history.push('/login');

    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                //userDetails   
                saveTokenInLocalStorage(response.data.token);
                const accessToken = response.data.token;
                getUserDetails(accessToken)
                    .then((user) => {
                        //   userLocalStorage(user.data)
                        localStorage.setItem('userDetails', JSON.stringify(user.data))
                        // console.log(user.data)
                        navigate('/home');
                        window.location.reload();
                    })
            })
            .catch((error) => {
                console.log(error);
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });

        //   console.log(loc)
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
