import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';
import { axiosInstance, baseURL } from './AxiosConfig';

export function signUp(username, email, fullname, password) {
    //axios call
    const postData = {
        username,
        password,
        email,
        fullname,
        roleid: 2
    };
    return axios.post(
        `https://localhost:7053/Users/register`,
        postData,
    );
}

export function login(username, password) {
    const postData = {
        username,
        password
    };
    return axios.post(
        `https://localhost:7053/Users/Login`,
        postData,
    )

}

export function getUserDetails(accessToken) {
    return axios.get(
        `${baseURL}/Users/GetById`,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' // Có thể thay đổi tùy theo API yêu cầu
            }
        }
    )
}



export function formatError(errorResponse) {
    // console.log('errorResponse.message', errorResponse.message)
    switch (errorResponse.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
            swal("Oops", "Email not found", "error", { button: "Try Again!", });
            break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error", { button: "Try Again!", });
            break;
        case 'Username or password is incorrect':
            swal("", "Username or password is incorrect", "error", { button: "Try Again!", })
            break;
        case 'You are banned from the system.':
            swal("", "You are banned from the system.", "warning", { button: "Try Again!", })
            break;
        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    // tokenDetails.expireDate = new Date(
    //     new Date().getTime() + tokenDetails.expiresIn * 1000,
    localStorage.setItem('accessToken', tokenDetails)
}

export function userLocalStorage(userDetails) {
    // tokenDetails.expireDate = new Date(
    //     new Date().getTime() + tokenDetails.expiresIn * 1000,
    // );
    localStorage.setItem('userDetails', userDetails)
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        //dispatch(Logout(history));
        dispatch(Logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(Logout(navigate));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(Logout(navigate));
        return;
    }

    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}

export function isLogin() {
    const tokenDetailsString = localStorage.getItem('accessToken');
    if (tokenDetailsString) {
        return true;
    } else {
        return false;
    }
}
