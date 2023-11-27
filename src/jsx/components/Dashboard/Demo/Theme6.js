import React,{useState, useContext, useEffect, useReducer} from 'react';
import {Link} from 'react-router-dom';
import ApexCharts from 'apexcharts';
import  DatePicker  from "react-datepicker";
import {Dropdown, Modal} from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//import DonutChart from './Dashboard/DonutChart';
//import DonutChart2 from './Dashboard/DonutChart2';

//Import Components
import { ThemeContext } from "../../../../context/ThemeContext";
import HomeSlider from './../Dashboard/HomeSlider';
import ReviewsHomeSlider from './../Dashboard/ReviewsHomeSlider';
import DropDownBlog from './../DropDownBlog';

//images
//import small1 from './../../../images/profile/small/pic1.jpg';

const ProjectAreaChart = loadable(() =>
 	pMinDelay(import("./../Banking/ProjectAreaChart"), 1000)
);
const EmailPieChart = loadable(() =>
 	pMinDelay(import("./../Dashboard/EmailPieChart"), 1000)
);
const StatisticBarChart = loadable(() =>
 	pMinDelay(import("./../Dashboard/StatisticBarChart"), 1000)
);
const RedialChart = loadable(() =>
 	pMinDelay(import("./../Dashboard/RedialChart"), 1000)
);


const CharacterData = [
	{ svgColor:'#FFD125' ,changeClass:'up' , title:'Income'},
	{ svgColor:'#FCFCFC',  title:'Expense'},
];

const Theme6 = () => {
	const { changeBackground,
		changeNavigationHader,
		changePrimaryColor,
		chnageSidebarColor,
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeNavigationHader('color_11');
		changePrimaryColor('color_11');
		chnageSidebarColor('color_11')
		changeSideBarStyle({ value: "mini", label: "Mini" });
		//chnageHaderColor('color_12');
	}, []);

	const [startDate, setStartDate] = useState(new Date());
	const [selectBtn, setSelectBtn] = useState("This Month");
	const [selectBtn2, setSelectBtn2] = useState("This Month");
	

	const handleSeries = (value) => {	  
	  ApexCharts.exec('assetDistribution', 'toggleSeries', value)
	}
	
	
	const projectSeries = (value) => {	  
	  ApexCharts.exec('assetDistribution2', 'toggleSeries', value)
	}
	
	return(
		<>
			
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="page-titles style1">
								<div className="d-flex align-items-center">
									<h2 className="heading">Dashboard</h2>
								</div>
								<div id="datepicker" className="input-group date dz-calender" data-date-format="mm-dd-yyyy">
									<span className="input-group-addon d-flex align-items-center">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 14.0001C12.1978 14.0001 12.3911 13.9415 12.5556 13.8316C12.72 13.7217 12.8482 13.5655 12.9239 13.3828C12.9996 13.2001 13.0194 12.999 12.9808 12.805C12.9422 12.611 12.847 12.4329 12.7071 12.293C12.5673 12.1531 12.3891 12.0579 12.1951 12.0193C12.0011 11.9807 11.8 12.0005 11.6173 12.0762C11.4346 12.1519 11.2784 12.2801 11.1685 12.4445C11.0586 12.609 11 12.8023 11 13.0001C11 13.2653 11.1054 13.5197 11.2929 13.7072C11.4804 13.8947 11.7348 14.0001 12 14.0001ZM17 14.0001C17.1978 14.0001 17.3911 13.9415 17.5556 13.8316C17.72 13.7217 17.8482 13.5655 17.9239 13.3828C17.9996 13.2001 18.0194 12.999 17.9808 12.805C17.9422 12.611 17.847 12.4329 17.7071 12.293C17.5673 12.1531 17.3891 12.0579 17.1951 12.0193C17.0011 11.9807 16.8 12.0005 16.6173 12.0762C16.4346 12.1519 16.2784 12.2801 16.1685 12.4445C16.0586 12.609 16 12.8023 16 13.0001C16 13.2653 16.1054 13.5197 16.2929 13.7072C16.4804 13.8947 16.7348 14.0001 17 14.0001ZM12 18.0001C12.1978 18.0001 12.3911 17.9415 12.5556 17.8316C12.72 17.7217 12.8482 17.5655 12.9239 17.3828C12.9996 17.2001 13.0194 16.999 12.9808 16.805C12.9422 16.611 12.847 16.4328 12.7071 16.293C12.5673 16.1531 12.3891 16.0579 12.1951 16.0193C12.0011 15.9807 11.8 16.0005 11.6173 16.0762C11.4346 16.1519 11.2784 16.2801 11.1685 16.4445C11.0586 16.609 11 16.8023 11 17.0001C11 17.2653 11.1054 17.5197 11.2929 17.7072C11.4804 17.8947 11.7348 18.0001 12 18.0001ZM17 18.0001C17.1978 18.0001 17.3911 17.9415 17.5556 17.8316C17.72 17.7217 17.8482 17.5655 17.9239 17.3828C17.9996 17.2001 18.0194 16.999 17.9808 16.805C17.9422 16.611 17.847 16.4328 17.7071 16.293C17.5673 16.1531 17.3891 16.0579 17.1951 16.0193C17.0011 15.9807 16.8 16.0005 16.6173 16.0762C16.4346 16.1519 16.2784 16.2801 16.1685 16.4445C16.0586 16.609 16 16.8023 16 17.0001C16 17.2653 16.1054 17.5197 16.2929 17.7072C16.4804 17.8947 16.7348 18.0001 17 18.0001ZM7 14.0001C7.19778 14.0001 7.39112 13.9415 7.55557 13.8316C7.72002 13.7217 7.84819 13.5655 7.92388 13.3828C7.99957 13.2001 8.01937 12.999 7.98078 12.805C7.9422 12.611 7.84696 12.4329 7.70711 12.293C7.56725 12.1531 7.38907 12.0579 7.19509 12.0193C7.00111 11.9807 6.80004 12.0005 6.61732 12.0762C6.43459 12.1519 6.27841 12.2801 6.16853 12.4445C6.05865 12.609 6 12.8023 6 13.0001C6 13.2653 6.10536 13.5197 6.29289 13.7072C6.48043 13.8947 6.73478 14.0001 7 14.0001ZM19 4.00011H18V3.00011C18 2.73489 17.8946 2.48054 17.7071 2.293C17.5196 2.10546 17.2652 2.00011 17 2.00011C16.7348 2.00011 16.4804 2.10546 16.2929 2.293C16.1054 2.48054 16 2.73489 16 3.00011V4.00011H8V3.00011C8 2.73489 7.89464 2.48054 7.70711 2.293C7.51957 2.10546 7.26522 2.00011 7 2.00011C6.73478 2.00011 6.48043 2.10546 6.29289 2.293C6.10536 2.48054 6 2.73489 6 3.00011V4.00011H5C4.20435 4.00011 3.44129 4.31618 2.87868 4.87879C2.31607 5.4414 2 6.20446 2 7.00011V19.0001C2 19.7958 2.31607 20.5588 2.87868 21.1214C3.44129 21.684 4.20435 22.0001 5 22.0001H19C19.7956 22.0001 20.5587 21.684 21.1213 21.1214C21.6839 20.5588 22 19.7958 22 19.0001V7.00011C22 6.20446 21.6839 5.4414 21.1213 4.87879C20.5587 4.31618 19.7956 4.00011 19 4.00011ZM20 19.0001C20 19.2653 19.8946 19.5197 19.7071 19.7072C19.5196 19.8947 19.2652 20.0001 19 20.0001H5C4.73478 20.0001 4.48043 19.8947 4.29289 19.7072C4.10536 19.5197 4 19.2653 4 19.0001V10.0001H20V19.0001ZM20 8.00011H4V7.00011C4 6.73489 4.10536 6.48054 4.29289 6.293C4.48043 6.10546 4.73478 6.00011 5 6.00011H19C19.2652 6.00011 19.5196 6.10546 19.7071 6.293C19.8946 6.48054 20 6.73489 20 7.00011V8.00011ZM7 18.0001C7.19778 18.0001 7.39112 17.9415 7.55557 17.8316C7.72002 17.7217 7.84819 17.5655 7.92388 17.3828C7.99957 17.2001 8.01937 16.999 7.98078 16.805C7.9422 16.611 7.84696 16.4328 7.70711 16.293C7.56725 16.1531 7.38907 16.0579 7.19509 16.0193C7.00111 15.9807 6.80004 16.0005 6.61732 16.0762C6.43459 16.1519 6.27841 16.2801 6.16853 16.4445C6.05865 16.609 6 16.8023 6 17.0001C6 17.2653 6.10536 17.5197 6.29289 17.7072C6.48043 17.8947 6.73478 18.0001 7 18.0001Z" fill="var(--primary)"/>
										</svg>
									</span>
									<div className="calender-picker">
										<h6 className="fs-14 mb-0 ms-2 font-w600">Change Period</h6>										
										<DatePicker selected={startDate} className="form-control" 
											onChange={(date) => setStartDate(date)}
											dateFormat="MM-dd-yyyy"
										/>
									</div>
								</div>							
							</div>
						</div>
					</div>
					<HomeSlider />
					<div className="row">
						<div className="col-xl-8" >
							<div className="card crypto-chart ">
								<div className="card-header pb-0 border-0 flex-wrap">
									<div className="mb-2 mb-sm-0">
										<div className="chart-title mb-3">
											<h2 className="heading">Project Statistic</h2>	
										</div>
										<div className="d-flex align-items-center mb-3 mb-sm-0">
											<div className="round weekly" id="dzOldSeries">
												<div>
													<input type="checkbox" id="checkbox1" 
														value="Persent" onClick={()=>projectSeries('Persent')}
														name="radio" 
													/>
													<label htmlFor="checkbox1" className="checkmark"></label>
												</div>
												<div>
													<span className="fs-14">This Week</span>
													<h4 className="fs-5 font-w600 mb-0">1.982</h4>
												</div>
											</div>
											<div className="round " id="dzNewSeries">
												<div>
													<input type="checkbox" id="checkbox" name="radio" 
														value="Visitors" onClick={()=>projectSeries('Visitors')}
													/>
													<label htmlFor="checkbox" className="checkmark"></label>
												</div>
												<div>
													<span className="fs-14">This Week</span>
													<h4 className="fs-5 font-w600 mb-0">1.982</h4>
												</div>	
											</div>
										</div>
									</div>
									<div className="p-static">
										<div className="d-flex align-items-center mb-3 ">
											<Dropdown className="me-4 drop-select">
												<Dropdown.Toggle as="div" className="i-false drop-select-btn">{selectBtn2} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item onClick={()=>setSelectBtn2("This Month")}>This Month</Dropdown.Item>
													<Dropdown.Item onClick={()=>setSelectBtn2("This Weeks")}>This Weeks</Dropdown.Item>
													<Dropdown.Item onClick={()=>setSelectBtn2("Today")}>Today</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
											<DropDownBlog />
										</div>
										<div className="progress-content">
											<div className="d-flex justify-content-between">
												<h6>Total</h6>
												<span className="pull-end">3.982</span>
											</div>
											<div className="progress mt-1">
												<div className="progress-bar bg-primary" style={{width: "70%", height:	"100%" }} role="progressbar">
													<span className="sr-only">60% Complete</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="card-body pt-2 custome-tooltip pb-0">
									{/* <div id="activity"></div> */}
									<ProjectAreaChart />
								</div>
							</div>
						</div>
						<div className="col-xl-4 wow fadeInUp" data-wow-delay="1s">
							<div className="card">
								<div className="card-header border-0">
									<h2 className="heading">Email </h2>
									<DropDownBlog />
								</div>
								<div className="card-body text-center pt-0 pb-2">
									<EmailPieChart />
									<div className="chart-items">											
										<div className="row">
											<div className=" col-xl-12 col-sm-12">
												<div className="text-start mt-2">
													<span className="font-w600 mb-3 d-block text-black fs-14">Legend</span>
													<div className="color-picker">
														<span className="mb-0 col-6 fs-14">
															<svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="14" height="14" rx="4" fill="#9568FF" />
															</svg>
															Primary (27%)
														</span>
														<h5>763</h5>													
													</div>
													<div className="color-picker">
														<span className="mb-0 col-6 fs-14">
															<svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="14" height="14" rx="4" fill="#FF5166"/>
															</svg>
															Promotion (11%)
														</span>
														<h5>321</h5>
													</div>
													<div className="color-picker">
														<span className="mb-0 col-6 fs-14">
															<svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="14" height="14" rx="4" fill="#ED3DD1"/>
															</svg>
															Forum (22%)
														</span>
														<h5>154</h5>
													</div>
													<div className="color-picker">
														<span className="mb-0 col-6 fs-14">
															<svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="14" height="14" rx="4" fill="#2BC844"/>
															</svg>
															Socials (15%)
														</span>
														<h5>154</h5>
													</div>	
												</div>
											</div>												
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>	
					<div className="row">						
						<div className="col-lg-12 wow fadeInUp" data-wow-delay="1.5s">
							
							<div className="card statistic">
								<div className="row">
									<div className="col-xl-9">
										<div className="card-header border-0 flex-wrap pb-2">
											<div className="chart-title mb-2 ">
												<h2 className="heading text-white">Statistic</h2>
											</div>
										</div>
										<div className="card-body pt-0 custome-tooltip pe-0">
											<StatisticBarChart  />
										</div>
									</div>
									<div className="col-xl-3">
										<div className="statistic-content">
											<div className="d-flex justify-content-between">
												<Dropdown className="me-3 drop-select">
													<Dropdown.Toggle as="div" className="i-false drop-select-btn style-light">{selectBtn} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
													<Dropdown.Menu>
														<Dropdown.Item onClick={()=>setSelectBtn("This Month")}>This Month</Dropdown.Item>
														<Dropdown.Item onClick={()=>setSelectBtn("This Weeks")}>This Weeks</Dropdown.Item>
														<Dropdown.Item onClick={()=>setSelectBtn("Today")}>Today</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
												<Dropdown className="dropdown custom-dropdown">
													<Dropdown.Toggle className="i-false btn sharp primary-light" data-bs-toggle="dropdown">
														<svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
															<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g>
														</svg>
													</Dropdown.Toggle>
													<Dropdown.Menu className="dropdown-menu dropdown-menu-end">
														<Dropdown.Item>Option 1</Dropdown.Item>
														<Dropdown.Item>Option 2</Dropdown.Item>
														<Dropdown.Item>Option 3</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className="statistic-toggle my-3">
												<div className="toggle-btn" >
													<div >
														<input type="checkbox" id="checkbox3" name="toggle-btn" value="Income"  className="expense-value" onClick={()=>handleSeries('Income')}/>
														<label htmlFor="checkbox3" className="check"></label>
													</div>
													<div>
														<span className="fs-14">Income</span>
														<h4 className="fs-15 font-w600 mb-0">1.982</h4>
													</div>	
												</div>
												<div className="toggle-btn expense"  >
													<div>
														<input type="checkbox" id="checkbox2" name="toggle-btn" value="Expense"  className="income-value" onClick={()=>handleSeries('Expense')}/>
														<label htmlFor="checkbox2" className="check"></label>
													</div>
													<div>
														<span className="fs-14">Expense</span>
														<h4 className="fs-15 font-w600 mb-0">1.982</h4>
													</div>
												</div>
											</div>
											{CharacterData.map((item, ind)=>(
												<div className="card expense mb-3" key={ind}>
													<div className="card-body p-3">	
														<div className="students1 d-flex align-items-center justify-content-between ">
															<div className="content">
																<span>{item.title}</span>
																<h2>$ 12,890,00</h2>
																<h5 className={item.changeClass}>
																	<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M23.25 11.5C23.25 5.275 18.225 0.25 12 0.25C5.775 0.249999 0.75 5.275 0.75 11.5C0.749999 17.725 5.775 22.75 12 22.75C18.225 22.75 23.25 17.725 23.25 11.5ZM11.25 16.075L11.25 9.175L9.3 10.9C8.85 11.275 8.25 11.2 7.875 10.825C7.725 10.6 7.65 10.375 7.65 10.15C7.65 9.85 7.8 9.55 8.025 9.4L11.625 6.25C11.7 6.175 11.775 6.175 11.85 6.1C11.925 6.1 11.925 6.1 12 6.025C12.075 6.025 12.075 6.025 12.15 6.025L12.225 6.025C12.3 6.025 12.3 6.025 12.375 6.025L12.45 6.025C12.525 6.025 12.525 6.025 12.6 6.1C12.6 6.1 12.675 6.1 12.675 6.175L12.75 6.25C12.75 6.25 12.75 6.25 12.825 6.325L15.975 9.55C16.35 9.925 16.35 10.6 15.975 10.975C15.6 11.35 14.925 11.35 14.55 10.975L13.125 9.475L13.125 16.15C13.125 16.675 12.675 17.2 12.075 17.2C11.7 17.05 11.25 16.6 11.25 16.075Z" fill={item.svgColor}/>
																	</svg>
																	{" "}+15% 
																</h5>
															</div>
														</div>
													</div>
												</div>
											))}
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6">
							<div className="card Upgrade">
								<div className="card-body d-flex align-items-center ps-0">
									<div className="d-inline-block position-relative donut-chart-sale ">
										<RedialChart />
									</div>
									<div className="upgread-stroage">
										<h4 className="fs-20">Upgrade Your Storage</h4>
										<p>Lorem ipsum dolor sit amet, onsectetur.</p>
										<button className="btn btn-success">Upgrade</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6">
							<div className="card overflow-hidden">
								<div className="card-body p-4">
									<div className="d-flex justify-content-between flex-wrap">
										<div>
											<h4 className="fs-28 mb-0">7,642</h4>
											<span className="fs-18 text-secondary font-w600 mb-3 d-block">Total emails Subcriber.</span>
										</div>
										<div className="compose-btn">
											<button className="btn btn-secondary ">+ Compose Email</button>
										</div>	
									</div>
									<p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
									<div className="mail-img">
										<svg width="156" height="84" viewBox="0 0 156 84" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path opacity="0.1" d="M164.961 6.14744C165.013 5.67345 165.013 5.1969 164.961 4.72291L164.136 3.36961C164.136 3.36961 164.136 2.87103 163.678 2.65735L163.22 2.30122L161.754 1.37527C161.353 1.05833 160.888 0.79377 160.379 0.591786L158.821 0.164429H156.988H8.52299H6.69009L5.13212 0.663011C4.62116 0.832312 4.15505 1.07382 3.75745 1.37527L2.29113 2.30122C2.29113 2.30122 2.29113 2.30122 2.29113 2.65735C2.29113 3.01348 2.29113 3.15593 1.8329 3.36961L1.00809 4.72291C0.956224 5.1969 0.956224 5.67345 1.00809 6.14744L0 6.93093V92.4025C0 94.2916 0.965543 96.1032 2.68422 97.439C4.4029 98.7747 6.73393 99.5252 9.16451 99.5252H91.6451C94.0756 99.5252 96.4067 98.7747 98.1253 97.439C99.844 96.1032 100.81 94.2916 100.81 92.4025C100.81 90.5135 99.844 88.7018 98.1253 87.3661C96.4067 86.0303 94.0756 85.2799 91.6451 85.2799H18.329V21.1762L76.9818 55.3648C78.5682 56.2895 80.4976 56.7894 82.4805 56.7894C84.4635 56.7894 86.3929 56.2895 87.9792 55.3648L146.632 21.1762V85.2799H128.303C125.872 85.2799 123.541 86.0303 121.823 87.3661C120.104 88.7018 119.139 90.5135 119.139 92.4025C119.139 94.2916 120.104 96.1032 121.823 97.439C123.541 98.7747 125.872 99.5252 128.303 99.5252H155.797C158.227 99.5252 160.558 98.7747 162.277 97.439C163.996 96.1032 164.961 94.2916 164.961 92.4025V6.93093C164.961 6.93093 164.961 6.43234 164.961 6.14744ZM82.4805 40.7634L36.658 14.0536H128.303L82.4805 40.7634Z" fill="#9568FF"/>
										</svg>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<div className="user_reviews overflow-hidden">
								<h4 className="heading mb-3"> User Reviews</h4>
								{/* swiper */}
								<ReviewsHomeSlider />

							</div>
						</div>			
					</div>

				</div>		
			</div>		
		</>
	)
}
export default Theme6;