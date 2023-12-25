import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import "./change-password.css"
import { axiosInstance } from "../../../services/AxiosConfig"
import { getUserDetails, isLogin } from "../../../services/AuthService"
import { ToastContainer, toast } from "react-toastify";


const ChangePassword = () => {
    const [messageError, setMessageError] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')
    // get user details
    const [userDetails, setUserDetails] = useState('')
    useEffect(() => {
        const getUserDetailsData = async () => {
            try {
                let respone = await getUserDetails();
                setUserDetails(respone.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (isLogin()) {
            getUserDetailsData()
        }
    }, [])
    // console.log(userDetails)
    // api change password
    const changePassword = (currentPass, newPass) => {
        const data = {
            userName: userDetails.username,
            currentPassword: currentPass,
            newPassword: newPass
        }
        return axiosInstance.post(`/Users/ChangePassword`, data)
    }
    //check input 
    const checkInput = (input) => {
        let message = ''
        if (input.currentPassword?.trim() === '') {
            message = { ...message, errorCurrentPassword: "Please enter current password!" }
        }
        if (input.newPassword?.trim() === '') {
            message = { ...message, errorNewPassword: "Please enter new password!" }
        } else {
            if (input.newPasswordAgain?.trim() === '') {
                message = { ...message, errorNewPasswordAgain: "Please enter new password again!" }
            } else {
                if (input.newPasswordAgain.trim() !== input.newPassword.trim()) {
                    message = { ...message, errorNewPasswordAgain: "Please re-enter the correct new password!" }
                }
            }
        }
        return message
    }
    //toast 
    const notifyChangeSusscess = () => {
        toast.success("✔️ Change success !", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    //handle click change password
    const handleClickChange = () => {
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            newPasswordAgain: newPasswordAgain
        }
        let message = checkInput(data)
        if (message === '') {
            changePassword(currentPassword, newPassword)
                .then(response => {
                    console.log("success")
                    notifyChangeSusscess()
                    setCurrentPassword('')
                    setNewPassword('')
                    setNewPasswordAgain('')
                    setMessageError('')
                })
                .catch(error => {
                    setMessageError('')
                    console.log(error.response.data.message)
                    setMessageError({ errorMessageApi: error.response.data.message })
                })
        } else {

            console.log('co loi')
            console.log(message)
            setMessageError(message)
        }
    }
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-xl-6">
                <Card>
                    <Card.Header><h5>Change password</h5></Card.Header>
                    <Card.Body>
                        <div className="row">
                            {/* <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label  className="text-black font-w600">Username:</label>
                                    <input type="text" className="form-control" placeholder="Username" />
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Current password:</label>
                                    <input type="password" className="form-control" placeholder="Enter current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                                    {messageError.errorCurrentPassword && <p className="message-error">{messageError.errorCurrentPassword}</p>}
                                </div>

                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">New password:</label>
                                    <input type="password" className="form-control" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                    {messageError.errorNewPassword && <p className="message-error">{messageError.errorNewPassword}</p>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">New password again:</label>
                                    <input type="password" className="form-control" placeholder="Enter new password again" value={newPasswordAgain} onChange={e => setNewPasswordAgain(e.target.value)} />
                                    {messageError.errorNewPasswordAgain && <p className="message-error">{messageError.errorNewPasswordAgain}</p>}
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                    {messageError.errorMessageApi && <p className="message-error d-flex justify-content-center">{messageError.errorMessageApi}</p>}
                    <Card.Footer className="d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={() => handleClickChange()}>Change</button>
                    </Card.Footer>
                </Card>
            </div>
            <ToastContainer />
        </div>

    )
}

export default ChangePassword