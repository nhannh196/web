import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Login } from "../../pages/Login"
import { isLogin } from "../../../services/AuthService";
import "../../../css/icon-name.css"
/// Scroll
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import LogoutPage from './Logout';

/// Image
import profile from "../../../images/user.jpg";
import alb from '../../../images/svg/albania.svg';



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

	const convertFullName = (fullName) => {
		// console.log(fullName.trim() === "")
		if (fullName.trim() === null || fullName.trim() === "" || fullName.trim() === undefined) {
			// console.log('chay vo khong tu')
			return ""
		} else {
			const nameSplit = fullName.trim().split(' ');
			if (nameSplit.length > 1) {
				// console.log('chay vo nhieu tu')
				const firstLetterFirstName = nameSplit[0][0].toUpperCase()
				const lastName = nameSplit[nameSplit.length - 1]
				const firstLetterLastName = lastName[0].toUpperCase()
				return firstLetterFirstName + firstLetterLastName
			} else {
				// console.log('chay vo 1 tu')
				return nameSplit[0][0].toUpperCase()
			}
		}
	}

	return (
		<div className={`header ${headerFix ? "sticky" : ""}`}>
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left">

						</div>
						<ul className="navbar-nav header-right">
							{isLogin() ?
								<>
									<li className="nav-item ">
										{/* <Dropdown className="dropdown header-profile2">
											<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer"> */}
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
										</div>
										<Dropdown className="dropdown header-profile2">
											<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
												<div class="initial-avatar header-item">
													{convertFullName(userDetails.fullName)}
													{/* Alo 123 */}
												</div>
											</Dropdown.Toggle>
											<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
												{/* <Dropdown.Item>
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
												</Dropdown.Item> */}
												<Dropdown.Item>
													<LogoutPage />
												</Dropdown.Item>
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