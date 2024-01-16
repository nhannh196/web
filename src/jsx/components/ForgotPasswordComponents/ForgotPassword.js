import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
// import "./change-password.css"
// import { axiosInstance } from "../../../services/AxiosConfig"
// import { getUserDetails, isLogin } from "../../../services/AuthService"
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../../../services/AxiosConfig";
import axios from "axios";
import "./forgot-password.css"
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { isInvalidPassword } from "../../../services/ValidateInput";
const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [messageResend, setMessageResend] = useState('')
    const [steps, setSteps] = useState(['check-username'])
    const [username, setUsername] = useState('')
    const [otpSystem, setOtpSystem] = useState('')
    const [otpInput, setOtpInput] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')
    const navigate = useNavigate();
    //check username
    const checkUsername = (input) => {
        let message = ''
        if (input?.trim() === '') {
            message = "Please enter your username"
        }
        return message
    }
    //check new password
    const checkPassword = (newPass, newPassAgain) => {
        let message = ''
        isInvalidPassword(newPass)
        if (isInvalidPassword(newPass)) {
            message = { ...message, newPasswordError: isInvalidPassword(newPass) }
        } else {
            if (newPassAgain?.trim() === '') {
                message = { ...message, newPasswordAgainError: "Please enter new password again" }
            } else {
                if (newPassAgain !== newPass) {
                    message = { ...message, newPasswordAgainError: "Please re-enter the correct new password" }
                }
            }
        }
        return message
    }
    //api send otp
    const apiSendOtpForgotPass = (username) => {
        return axios.post(`${baseURL}/api/Email/SendOtpForgotPass?username=${username}`)
    }
    //resend otp
    const resendOtpClicks = () => {
        setMessageResend("...Sending, please wait!")
        apiSendOtpForgotPass(username)
            .then((result) => {
                setOtpSystem(result.data)
                setMessageResend("We resend otp to your email, please check your email")
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            });
    }
    //api forgot password
    const apiForgotPassword = () => {
        const data = {
            userName: username,
            newPassword: newPassword
        }
        return axios.post(`${baseURL}/Users/ForgotPassword?otp=${otpInput}`, data)
    }

    const handleNextClick = () => {
        switch (steps[steps.length - 1]) {
            case 'check-username':
                let checkUser = checkUsername(username)
                if (!!checkUser) {
                    // console.log(checkUser)
                    setMessageError({ usernameError: checkUser })
                } else {
                    setLoading(true)
                    apiSendOtpForgotPass(username)
                        .then((response) => {
                            setSteps([...steps, 'check-otp'])
                            setOtpSystem(response.data)
                            setLoading(false)
                        }).catch((err) => {
                            setMessageError({ usernameError: err.response.data.message })
                        });
                }
                break;
            case 'check-otp':
                if (otpSystem === otpInput) {
                    setSteps([...steps, "change-password"])
                } else {
                    console.log("otp ko dung")
                    setMessageError({ otpError: "Otp is incorrect" })
                }
                break;
            case 'change-password':
                let checkPass = checkPassword(newPassword, newPasswordAgain)
                console.log(checkPass)
                if (checkPass === "") {
                    console.log('password ko loi')
                    apiForgotPassword()
                        .then((response) => {
                            swal({
                                title: response.data.message,
                                text:
                                    "Do you want to Login ?",
                                icon: "success",

                                buttons:
                                {
                                    Login: {
                                        text: 'Login',
                                        value: true // Giá trị tương ứng với nút này
                                    },
                                    Cancel: {
                                        text: 'No',
                                        value: false // Giá trị tương ứng với nút này
                                    },
                                }
                            }).then((res) => {
                                if (res) {
                                    navigate('/login')
                                } else {
                                    setMessageError('')
                                    setUsername('')
                                    setOtpSystem('')
                                    setOtpInput('')
                                    setNewPassword('')
                                    setNewPasswordAgain('')
                                    setSteps(['check-username'])
                                }
                            })
                        }).catch((err) => {
                            console.log(err)
                        });
                } else {
                    console.log("password dang co loi")
                    setMessageError(checkPass)
                }
                break;
            default:
                break;
        }
    }

    //handle back click
    const handleBackClick = () => {
        let backSteps = steps
        backSteps.pop();
        setSteps(backSteps)
        setOtpSystem('')
        setOtpInput('')
        setMessageError('')
        setMessageResend('')
        console.log(backSteps)
    }

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-xl-6">
                <Card>
                    <Card.Header><h5>Forgot password</h5></Card.Header>
                    <Card.Body className="body-forgot-pass">
                        
                            {loading ?
                                <div class="spinner-border-forgot spinner-border" role="status"
                                >
                                    <span class="sr-only">Loading...</span>
                                </div> :
                                <>
                                    {steps[steps.length - 1] === "check-username" &&
                                        <div>
                                            <div className="form-group mb-3">
                                                <label className="text-black font-w600">Username:</label>
                                                <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                                                {messageError?.usernameError && <p className="message-error">{messageError.usernameError}</p>}

                                            </div>
                                            <div className="form-group mb-3">
                                                <p>Please enter your username, and we will send an OTP to the email associated with your username.</p>
                                            </div>
                                        </div>
                                    }

                                    {steps[steps.length - 1] === "check-otp" &&
                                        <div>
                                            <div className="form-group mb-3">
                                                <input value={otpInput} onChange={(e) => { setOtpInput(e.target.value) }} type="text" className="form-control" name="otp" placeholder="Input otp send to your email" />
                                                {messageError?.otpError && <p className="message-error">{messageError?.otpError}</p>}
                                            </div>
                                            <div className="form-group mb-3">
                                                <div className="countdown-text">
                                                    <>
                                                        <p className="message-resend">Didn't receive the OTP?</p>
                                                        <button className="btn btn-primary"
                                                            variant="outline-primary btn-xs"
                                                            onClick={() => { resendOtpClicks() }}
                                                        >
                                                            Resend OTP <i class="bi bi-arrow-clockwise"></i>
                                                        </button>
                                                    </>
                                                </div>
                                                {messageResend && <p className="message-resend">{messageResend}</p>}
                                            </div>
                                        </div>
                                    }

                                    {steps[steps.length - 1] === "change-password" &&
                                        <div>
                                            <div className="form-group mb-3">
                                                <label className="text-black font-w600">New password:</label>
                                                <input type="password" className="form-control" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                                {messageError.newPasswordError && <p className="message-error">{messageError.newPasswordError}</p>}
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="text-black font-w600">New password again:</label>
                                                <input type="password" className="form-control" placeholder="Enter new password again" value={newPasswordAgain} onChange={e => setNewPasswordAgain(e.target.value)} />
                                                {messageError.newPasswordAgainError && <p className="message-error">{messageError.newPasswordAgainError}</p>}
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                       
                    </Card.Body>
                    {messageError.errorMessageApi && <p className="message-error d-flex justify-content-center">{messageError.errorMessageApi}</p>}

                    {steps.length === 3 ?
                        <Card.Footer className="d-flex justify-content-center">

                            <button className="btn btn-primary" onClick={() => { handleNextClick() }}>Change <i class="bi bi-arrow-repeat"></i></button>

                        </Card.Footer>
                        :
                        <Card.Footer className="d-flex justify-content-between">
                            {steps.length === 2 ?
                                <button className="btn btn-primary" onClick={() => handleBackClick()}><i class="bi bi-arrow-left"></i> Back</button>
                                :
                                <div></div>}
                            <button className="btn btn-primary" onClick={() => { handleNextClick() }}>Next <i class="bi bi-arrow-right"></i></button>
                        </Card.Footer>
                    }

                </Card>
            </div>
            <ToastContainer />
        </div>
    )
}
export default ForgotPassword