import React, { useEffect, useState } from "react";
import {
    Dropdown,
    Button,
    Modal,
} from "react-bootstrap";
// import "./check-otp.css";
// File CSS để thiết kế giao diện

const CheckOtp = (props) => {
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(5);
    const {show,changeShow,sendOtp,handleSubmit} = props.handleOtpComponent
    // const [messageOtp,setMessageOtp]=useState(message)
    // console.log(messageOtp)
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds, minutes]);

    const handleResend = () => {
        setOtp("");
        sendOtp()
        setMinutes(0);
        setSeconds(2);
    };

    return (
        <Modal className="modal fade" show={props.handleOtpComponent.show} centered on>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Verify OTP</h5>
                    <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { changeShow() }}>

                    </Button>
                </div>

                <div className="modal-body">
                    <form className="comment-form" onSubmit={(e) => { e.preventDefault() }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    {/* <label htmlFor="author" className="text-black font-w600">  Username  </label> */}
                                    <input onChange={(e) => {setOtp(e.target.value)}} type="text" className="form-control" defaultValue={otp} name="otp" placeholder="Input otp send to your email" />
                                    {props.handleOtpComponent.message && <p style={{ color: 'red' }}>{props.handleOtpComponent.message}</p>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <div className="countdown-text">
                                        {/* {seconds > 0 || minutes > 0 ? (
                                            <p>
                                                Time remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                                {seconds < 10 ? `0${seconds}` : seconds}
                                            </p> */}
                                        {/* // ) : ( */}
                                            <>
                                                <p>Didn't receive the OTP?</p>
                                                <Button
                                                    variant="outline-primary btn-xs"
                                                    disabled={seconds > 0 || minutes > 0}
                                                    onClick={handleResend}
                                                >
                                                    Resend OTP
                                                </Button>
                                            </>
                                        {/* // )} */}

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                <input type="submit" value="Submit" className="submit btn btn-primary btn-block" name="submit" onClick={() => {handleSubmit(otp);console.log(otp);}} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </Modal>

    );
}

export default CheckOtp;