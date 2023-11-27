import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Login } from "../../pages/Login"
import { isLogin } from "../../../services/AuthService";
/// Scroll
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import LogoutPage from './Logout';

/// Image
import profile from "../../../images/user.jpg";
import avatar from "../../../images/avatar/1.jpg";
import alb from '../../../images/svg/albania.svg';
import alg from '../../../images/svg/algeria.svg';
import usf from '../../../images/svg/usflag.svg';
import rus from '../../../images/svg/rus.svg';


function SideBarAdd() {
	setTimeout(() => {
		let walletopen = document.querySelector(".wallet-open");
		if (walletopen.classList.contains('active')) {
			walletopen.classList.remove("active");
		} else {
			walletopen.classList.add("active");
		}
	}, 200);
}

const Header = ({ onNote }) => {
	const [searchBut, setSearchBut] = useState(false);
	const [selectImage, setSelectImage] = useState([alb, 'Albania']);

	//For header fixed 
	const [headerFix, setheaderFix] = useState(false);
	const [load, setLoad] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);


	//end
	//Data user
	const userDetails = JSON.parse(localStorage.getItem('userDetails'));
	// console.log(userDetails);
	return (
		<div className={`header ${headerFix ? "sticky" : ""}`}>
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left">
							{/* <div className="input-group search-area">
								<input type="text"
									className={`form-control ${searchBut ? "active" : ""}`}
									placeholder="Search stock here..."
								/>
								<span className="input-group-text">
									<Link to={"#"}>
										<svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF" />
										</svg>
									</Link>
								</span>
							</div> */}
						</div>
						<ul className="navbar-nav header-right">
							{isLogin() ?
								<>
									<li className="nav-item ">
										<Dropdown className="dropdown header-profile2">
											<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
												<div className="header-info2 d-flex align-items-center">
													<div className="d-flex align-items-center sidebar-info">
														<div>
															<h4 className="mb-0">{userDetails.fullName}</h4>
															{userDetails.roleid == 1 &&
																<>
																	<span className="d-block text-end">Admin</span>
																</>}
															{userDetails.roleid == 2 &&
																<>
																</>}
															{userDetails.roleid == 3 &&
																<>
																	<span className="d-block text-end">Manage</span>
																</>}
														</div>
													</div>
													<img src={profile} alt="" />
												</div>
											</Dropdown.Toggle>
											<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
												<Link to="/app-profile" className="dropdown-item ai-icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<polygon points="0 0 24 0 24 24 0 24" />
															<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
															<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="var(--primary)" fillRule="nonzero" />
														</g>
													</svg>
													<span className="ms-2">Profile </span>
												</Link>
												<LogoutPage />
											</Dropdown.Menu>
										</Dropdown>
									</li>
								</>
								:
								<>
									<li className="nav-item">

										<div className="header-profile2">
											<Link to='/login' >
												<Button className="me-2 btn btn-primary" variant="primary btn-lg">
													Login
												</Button>
											</Link>
										</div>


										<div className="header-profile2">
											<Link to='/register' >
												<Button className="me-2" variant="primary btn-lg">
													Create account
												</Button>
											</Link>
										</div>


									</li>
								</>

							}
						</ul>
					</div>
				</nav>
			</div >
		</div >
	);
};

export default Header;