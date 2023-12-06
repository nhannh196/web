import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./myswal.css";
import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOtp from "../CheckOtpComponents/CheckOtp";
import axios from "axios";
import { Button } from "react-bootstrap";
// image
// import logo from "../../images/logo-full.png";
const messageDeafault = {};
function Register(props) {
  const [listUsers, setListUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [message, setMessage] = useState({});
  const [messageOtp, setMessageOtp] = useState([]);
  const [otpSystem, setOtpSystem] = useState("");
  // const [otpInput,setOtpInput] = useState('');
  const navigate = useNavigate();
  console.log("load lai tu dau");
  useEffect(() => {
    getListUser();
  }, []);

  const getListUser = () => {
    return axios
      .get("https://6618-1-53-195-148.ngrok-free.app/api/UsersAdmin")
      .then((response) => {
        setListUsers(response.data);
      });
  };

  //Validate email
  const isValidEmail = (email) => {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const checkUsernameDuplicate = (username) => {
    let check = false;
    listUsers.map((user) => {
      if (user.username === username) {
        check = true;
      }
    });
    return check;
  };

  // check input in fields
  const checkInput = (input) => {
    let message = {};
    if (input.username === undefined || input.username.trim() === "") {
      message = { ...message, userNameError: "Username is required" };
    } else {
      if (checkUsernameDuplicate(input.username)) {
        message = {
          ...message,
          userNameError: `Username ${input.username} is already taken`,
        };
      }
    }
    if (input.password === undefined || input.password.trim() === "") {
      message = { ...message, passwordError: "Password is required" };
    }
    if (input.fullName === undefined || input.fullName.trim() === "") {
      message = { ...message, fullNameError: "Fullname is required" };
    }
    if (input.email === undefined || input.email.trim() === "") {
      message = { ...message, emailError: "Email is required" };
    } else {
      if (!isValidEmail(input.email)) {
        message = { ...message, emailError: "Email entered is not valid" };
      }
    }
    return message;
  };

  // Handle sign up
  const handleSignUp = () => {
    const data = {
      username: username,
      password: password,
      fullName: fullName,
      email: email,
    };
    setMessageOtp("");
    setMessage(checkInput(data));
    // console.log(checkInput(data))
    if (
      username.trim() &&
      message === {} &&
      password.trim() &&
      isValidEmail(email) &&
      fullName.trim()
    ) {
      setMessage({});
      sendOtp();
      setShowComponent(!showComponent);
    } else {
      setMessage(checkInput(data));
    }
  };

  //Send otp to email
  const sendOtp = () => {
    const res = axios
      .post(
        `https://6618-1-53-195-148.ngrok-free.app/api/Email/SendOtp/?toEmail=${email}`
      )
      .then((res) => {
        console.log("da gui otp");
        setOtpSystem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Register with otp
  const signUpWithOtp = (otp) => {
    const data = {
      username: username,
      password: password,
      fullName: fullName,
      email: email,
    };
    // console.log(`https://6618-1-53-195-148.ngrok-free.app/Users/register?otp=${otp}`)
    return axios.post(
      `https://6618-1-53-195-148.ngrok-free.app/Users/register?otp=${otp}`,
      data
    );
  };

  //Handle submit of check otp component
  const handleSubmitOtpComponent = (otp) => {
    console.log(otp);
    if (otpSystem === otp) {
      signUpWithOtp(otp)
        .then((res) => {
          console.log("Dang ky thanh cong");
          getListUser();
          console.log("reset lai field");
          resetField();
          swal({
            title: "Successfully created an account",
            text: "Do you want to Login ?",
            icon: "success",

            buttons: {
              Login: {
                text: "Login",
                value: true, // Giá trị tương ứng với nút này
              },
              Cancel: {
                text: "No",
                value: false, // Giá trị tương ứng với nút này
              },
            },
          }).then((res) => {
            if (res) {
              navigate("/login");
            } else {
              setShowComponent(!showComponent);
              //  navigate('/register')
            }
          });
          // navigate('/login')
        })
        .catch((err) => {
          console.log(err.response.data);
          setMessageOtp(err.response.data);
        });
    } else {
      setMessageOtp("Otp is incorrect");
    }
  };

  //Object handle component
  const [showComponent, setShowComponent] = useState(false);
  const handleOtpComponent = {
    show: showComponent,
    message: messageOtp,
    changeShow: () => setShowComponent(!showComponent),
    sendOtp: () => sendOtp(),
    handleSubmit: (otp) => {
      handleSubmitOtpComponent(otp);
    },
  };
  useEffect(() => {
    resetMessageOtp();
  }, [showComponent]);

  //Reset field
  const resetField = () => {
    // console.log('reset lai field')
    setUsername("");
    setPassword("");
    setEmail("");
    setFullname("");
  };

  const resetMessage = () => {
    setMessage({});
  };

  const resetMessageOtp = () => {
    setMessageOtp("");
  };
  return (
    <>
      <div className="row">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    <form>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Username</strong>
                        </label>
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="username"
                        />
                        {message.userNameError && (
                          <p style={{ color: "red" }}>
                            {message.userNameError}
                          </p>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder="password"
                        />
                        {message.passwordError && (
                          <p style={{ color: "red" }}>
                            {message.passwordError}
                          </p>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="email"
                        />
                        {message.emailError && (
                          <p style={{ color: "red" }}>{message.emailError}</p>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Fullname</strong>
                        </label>
                        <input
                          value={fullName}
                          onChange={(e) => setFullname(e.target.value)}
                          className="form-control"
                          placeholder="fullname"
                        />
                        {message.fullNameError && (
                          <p style={{ color: "red" }}>
                            {message.fullNameError}
                          </p>
                        )}
                      </div>

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSignUp();
                          }}
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>

                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Login now?
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showComponent && <CheckOtp handleOtpComponent={handleOtpComponent} />}
      <ToastContainer />
    </>
  );
}

export default Register;
