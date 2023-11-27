import React,{useState, useEffect} from "react";

import { Link } from "react-router-dom";
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

const Header = ({ onNote }) => {
  const [searchBut, setSearchBut] = useState(false);	
  const [selectImage, setSelectImage] = useState([alb,'Albania']);	

  function  SideBarAdd(){
	setTimeout(()=>{	
		let walletopen = document.querySelector(".wallet-open");
		if(walletopen.classList.contains('active')){
			walletopen.classList.remove("active");
		}else{
			walletopen.classList.add("active");
		}
	},200);
}

  //For header fixed 
  	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 
  
  return ( 
    <div className={`header ${ headerFix ? "sticky" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
				<div className="input-group search-area">
					<input type="text" 
						className={`form-control ${searchBut ? "active" : ""}`}
						placeholder="Search stock here..." 
					/>
					<span className="input-group-text">
						<Link to={"#"}>
							<svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF"/>
							</svg>
						</Link>
					</span>
				</div>			
            </div>
			<ul className="navbar-nav header-right">
				<li>
					<div className="search-coundry">						
						<Dropdown className="header-drop">
							<Dropdown.Toggle as="div" className="i-false header-drop-toggle"><img src={selectImage[0]} alt=""/> {selectImage[1]} <i className="fa-solid fa-caret-down"></i></Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={()=>setSelectImage([alb,'Albania'])}><img src={alb} alt=""/> Albania</Dropdown.Item>
								<Dropdown.Item onClick={()=>setSelectImage([alg,'Dash Coin'])}><img src={alg} alt=""/> Dash Coin</Dropdown.Item>
								<Dropdown.Item onClick={()=>setSelectImage( [usf, 'Ripple'])}><img src={usf} alt=""/> Ripple</Dropdown.Item>
								<Dropdown.Item onClick={()=>setSelectImage([rus,'Ethereum'])}><img src={rus} alt=""/> Ethereum</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>	
					</div>	
				</li>	

				<Dropdown as="li" className="nav-item dropdown notification_dropdown ">
					<Dropdown.Toggle variant="" as="a" className="nav-link bell bell-link i-false c-pointer nav-action" onClick={() => onNote()}>
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.33333 22.75C4.19613 22.7503 4.0601 22.7246 3.9325 22.6742C3.73093 22.5939 3.55811 22.4549 3.43642 22.2753C3.31473 22.0957 3.24979 21.8836 3.25 21.6667V4.33333C3.25 4.04602 3.36414 3.77047 3.5673 3.5673C3.77047 3.36414 4.04602 3.25 4.33333 3.25H21.6667C21.954 3.25 22.2295 3.36414 22.4327 3.5673C22.6359 3.77047 22.75 4.04602 22.75 4.33333V7.58333C22.75 7.87065 22.6359 8.1462 22.4327 8.34937C22.2295 8.55253 21.954 8.66667 21.6667 8.66667C21.3793 8.66667 21.1038 8.55253 20.9006 8.34937C20.6975 8.1462 20.5833 7.87065 20.5833 7.58333V5.41667H5.41667V18.9367L7.58333 16.5967C7.68803 16.4837 7.81563 16.3943 7.9576 16.3345C8.09958 16.2747 8.25267 16.2459 8.40667 16.25H20.5833V11.9167C20.5833 11.6293 20.6975 11.3538 20.9006 11.1506C21.1038 10.9475 21.3793 10.8333 21.6667 10.8333C21.954 10.8333 22.2295 10.9475 22.4327 11.1506C22.6359 11.3538 22.75 11.6293 22.75 11.9167V17.3333C22.75 17.6207 22.6359 17.8962 22.4327 18.0994C22.2295 18.3025 21.954 18.4167 21.6667 18.4167H8.8725L5.12417 22.4033C5.02316 22.5122 4.90083 22.5992 4.76478 22.6589C4.62874 22.7185 4.48188 22.7495 4.33333 22.75Z" fill="#666666"/>
							<path d="M17.3334 9.75001H8.66671C8.37939 9.75001 8.10384 9.63587 7.90068 9.43271C7.69751 9.22954 7.58337 8.95399 7.58337 8.66668C7.58337 8.37936 7.69751 8.10381 7.90068 7.90064C8.10384 7.69748 8.37939 7.58334 8.66671 7.58334H17.3334C17.6207 7.58334 17.8962 7.69748 18.0994 7.90064C18.3026 8.10381 18.4167 8.37936 18.4167 8.66668C18.4167 8.95399 18.3026 9.22954 18.0994 9.43271C17.8962 9.63587 17.6207 9.75001 17.3334 9.75001ZM17.3334 14.0833H8.66671C8.37939 14.0833 8.10384 13.9692 7.90068 13.766C7.69751 13.5629 7.58337 13.2873 7.58337 13C7.58337 12.7127 7.69751 12.4371 7.90068 12.234C8.10384 12.0308 8.37939 11.9167 8.66671 11.9167H17.3334C17.6207 11.9167 17.8962 12.0308 18.0994 12.234C18.3026 12.4371 18.4167 12.7127 18.4167 13C18.4167 13.2873 18.3026 13.5629 18.0994 13.766C17.8962 13.9692 17.6207 14.0833 17.3334 14.0833Z" fill="#666666"/>
						</svg>	
					</Dropdown.Toggle>
				</Dropdown>	
				<Dropdown as="li" className="nav-item dropdown notification_dropdown">
					<Dropdown.Toggle className="nav-link nav-action i-false c-pointer" variant="" as="a">
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M22.75 10.8334C22.7469 9.8751 22.4263 8.94488 21.8382 8.18826C21.2501 7.43163 20.4279 6.89126 19.5 6.6517V4.33337C19.4997 4.15871 19.4572 3.98672 19.3761 3.83204C19.295 3.67736 19.1777 3.54459 19.0342 3.44503C18.8922 3.34623 18.7286 3.28286 18.5571 3.26024C18.3856 3.23763 18.2111 3.25641 18.0484 3.31503L8.59086 6.7492L4.39835 6.50003C4.25011 6.49047 4.10147 6.51151 3.9617 6.56183C3.82192 6.61215 3.69399 6.69068 3.58585 6.79253C3.4789 6.89448 3.39394 7.01723 3.33619 7.15323C3.27843 7.28924 3.24911 7.43561 3.25002 7.58337V15.1667C3.25022 15.3205 3.28316 15.4725 3.34667 15.6126C3.41018 15.7527 3.5028 15.8777 3.61835 15.9792C3.733 16.0795 3.86752 16.1545 4.01312 16.1993C4.15873 16.2441 4.31214 16.2577 4.46335 16.2392L5.88252 16.0659L6.90085 21.8509C6.94471 22.1052 7.07794 22.3356 7.27655 22.5004C7.47516 22.6653 7.7261 22.7538 7.98419 22.75H11.9167C12.0748 22.7521 12.2314 22.7195 12.3756 22.6545C12.5197 22.5896 12.648 22.4939 12.7512 22.3741C12.8544 22.2544 12.9302 22.1135 12.9732 21.9613C13.0162 21.8092 13.0253 21.6494 13 21.4934L12.1984 16.7267L18.1242 18.4167C18.2211 18.4325 18.3198 18.4325 18.4167 18.4167C18.704 18.4167 18.9796 18.3026 19.1827 18.0994C19.3859 17.8962 19.5 17.6207 19.5 17.3334V15.015C20.4279 14.7755 21.2501 14.2351 21.8382 13.4785C22.4263 12.7218 22.7469 11.7916 22.75 10.8334ZM5.41669 8.7317L7.58335 8.85087V13.6717L5.41669 13.9425V8.7317ZM10.6384 20.5834H8.88336L8.03836 15.795L8.59086 15.73L9.89086 16.0875L10.6384 20.5834ZM17.3334 15.9034L11.4292 14.2675C11.2529 14.1491 11.0457 14.085 10.8334 14.0834L9.75002 13.78V8.6667L17.3334 5.91503V15.9034ZM19.5 12.6534V8.97003C19.8233 9.16188 20.0912 9.43455 20.2772 9.76124C20.4632 10.0879 20.5611 10.4574 20.5611 10.8334C20.5611 11.2093 20.4632 11.5788 20.2772 11.9055C20.0912 12.2322 19.8233 12.5049 19.5 12.6967V12.6534Z" fill="#666666"/>
						</svg>	
					</Dropdown.Toggle>
					<Dropdown.Menu align="end" className="mt-2 dropdown-menu dropdown-menu-end">
					  <PerfectScrollbar className="widget-media dz-scroll p-3 height380">
						<ul className="timeline">
						  <li>
							<div className="timeline-panel">
								<div className="media me-2">
									<img alt="images" width={50} src={avatar} />
								</div>
								<div className="media-body">
									<h6 className="mb-1">Dr sultads Send you Photo</h6>
									<small className="d-block">
									  29 July 2022 - 02:26 PM
									</small>
								</div>
							</div>
						  </li>
						  <li>
							<div className="timeline-panel">
							  <div className="media me-2 media-info">KG</div>
							  <div className="media-body">
								<h6 className="mb-1">
								  Resport created successfully
								</h6>
								<small className="d-block">
								  29 July 2022 - 02:26 PM
								</small>
							  </div>
							</div>
						  </li>
						  <li>
							<div className="timeline-panel">
							  <div className="media me-2 media-success">
								<i className="fa fa-home" />
							  </div>
							  <div className="media-body">
								<h6 className="mb-1">Reminder : Treatment Time!</h6>
								<small className="d-block">
								  29 July 2022 - 02:26 PM
								</small>
							  </div>
							</div>
						  </li>
						  <li>
							<div className="timeline-panel">
							  <div className="media me-2">
								<img alt="" width={50} src={avatar} />
							  </div>
							  <div className="media-body">
								<h6 className="mb-1">Dr sultads Send you Photo</h6>
								<small className="d-block">
								  29 July 2022 - 02:26 PM
								</small>
							  </div>
							</div>
						  </li>
						  <li>
							<div className="timeline-panel">
							  <div className="media me-2 media-danger">KG</div>
							  <div className="media-body">
								<h6 className="mb-1">
								  Resport created successfully
								</h6>
								<small className="d-block">
								  29 July 2022 - 02:26 PM
								</small>
							  </div>
							</div>
						  </li>
						  <li>
							<div className="timeline-panel">
							  <div className="media me-2 media-primary">
								<i className="fa fa-home" />
							  </div>
							  <div className="media-body">
								<h6 className="mb-1">Reminder : Treatment Time!</h6>
								<small className="d-block">
								  29 July 2022 - 02:26 PM
								</small>
							  </div>
							</div>
						  </li>
						</ul>
						<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
						  <div
							className="ps__thumb-x"
							tabIndex={0}
							style={{ left: 0, width: 0 }}
						  />
						</div>
						<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
						  <div
							className="ps__thumb-y"
							tabIndex={0}
							style={{ top: 0, height: 0 }}
						  />
						</div>
					  </PerfectScrollbar>
					  <Link className="all-notification" to="#">
						See all notifications <i className="ti-arrow-right" />
					  </Link>
					</Dropdown.Menu>
                </Dropdown>
				
				
				<Dropdown as="li" className="nav-item  notification_dropdown">
					<Dropdown.Toggle variant="" as="a" className="nav-link  ai-icon i-false c-pointer">
						<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M21.0966 7.93751L19.0491 7.28195L20.0133 5.42972C20.111 5.23585 20.1437 5.01761 20.1069 4.80514C20.07 4.59266 19.9654 4.39641 19.8075 4.24346L17.5 2.02703C17.3399 1.87311 17.1336 1.77126 16.9101 1.7358C16.6867 1.70034 16.4572 1.73304 16.2541 1.82932L14.3258 2.75544L13.6433 0.788743C13.5712 0.583741 13.4344 0.405421 13.2519 0.278597C13.0694 0.151774 12.8502 0.0827567 12.625 0.0811497H9.37496C9.14785 0.0805866 8.92629 0.148599 8.74161 0.275573C8.55693 0.402548 8.41847 0.582062 8.34579 0.788743L7.66329 2.75544L5.73496 1.82932C5.53312 1.73544 5.30592 1.70404 5.08472 1.73945C4.86351 1.77487 4.65919 1.87535 4.49996 2.02703L2.19246 4.24346C2.03222 4.39722 1.92619 4.59536 1.88927 4.81001C1.85234 5.02466 1.88639 5.24503 1.98663 5.44013L2.9508 7.29236L0.903296 7.94792C0.689871 8.01715 0.504224 8.14857 0.37219 8.32389C0.240156 8.4992 0.168303 8.70969 0.16663 8.92606V12.0478C0.166043 12.2659 0.23685 12.4788 0.369042 12.6561C0.501233 12.8335 0.688123 12.9665 0.903296 13.0363L2.9508 13.6919L1.98663 15.5441C1.88889 15.738 1.8562 15.9562 1.89307 16.1687C1.92994 16.3812 2.03455 16.5775 2.19246 16.7304L4.49996 18.9468C4.66004 19.1007 4.86632 19.2026 5.08979 19.2381C5.31326 19.2735 5.54268 19.2408 5.7458 19.1445L7.67413 18.2184L8.35663 20.1851C8.4293 20.3918 8.56777 20.5713 8.75245 20.6983C8.93713 20.8253 9.15868 20.8933 9.38579 20.8927H12.6358C12.8629 20.8933 13.0845 20.8253 13.2691 20.6983C13.4538 20.5713 13.5923 20.3918 13.665 20.1851L14.3475 18.2184L16.2758 19.1445C16.4763 19.2361 16.7013 19.2662 16.9203 19.2308C17.1392 19.1954 17.3416 19.0963 17.5 18.9468L19.8075 16.7304C19.9677 16.5766 20.0737 16.3785 20.1107 16.1639C20.1476 15.9492 20.1135 15.7288 20.0133 15.5337L19.0491 13.6815L21.0966 13.0259C21.3101 12.9567 21.4957 12.8253 21.6277 12.65C21.7598 12.4747 21.8316 12.2642 21.8333 12.0478V8.92606C21.8339 8.70791 21.7631 8.4951 21.6309 8.31771C21.4987 8.14032 21.3118 8.00732 21.0966 7.93751ZM19.6666 11.2986L18.3666 11.7148C18.0677 11.808 17.7934 11.9624 17.5629 12.1676C17.3323 12.3727 17.1509 12.6235 17.0314 12.9027C16.9118 13.1819 16.8569 13.4827 16.8705 13.7843C16.8841 14.0859 16.9658 14.381 17.11 14.6492L17.7275 15.8355L16.5358 16.9801L15.3333 16.3558C15.0555 16.2228 14.7512 16.1488 14.441 16.1386C14.1308 16.1285 13.8219 16.1824 13.5353 16.2969C13.2487 16.4113 12.9911 16.5836 12.7798 16.802C12.5685 17.0204 12.4086 17.2799 12.3108 17.5629L11.8775 18.8116H10.155L9.72163 17.5629C9.62466 17.2757 9.46382 17.0123 9.25027 16.7908C9.03671 16.5693 8.77556 16.3951 8.48492 16.2803C8.19427 16.1655 7.8811 16.1127 7.56712 16.1258C7.25314 16.1388 6.94587 16.2173 6.66663 16.3558L5.43163 16.9489L4.23996 15.8043L4.88996 14.6492C5.03415 14.381 5.11586 14.0859 5.12943 13.7843C5.143 13.4827 5.0881 13.1819 4.96855 12.9027C4.84899 12.6235 4.66764 12.3727 4.43707 12.1676C4.2065 11.9624 3.93223 11.808 3.6333 11.7148L2.3333 11.2986V9.67528L3.6333 9.25905C3.93223 9.16591 4.2065 9.01142 4.43707 8.80629C4.66764 8.60117 4.84899 8.35032 4.96855 8.07114C5.0881 7.79197 5.143 7.49116 5.12943 7.18957C5.11586 6.88798 5.03415 6.59284 4.88996 6.32462L4.27246 5.16958L5.46413 4.02494L6.66663 4.61807C6.94587 4.75656 7.25314 4.83505 7.56712 4.84808C7.8811 4.86112 8.19427 4.80839 8.48492 4.69355C8.77556 4.57871 9.03671 4.40452 9.25027 4.18305C9.46382 3.96158 9.62466 3.69814 9.72163 3.411L10.155 2.16231H11.845L12.2783 3.411C12.3753 3.69814 12.5361 3.96158 12.7497 4.18305C12.9632 4.40452 13.2244 4.57871 13.515 4.69355C13.8056 4.80839 14.1188 4.86112 14.4328 4.84808C14.7468 4.83505 15.054 4.75656 15.3333 4.61807L16.5683 4.02494L17.76 5.16958L17.11 6.32462C16.9715 6.59147 16.8944 6.88377 16.8839 7.18173C16.8733 7.47969 16.9295 7.77636 17.0486 8.05165C17.1678 8.32693 17.3471 8.57442 17.5745 8.77734C17.8019 8.98027 18.0721 9.1339 18.3666 9.22783L19.6666 9.64406V11.2986ZM11 6.32462C10.1429 6.32462 9.3051 6.56873 8.59249 7.02609C7.87988 7.48345 7.32446 8.13352 6.99648 8.89408C6.6685 9.65464 6.58269 10.4915 6.74989 11.299C6.91709 12.1064 7.3298 12.848 7.93583 13.4301C8.54186 14.0122 9.31398 14.4087 10.1546 14.5693C10.9952 14.7299 11.8664 14.6474 12.6583 14.3324C13.4501 14.0174 14.1268 13.4839 14.603 12.7994C15.0791 12.1149 15.3333 11.3102 15.3333 10.4869C15.3333 9.38302 14.8767 8.32432 14.0641 7.54373C13.2514 6.76315 12.1492 6.32462 11 6.32462ZM11 12.5681C10.5714 12.5681 10.1525 12.446 9.79623 12.2173C9.43992 11.9887 9.16221 11.6636 8.99822 11.2834C8.83423 10.9031 8.79132 10.4846 8.87493 10.0809C8.95853 9.67721 9.16488 9.30639 9.4679 9.01533C9.77091 8.72428 10.157 8.52606 10.5773 8.44576C10.9976 8.36546 11.4332 8.40667 11.8291 8.56419C12.225 8.72171 12.5634 8.98846 12.8015 9.3307C13.0396 9.67295 13.1666 10.0753 13.1666 10.4869C13.1666 11.0389 12.9384 11.5682 12.532 11.9585C12.1257 12.3488 11.5746 12.5681 11 12.5681Z" fill="#666666"/>
						</svg>
					</Dropdown.Toggle>
					<Dropdown.Menu align="end" className="mt-4 dropdown-menu dropdown-menu-end">
					<PerfectScrollbar className="widget-timeline dz-scroll style-1 ps p-3 height370">
						<ul className="timeline">
						<li>
							<div className="timeline-badge primary" />
							<Link
							className="timeline-panel c-pointer text-muted"
							to="#"
							>
							<span>10 minutes ago</span>
							<h6 className="mb-0">
								Youtube, a video-sharing website, goes live{" "}
								<strong className="text-primary">$500</strong>.
							</h6>
							</Link>
						</li>
						<li>
							<div className="timeline-badge info"></div>
							<Link
							className="timeline-panel c-pointer text-muted"
							to="#"
							>
							<span>20 minutes ago</span>
							<h6 className="mb-0">
								New order placed{" "}
								<strong className="text-info">#XF-2356.</strong>
							</h6>
							<p className="mb-0">
								Quisque a consequat ante Sit amet magna at
								volutapt...
							</p>
							</Link>
						</li>
						<li>
							<div className="timeline-badge danger"></div>
							<Link
							className="timeline-panel c-pointer text-muted"
							to="#"
							>
							<span>30 minutes ago</span>
							<h6 className="mb-0">
								john just buy your product{" "}
								<strong className="text-warning">Sell $250</strong>
							</h6>
							</Link>
						</li>
						<li>
							<div className="timeline-badge success"></div>
							<Link
							className="timeline-panel c-pointer text-muted"
							to="#"
							>
							<span>15 minutes ago</span>
							<h6 className="mb-0">
								StumbleUpon is acquired by eBay.{" "}
							</h6>
							</Link>
						</li>
						<li>
							<div className="timeline-badge warning"></div>
							<Link
							className="timeline-panel c-pointer text-muted"
							to="#"
							>
							<span>20 minutes ago</span>
							<h6 className="mb-0">
								Mashable, a news website and blog, goes live.
							</h6>
							</Link>
						</li>
						<li>
							<div className="timeline-badge dark"></div>
							<Link
							className="timeline-panel c-pointer text-muted"
							to="#"
							>
							<span>20 minutes ago</span>
							<h6 className="mb-0">
								Mashable, a news website and blog, goes live.
							</h6>
							</Link>
						</li>
						</ul>
						<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
						<div
							className="ps__thumb-x"
							tabIndex={0}
							style={{ left: 0, width: 0 }}
						/>
						</div>
						<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
						<div
							className="ps__thumb-y"
							tabIndex={0}
							style={{ top: 0, height: 0 }}
						/>
						</div>
					</PerfectScrollbar>
					</Dropdown.Menu>
              	</Dropdown> 
			  
				
			   
			    <li className="nav-item ">
					<Dropdown className="dropdown header-profile2">
						<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">							
							<div className="header-info2 d-flex align-items-center">
								<div className="d-flex align-items-center sidebar-info">
									<div>
										<h4 className="mb-0">Nella Vita</h4>
										<span className="d-block text-end">Admin</span>
									</div>
								</div>
								<img src={profile}  alt="" />
							</div>
						</Dropdown.Toggle>
						<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
							<Link to="/app-profile" className="dropdown-item ai-icon">
								<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<polygon points="0 0 24 0 24 24 0 24"/>
										<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/>
										<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="var(--primary)" fillRule="nonzero"/>
									</g>
								</svg>
								<span className="ms-2">Profile </span>
							</Link>
							<Link to="chat" className="dropdown-item ai-icon ">
								<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<rect x="0" y="0" width="24" height="24"/>
										<path d="M21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L5,18 C3.34314575,18 2,16.6568542 2,15 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 Z M6.16794971,10.5547002 C7.67758127,12.8191475 9.64566871,14 12,14 C14.3543313,14 16.3224187,12.8191475 17.8320503,10.5547002 C18.1384028,10.0951715 18.0142289,9.47430216 17.5547002,9.16794971 C17.0951715,8.86159725 16.4743022,8.98577112 16.1679497,9.4452998 C15.0109146,11.1808525 13.6456687,12 12,12 C10.3543313,12 8.9890854,11.1808525 7.83205029,9.4452998 C7.52569784,8.98577112 6.90482849,8.86159725 6.4452998,9.16794971 C5.98577112,9.47430216 5.86159725,10.0951715 6.16794971,10.5547002 Z" fill="var(--primary)"/>
									</g>
								</svg>
								<span className="ms-2">Message </span>
							</Link>
							<Link to="/email-inbox" className="dropdown-item ai-icon">
								<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<rect x="0" y="0" width="24" height="24"/>
										<path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000"/>
										<circle fill="var(--primary)" opacity="0.3" cx="19.5" cy="17.5" r="2.5"/>
									</g>
								</svg>
								<span className="ms-2">Inbox </span>
							</Link>
							<Link to="#" className="dropdown-item ai-icon ">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<rect x="0" y="0" width="24" height="24"/>
										<path d="M18.6225,9.75 L18.75,9.75 C19.9926407,9.75 21,10.7573593 21,12 C21,13.2426407 19.9926407,14.25 18.75,14.25 L18.6854912,14.249994 C18.4911876,14.250769 18.3158978,14.366855 18.2393549,14.5454486 C18.1556809,14.7351461 18.1942911,14.948087 18.3278301,15.0846699 L18.372535,15.129375 C18.7950334,15.5514036 19.03243,16.1240792 19.03243,16.72125 C19.03243,17.3184208 18.7950334,17.8910964 18.373125,18.312535 C17.9510964,18.7350334 17.3784208,18.97243 16.78125,18.97243 C16.1840792,18.97243 15.6114036,18.7350334 15.1896699,18.3128301 L15.1505513,18.2736469 C15.008087,18.1342911 14.7951461,18.0956809 14.6054486,18.1793549 C14.426855,18.2558978 14.310769,18.4311876 14.31,18.6225 L14.31,18.75 C14.31,19.9926407 13.3026407,21 12.06,21 C10.8173593,21 9.81,19.9926407 9.81,18.75 C9.80552409,18.4999185 9.67898539,18.3229986 9.44717599,18.2361469 C9.26485393,18.1556809 9.05191298,18.1942911 8.91533009,18.3278301 L8.870625,18.372535 C8.44859642,18.7950334 7.87592081,19.03243 7.27875,19.03243 C6.68157919,19.03243 6.10890358,18.7950334 5.68746499,18.373125 C5.26496665,17.9510964 5.02757002,17.3784208 5.02757002,16.78125 C5.02757002,16.1840792 5.26496665,15.6114036 5.68716991,15.1896699 L5.72635306,15.1505513 C5.86570889,15.008087 5.90431906,14.7951461 5.82064513,14.6054486 C5.74410223,14.426855 5.56881236,14.310769 5.3775,14.31 L5.25,14.31 C4.00735931,14.31 3,13.3026407 3,12.06 C3,10.8173593 4.00735931,9.81 5.25,9.81 C5.50008154,9.80552409 5.67700139,9.67898539 5.76385306,9.44717599 C5.84431906,9.26485393 5.80570889,9.05191298 5.67216991,8.91533009 L5.62746499,8.870625 C5.20496665,8.44859642 4.96757002,7.87592081 4.96757002,7.27875 C4.96757002,6.68157919 5.20496665,6.10890358 5.626875,5.68746499 C6.04890358,5.26496665 6.62157919,5.02757002 7.21875,5.02757002 C7.81592081,5.02757002 8.38859642,5.26496665 8.81033009,5.68716991 L8.84944872,5.72635306 C8.99191298,5.86570889 9.20485393,5.90431906 9.38717599,5.82385306 L9.49484664,5.80114977 C9.65041313,5.71688974 9.7492905,5.55401473 9.75,5.3775 L9.75,5.25 C9.75,4.00735931 10.7573593,3 12,3 C13.2426407,3 14.25,4.00735931 14.25,5.25 L14.249994,5.31450877 C14.250769,5.50881236 14.366855,5.68410223 14.552824,5.76385306 C14.7351461,5.84431906 14.948087,5.80570889 15.0846699,5.67216991 L15.129375,5.62746499 C15.5514036,5.20496665 16.1240792,4.96757002 16.72125,4.96757002 C17.3184208,4.96757002 17.8910964,5.20496665 18.312535,5.626875 C18.7350334,6.04890358 18.97243,6.62157919 18.97243,7.21875 C18.97243,7.81592081 18.7350334,8.38859642 18.3128301,8.81033009 L18.2736469,8.84944872 C18.1342911,8.99191298 18.0956809,9.20485393 18.1761469,9.38717599 L18.1988502,9.49484664 C18.2831103,9.65041313 18.4459853,9.7492905 18.6225,9.75 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/>
										<path d="M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>
									</g>
								</svg>
								<span className="ms-2">Settings </span>
							</Link>
							<LogoutPage />
						</Dropdown.Menu>
					</Dropdown>	
			    </li>  	
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
