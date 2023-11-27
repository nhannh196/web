import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {
	loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';
import axios from 'axios';

// image

import BgImage from "../../images/bg.png";
import logo from "../../images/logo-full.png";
import logolight from "../../images/logo-full-light.png";
import pol from "../../images/pol.jpg";
import { ToastContainer } from 'react-toastify';


function Login(props) {

	const [username, setUsername] = useState('');
	let errorsObj = { username: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate()
	function onLogin(e) {
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (username === '') {
			errorObj.username = 'Username is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		dispatch(loadingToggleAction(true));
		dispatch(loginAction(username, password, navigate));
	}

	const element = document.querySelector("body");
	let dataTheme = element.getAttribute("data-theme-version");

	return (
		<div className="card">
			<div className="card-body p-0">
				<div className="row m-0">
					<div className="col-xl-6 col-md-6 sign text-center sign-bg" style={{ backgroundImage: 'url(' + pol + ')' }}>
						<div>
							<div className="text-center my-5">
								{/* <Link to={"#"}>
												<img className="logo-abbr dark-logo" width="200" src={logo} alt="" />
										      	<img className="logo-abbr light-logo text-center m-auto" width="200" src={logolight} alt="" />
											</Link> */}
							</div>
							{
								dataTheme === "light" ?
									<img src={BgImage} className=" slideskew img-fix bitcoin-img sd-shape7" />
									:
									<img src={BgImage} className=" slideskew img-fix bitcoin-img sd-shape7" />
							}
						</div>
					</div>
					<div className="col-xl-6 col-md-6" >
						<div className="sign-in-your px-2">
							<h4 className="fs-20 ">Sign in your account</h4>
							<span>Welcome back! Login with your data that you entered<br /> during registration</span>
							{/* <div className="login-social">
											<Link to={"#"} className="btn btn-primary  d-block my-3"><i className="fab fa-google me-2"></i>Login with Google</Link>
											<Link to={"#"} className="btn btn-secondary  d-block my-3"><i className="fab fa-facebook-f me-2 facebook-log"></i>Login with Facebook</Link>
										</div> */}
							{props.errorMessage && (
								<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
									{props.errorMessage}
								</div>
							)}
							{props.successMessage && (
								<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
									{props.successMessage}
								</div>
							)}
							<form onSubmit={onLogin}>
								<div className="mb-3">
									<label className="mb-1"><strong>Username</strong></label>
									<input type="text" className="form-control"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder="Type Your Username"
									/>

									{errors.username && <div className="text-danger fs-12">{errors.username}</div>}
								</div>
								<div className="mb-3">
									<label className="mb-1"><strong>Password</strong></label>
									<input
										type="password"
										className="form-control"
										value={password}
										placeholder="Type Your Password"
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
								</div>
								<div className="row d-flex justify-content-between mt-4 mb-2">
									<div className="mb-3">
										<div className="form-check custom-checkbox ms-1">
											<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
											<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
										</div>
									</div>
									<div className="mb-3">
										<Link to="/register">Sign up</Link>
									</div>
									<div className="mb-3">
										<Link to="/forgot-password">Forgot password</Link>
									</div>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer/>
		</div>	
	);
};

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		showLoading: state.auth.showLoading,
	};
};
export default Login;
