import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import BasicModal from '../components/Dashboard/BasicModal';
import DropDownBlog from '../components/Dashboard/DropDownBlog';

import pic1 from './../../images/profile/small/pic1.jpg';
import pic2 from './../../images/profile/small/pic2.jpg';
import pic3 from './../../images/profile/small/pic3.jpg';
import pic4 from './../../images/profile/small/pic4.jpg';
import pic5 from './../../images/profile/small/pic5.jpg';

const studentList = [
    { image: pic1,  title:'Samantha William', subtitle:'Marketing Manager'},
    { image: pic2,  title:'Tony Soap', subtitle:'UI Designer'},
    { image: pic3,  title:'Karen Hope', subtitle:'Web Developer'},
    { image: pic4,  title:'Jordan Nico', subtitle:'Graphic Design'},
    { image: pic5,  title:'Nadila Adja', subtitle:'QA Engineer'},
];

const projectbBar = [
    {value:'90%', title:'Web Design', bar:'bg-secondary', bartext:'text-secondary', time:'452'},
    {value:'75%', title:'Graphic Design',  bartext:'text-primary', time:'97'},
    {value:'60%', title:'Front-End', bar:'bg-danger', bartext:'text-danger', time:'75'},
];

const statusBlog = [
    { barcolor:'pink', time:'10 AM', barvalue:'15%'},
    { barcolor:'secondary', time:'11 AM', barvalue:'25%'},
    { barcolor:'success', time:'2 PM', barvalue:'25%'},
    { barcolor:'primary', time:'3 PM', barvalue:'15%'},
    { barcolor:'danger', time:'6 Pm', barvalue:'10%'},
];

const WalletBar = () => {
    const childRef = useRef();
    return(
        <>  
			<div className="wallet-bar" id="wallet-bar"> 
				<PerfectScrollbar className="dlab-scroll active wallet-bar-scroll" >
					<div className="row">	
						<div className="col-xl-12">
							<div className="card bg-transparent contacts mb-1">
								<div className="card-header border-0 pb-0 px-3 pt-2">
									<div>
										<h2 className="heading mb-0">Contacts</h2>
										<span>You have <span className="font-w600">456</span> contacts</span>
									</div>
									<div >
										<Link to={"#"} className="add" onClick={() => childRef.current.openModal()}>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="white"/>
												<path d="M16.3503 11.0251H12.9753V7.65009C12.9753 7.12509 12.5253 6.67509 12.0003 6.67509C11.4753 6.67509 11.0253 7.12509 11.0253 7.65009V11.0251H7.65029C7.12529 11.0251 6.67529 11.4751 6.67529 12.0001C6.67529 12.5251 7.12529 12.9751 7.65029 12.9751H11.0253V16.3501C11.0253 16.8751 11.4753 17.3251 12.0003 17.3251C12.5253 17.3251 12.9753 16.8751 12.9753 16.3501V12.9751H16.3503C16.8753 12.9751 17.3253 12.5251 17.3253 12.0001C17.3253 11.4751 16.8753 11.0251 16.3503 11.0251Z" fill="white"/>
											</svg>								
										</Link>									
									</div>	
								</div>
								<div className="card-body loadmore-content  recent-activity-wrapper p-3 pt-2" id="RecentActivityContent">
									{ studentList.map((item , ind)=>(
										<div className="d-flex align-items-center student" key={ind}>
											<span className="dz-media">
												<img src={item.image} alt="" width="50" />
											</span>
											<div className="user-info">
												<h6 className="name"><Link to={"app-profile"}>{item.title}</Link></h6>
												<span className="fs-14 font-w400 text-wrap">{item.subtitle}</span>
											</div>
											<div className="indox">
												<Link to={"#"}>
													<svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M18 0.889911C18.0057 0.823365 18.0057 0.756458 18 0.689911L17.91 0.499911C17.91 0.499911 17.91 0.429911 17.86 0.399911L17.81 0.349911L17.65 0.219911C17.6062 0.175413 17.5556 0.138269 17.5 0.109911L17.33 0.0499115H17.13H0.93H0.73L0.56 0.119911C0.504246 0.143681 0.453385 0.177588 0.41 0.219911L0.25 0.349911C0.25 0.349911 0.25 0.349911 0.25 0.399911C0.25 0.449911 0.25 0.469911 0.2 0.499911L0.11 0.689911C0.10434 0.756458 0.10434 0.823365 0.11 0.889911L0 0.999911V12.9999C0 13.2651 0.105357 13.5195 0.292893 13.707C0.48043 13.8946 0.734784 13.9999 1 13.9999H10C10.2652 13.9999 10.5196 13.8946 10.7071 13.707C10.8946 13.5195 11 13.2651 11 12.9999C11 12.7347 10.8946 12.4803 10.7071 12.2928C10.5196 12.1053 10.2652 11.9999 10 11.9999H2V2.99991L8.4 7.79991C8.5731 7.92973 8.78363 7.99991 9 7.99991C9.21637 7.99991 9.4269 7.92973 9.6 7.79991L16 2.99991V11.9999H14C13.7348 11.9999 13.4804 12.1053 13.2929 12.2928C13.1054 12.4803 13 12.7347 13 12.9999C13 13.2651 13.1054 13.5195 13.2929 13.707C13.4804 13.8946 13.7348 13.9999 14 13.9999H17C17.2652 13.9999 17.5196 13.8946 17.7071 13.707C17.8946 13.5195 18 13.2651 18 12.9999V0.999911C18 0.999911 18 0.929911 18 0.889911ZM9 5.74991L4 1.99991H14L9 5.74991Z" fill="#01A3FF"/>
													</svg>
												</Link>		
											</div>													
										</div>
									))}		
								</div>
								<div className="card-footer text-center border-0 pt-0 px-3">
									<Link to={"contact"} className="btn btn-block btn-primary  dlab-load-more" id="RecentActivity" rel="ajax/recentactivity.html">View More</Link>
								</div>
							</div>
						</div>
						
						<div className="col-xl-12">
							<div className="card progressbar bg-transparent mb-0">
								<div className="card-header border-0 px-3 pb-0">
									<div>
										<h2 className="heading">Project</h2>
										<span className="fs-14 font-w400">You have <strong>456 </strong>contacts</span>
									</div>
									<DropDownBlog />
								</div>
								<div className="card-body p-3">
									{projectbBar.map((data, ind)=>(
										<div key={ind}>
											<div className="progress default-progress">
												<div className={`progress-bar bg-vigit progress-animated  ${data.bar}`} style={{ width: data.value,  height:"100%" }}>
													<span className="sr-only">{data.value} Complete</span>
												</div>
											</div>
											<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
												<span className={`fs-14 font-w500 value ${data.bartext}`}> {data.title}</span>
												<span><span className="text-black pe-2 font-w500"></span>452 times</span>
											</div>
										</div>
									))}
									
								</div>
							</div>
						</div>
						
						<div className="col-xl-12 ">
							<div className="card tags bg-transparent ">
								<div className="card-header border-0  p-3 py-4 pb-0">
									<div>
										<h2 className="heading">Tag</h2>
									</div>								
								</div>
								<div className="card-body  p-3 py-1 ">	
									<div >
										<Link to={"#"} className="tag">#teamwork</Link>
										<Link to={"#"} className="tag">#design</Link>
										<Link to={"#"} className="tag">#projectmanagement</Link>
										<Link to={"#"} className="tag">16+</Link>
									</div>
								
								</div>
							</div>		
						</div>
						
						<div className="col-xl-12">
							<div className="card progressbar bg-transparent ">
								<div className="card-header border-0  p-3 pb-2">
									<div>
										<h2 className="heading">Server Status</h2>	
									</div>
									<DropDownBlog />
								</div>
								<div className="card-body  p-3">
									{statusBlog.map((item, index)=>(
										<div className="server-content" key={index}>
											<div className="progress default-progress">
												<div className={`progress-bar bg-vigit progress-animated bg-${item.barcolor}`} style={{ width: item.barvalue , height:"100%" }} role="progressbar">
													<span className="sr-only">{item.barvalue} Complete</span>
												</div>
											</div>
											<div className="d-flex align-items-end  pe-2 justify-content-between">
												<span className=" value text-pink">{item.time}</span>										
											</div>
										</div>
									))}
									
								</div>
							</div>
						</div>
						<div className="sidebar-footer">
							<div className="col-xl-12">
								<div className="row">
									<div className="col-xl-4">
										<div className="sidebar-info">
											<h5>Country</h5>
											<h4><Link to={"#"}> Indonesia</Link></h4>
										</div>
									</div>
									<div className="col-xl-4">
										<div className="sidebar-info">
											<h5>Domain</h5>
											<h4><Link to={"#"}> website.com </Link></h4>
										</div>
									</div>
									<div className="col-xl-4">
										<div className="sidebar-info">
											<span>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M0.367887 8.38398L7.44789 0.535979C7.73589 0.199978 8.26389 0.199978 8.55189 0.535979L15.6319 8.38398C16.0879 8.88798 15.7519 9.70398 15.0799 9.70398L0.919888 9.70398C0.247888 9.70398 -0.0881128 8.88798 0.367887 8.38398Z" fill="var(--primary)"/>
												</svg>
											</span>
											<h4><Link to={"#"}>2.0 mbps</Link></h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</PerfectScrollbar>
			
			</div>							
            <BasicModal ref={childRef} />
        </>
    )
}

export default WalletBar;