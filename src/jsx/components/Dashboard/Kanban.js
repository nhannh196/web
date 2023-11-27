import React,{useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
// import Board, { moveCard } from "@asseinfo/react-kanban";

// import { board	} from './Kanban/KanbanData';
import KanbanBlog from './Kanban/KanbanBlog';
import BasicModal from './BasicModal';

//images
import pic1 from './../../../images/profile/small/pic1.jpg';
import pic2 from './../../../images/profile/small/pic2.jpg';
import pic5 from './../../../images/profile/small/pic5.jpg';


const Kanban = () =>{
	const childRef = useRef();
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="page-titles">
						<div className="left-title">
							<div className="d-flex align-items-center flex-wrap ">
								<h3 className="me-3 mb-0">Development Task</h3>
								<span>Sed eligendi facere repellendus. Ipsam ipsam incidunt minima harum tenetur.</span>
							</div>
							<div className="d-flex align-items-center flex-wrap my-2 my-sm-2">
								<span className="fs-14 font-w600 me-3 text-primary">Total Progress 60%</span>
								<div className="progress default-progress">
									<div className="progress-bar bg-gradient1 progress-animated" style={{width: "45%", height:"8px" }} role="progressbar">
										<span className="sr-only">45% Complete</span>
									</div>
								</div>
							</div>
						</div>
						<div className="right-title">
							<div className="title-content">
								<div className="bread-star">
									<svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M6.49755 24.3262L8.9142 16.8885C9.18195 16.0645 8.88863 15.1618 8.18766 14.6525L1.86078 10.0557L9.68123 10.0557C10.5477 10.0557 11.3156 9.49781 11.5833 8.67376L14 1.23606L16.4167 8.67376C16.6844 9.49781 17.4523 10.0557 18.3188 10.0557H26.1392L19.8123 14.6525C19.1114 15.1618 18.818 16.0645 19.0858 16.8885L21.5025 24.3262L15.1756 19.7295C14.4746 19.2202 13.5254 19.2202 12.8244 19.7295L6.49755 24.3262ZM6.49755 24.3262L5.54649 24.0172L6.49754 24.3262L7.08533 25.1353L6.49755 24.3262Z" stroke="#666666" strokeWidth="2"/>
									</svg>
								</div>
								<ul className="kanbanimg me-4">
									<li><img src={pic1} alt="" /></li>
									<li><img src={pic2} alt="" /></li>
									<li><img src={pic5} alt="" /></li>
									<li><span>5+</span></li>
								</ul>
								<div className="ms-3 bread-drop ">
									<Dropdown className="dropdown custom-dropdown">
										<Dropdown.Toggle as="div" className="i-false btn sharp btn-primary tp-btn sharp-lg">
											<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu dropdown-menu-end">
											<Dropdown.Item>Option 1</Dropdown.Item>
											<Dropdown.Item>Option 2</Dropdown.Item>
											<Dropdown.Item>Option 3</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
								<div className="ms-3 bread-btn">
									<Link to={"#"} className="btn btn-primary btn-sm" onClick={() => childRef.current.openModal()}>Invite<svg className="ms-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="#FCFCFC"/>
										<path d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z" fill="#FCFCFC"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>	
					</div>
				</div>				
			</div>	
			<div className="row kanban-bx gx-0">				
				<KanbanBlog />
			</div>
			<BasicModal ref={childRef} />
		</>
	)
}
export default Kanban;