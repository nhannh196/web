import React,{useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Modal} from 'react-bootstrap';

import DonutChart from './User/DonutChart';

//images
import profile  from './../../../images/profile/13.jpg';
import profile1  from './../../../images/profile/small/pic1.jpg';
import profile2  from './../../../images/profile/small/pic2.jpg';
import profile3  from './../../../images/profile/small/pic3.jpg';
import profile4  from './../../../images/profile/small/pic4.jpg';
import profile5  from './../../../images/profile/small/pic5.jpg';
import BasicModal from '../Dashboard/BasicModal';

const piechartBlog = [
    {title:'Invoices Made', percent:'90', bg:'rgba(1, 163, 255,1)'},
    {title:'Clients Growth', percent:'30', bg:'rgb(255, 209, 37,1)'},
    {title:'Projects Done', percent:'75', bg:'rgba(235, 98, 208,1)'},
    {title:'Income Increase', percent:'60', bg:'rgba(149, 104, 255,1)'},
];

const messageBlog = [
    {image:profile1, title:'Dedi Cahyadi', subtitle:'Head Manager'},
    {image:profile2, title:'Evans John', subtitle:'Programmer'},
    {image:profile3, title:'Brian Brandon', subtitle:'Graphic Designer'},
    {image:profile4, title:'Chynthia Lawra', subtitle:'Software Engineer'},
    {image:profile5, title:'Dedi Cahyadi', subtitle:'CEO'},
];

const User = () => {
    const childRef = useRef();
    return(
        <>  
            <div className="row">
                <div className="col-xl-9 col-xxl-8">                    
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="user card  ">
                                <div className="user-head">
                                    <div className="photo-content">
                                        <div className="cover-photo"></div>
                                    </div>
                                    <div className="user-info">
                                        <div className="user-photo">
                                            <img src={profile} className="img-fluid rounded-circle" alt="" />
                                        </div>
                                        <div className="user-details">
                                            <div>
                                                <div className="profile-name">
                                                    <h3 className="name">Nadila Adja</h3>
                                                    <h5>UI Designer</h5>
                                                    <span>
                                                        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 13.9 7.05 20 7.35 20.26C7.53113 20.4149 7.76165 20.5001 8 20.5001C8.23835 20.5001 8.46887 20.4149 8.65 20.26C9 20 16 13.9 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5ZM8 18.15C5.87 16.15 2 11.84 2 8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5C9.5913 2.5 11.1174 3.13214 12.2426 4.25736C13.3679 5.38258 14 6.9087 14 8.5C14 11.84 10.13 16.16 8 18.15ZM8 4.5C7.20887 4.5 6.43552 4.7346 5.77772 5.17412C5.11992 5.61365 4.60723 6.23836 4.30448 6.96927C4.00173 7.70017 3.92252 8.50444 4.07686 9.28036C4.2312 10.0563 4.61216 10.769 5.17157 11.3284C5.73098 11.8878 6.44371 12.2688 7.21964 12.4231C7.99556 12.5775 8.79983 12.4983 9.53073 12.1955C10.2616 11.8928 10.8864 11.3801 11.3259 10.7223C11.7654 10.0645 12 9.29113 12 8.5C12 7.43913 11.5786 6.42172 10.8284 5.67157C10.0783 4.92143 9.06087 4.5 8 4.5ZM8 10.5C7.60444 10.5 7.21776 10.3827 6.88886 10.1629C6.55996 9.94318 6.30362 9.63082 6.15224 9.26537C6.00087 8.89991 5.96126 8.49778 6.03843 8.10982C6.1156 7.72186 6.30608 7.36549 6.58579 7.08579C6.86549 6.80608 7.22186 6.6156 7.60982 6.53843C7.99778 6.46126 8.39991 6.50087 8.76537 6.65224C9.13082 6.80362 9.44318 7.05996 9.66294 7.38886C9.8827 7.71776 10 8.10444 10 8.5C10 9.03043 9.78929 9.53914 9.41421 9.91421C9.03914 10.2893 8.53043 10.5 8 10.5Z" fill="#666666"/>
                                                        </svg>
                                                        {" "}Jakarta, Indonesia
                                                    </span> 
                                                </div>
                                                <div className="user-contact">
                                                    <div className="user-number ">
                                                        <div className="dz-media">
                                                            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M27.2974 20.3613C27.2526 20.1711 27.1666 19.9931 27.0454 19.8399C26.9242 19.6867 26.7708 19.562 26.5961 19.4746L21.2627 16.8079C21.0124 16.683 20.7291 16.64 20.453 16.685C20.1768 16.7299 19.9218 16.8607 19.7241 17.0586L17.4907 19.2919C14.2814 18.7759 9.22408 13.7199 8.70941 10.5106L10.9427 8.27593C11.1407 8.07819 11.2714 7.8232 11.3164 7.54705C11.3614 7.27091 11.3184 6.98761 11.1934 6.73727L8.52675 1.40393C8.43945 1.22911 8.3148 1.07562 8.16161 0.954309C8.00842 0.833002 7.83044 0.746847 7.64027 0.701943C7.45009 0.657039 7.25238 0.654484 7.06111 0.694458C6.86983 0.734431 6.68969 0.815957 6.53341 0.933266L1.20008 4.93327C1.03449 5.05746 0.900082 5.21851 0.807512 5.40365C0.714941 5.58879 0.666748 5.79294 0.666748 5.99993C0.666748 18.7599 9.24008 27.3333 22.0001 27.3333C22.2071 27.3333 22.4112 27.2851 22.5964 27.1925C22.7815 27.0999 22.9426 26.9655 23.0667 26.7999L27.0667 21.4666C27.1837 21.3105 27.265 21.1305 27.3049 20.9396C27.3447 20.7486 27.3422 20.5512 27.2974 20.3613ZM21.3334 24.6573C10.7587 24.3733 3.62675 17.2413 3.34275 6.6666L6.85608 4.02527L8.37741 7.0666L6.39075 9.05327C6.26645 9.17752 6.16795 9.32513 6.1009 9.4876C6.03386 9.65006 5.99959 9.82418 6.00008 9.99993C6.00008 14.7106 13.2894 21.9999 18.0001 21.9999C18.3537 21.9999 18.6928 21.8593 18.9427 21.6093L20.9294 19.6226L23.9748 21.1453L21.3334 24.6573Z" fill="#FCFCFC"/>
                                                            </svg>	
                                                        </div>
                                                        <h4 className="details">+12 345 6789 0</h4>
                                                    </div>
                                                    <div className="user-email">
                                                        <div className="dz-media">
                                                            <svg width="20" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M24 1.85315C24.0075 1.76443 24.0075 1.67522 24 1.58649L23.88 1.33315C23.88 1.33315 23.88 1.23982 23.8133 1.19982L23.7467 1.13315L23.5333 0.95982C23.475 0.90049 23.4075 0.850965 23.3333 0.813154L23.1067 0.733154H22.84H1.24H0.973333L0.746667 0.826487C0.672327 0.85818 0.604514 0.903389 0.546667 0.95982L0.333333 1.13315C0.333333 1.13315 0.333333 1.13315 0.333333 1.19982C0.333333 1.26649 0.333333 1.29315 0.266667 1.33315L0.146667 1.58649C0.13912 1.67522 0.13912 1.76443 0.146667 1.85315L0 1.99982V17.9998C0 18.3534 0.140476 18.6926 0.390524 18.9426C0.640573 19.1927 0.979711 19.3332 1.33333 19.3332H13.3333C13.687 19.3332 14.0261 19.1927 14.2761 18.9426C14.5262 18.6926 14.6667 18.3534 14.6667 17.9998C14.6667 17.6462 14.5262 17.3071 14.2761 17.057C14.0261 16.807 13.687 16.6665 13.3333 16.6665H2.66667V4.66649L11.2 11.0665C11.4308 11.2396 11.7115 11.3332 12 11.3332C12.2885 11.3332 12.5692 11.2396 12.8 11.0665L21.3333 4.66649V16.6665H18.6667C18.313 16.6665 17.9739 16.807 17.7239 17.057C17.4738 17.3071 17.3333 17.6462 17.3333 17.9998C17.3333 18.3534 17.4738 18.6926 17.7239 18.9426C17.9739 19.1927 18.313 19.3332 18.6667 19.3332H22.6667C23.0203 19.3332 23.3594 19.1927 23.6095 18.9426C23.8595 18.6926 24 18.3534 24 17.9998V1.99982C24 1.99982 24 1.90649 24 1.85315ZM12 8.33315L5.33333 3.33315H18.6667L12 8.33315Z" fill="#FCFCFC"/>
                                                            </svg>	
                                                        </div>
                                                        <h4 className="details">info@example.com</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="side-detail">
                                                <div className="edit-profiil">
                                                    <button className="btn light btn-primary btn-sm text-nowrap">Edit Profile</button>
                                                </div>
                                                <Dropdown className="dropdown ms-auto">
                                                    <Dropdown.Toggle as="div" className="i-false btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu align="end" as="ul" className="dropdown-menu dropdown-menu-end">
                                                        <li className="dropdown-item"><Link to={"#"}><i className="fa fa-user-circle text-primary me-2"></i> View profile</Link></li>
                                                        <li className="dropdown-item"><Link to={"#"}><i className="fa fa-users text-primary me-2"></i> Add to btn-close friends </Link></li>
                                                        <li className="dropdown-item"><Link to={"#"}><i className="fa fa-plus text-primary me-2"></i> Add to group </Link></li>
                                                        <li className="dropdown-item"><Link to={"#"}><i className="fa fa-ban text-primary me-2"></i> Block </Link></li>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            
                                        </div>
                                    
                                    </div>
                                
                                </div>
                            </div>
                            
                        </div>

                        <div className="col-xl-12">
                            <div className="card pie-chart2">
                                <div className="card-header border-0">
                                    <h2 className="heading">Pie Chart</h2>
                                    <div className="d-flex align-items-center">
                                        <div className="coman-btn me-2">
                                            <button type="button" className="btn light btn-primary btn-sm mx-1">Chart</button>
                                            <button type="button" className="btn light btn-primary btn-sm mx-1">Activity</button>
                                        </div>
                                        <Dropdown className="dropdown ms-auto">
                                            <Dropdown.Toggle as="div" className="i-false btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end" as="ul" className="dropdown-menu dropdown-menu-end">
                                                <li className="dropdown-item"><Link to={"#"}><i className="fa fa-user-circle text-primary me-2"></i> View profile</Link></li>
                                                <li className="dropdown-item"><Link to={"#"}><i className="fa fa-users text-primary me-2"></i> Add to btn-close friends </Link></li>
                                                <li className="dropdown-item"><Link to={"#"}><i className="fa fa-plus text-primary me-2"></i> Add to group </Link></li>
                                                <li className="dropdown-item"><Link to={"#"}><i className="fa fa-ban text-primary me-2"></i> Block </Link></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-group">
                                        { piechartBlog.map((item , ind)=>(
                                            <div className="text-center radius-bar" key={ind}>
                                                <div className="d-inline-block position-relative donut-chart-sale">
                                                    <DonutChart className="donut1" value={item.percent} backgroundColor={item.bg}
                                                        backgroundColor2= "rgba(245, 245, 245, 1)"
                                                    />
                                                    <small>{item.percent}%</small>
                                                </div>
                                                <h4>{item.title}</h4>
                                            </div>
                                        ))}                                        
                                    </div>
                                    <div className="chart-info">
                                        <div>
                                            <h4>Best tips increase management</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <br />
                                                do eiusmod tempor incididunt ut labore et dolore magna
                                            </p>
                                        </div>
                                        <div>
                                            <Link to={"#"} className="btn light btn-primary">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>   
                <div className="col-xl-3 col-xxl-4">
                    <div className="row">                               
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="">
                                    <div className="prot-blog">
                                        <div className="d-flex post justify-content-between mb-3 align-items-center">
                                            <h3 className="text d-inline mb-0">Your Plan</h3>
                                            <Dropdown className="dropdown">
                                                <Dropdown.Toggle as="div" className="i-false"  data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.0012 9.86792C11.6543 9.86792 11.3109 9.93268 10.9904 10.0585C10.67 10.1843 10.3788 10.3687 10.1335 10.6012C9.88829 10.8337 9.69374 11.1097 9.56101 11.4134C9.42828 11.7172 9.35996 12.0427 9.35996 12.3715C9.35996 12.7003 9.42828 13.0258 9.56101 13.3296C9.69374 13.6333 9.88829 13.9093 10.1335 14.1418C10.3788 14.3743 10.67 14.5587 10.9904 14.6845C11.3109 14.8103 11.6543 14.8751 12.0012 14.8751C12.7017 14.8749 13.3734 14.611 13.8686 14.1414C14.3638 13.6718 14.6419 13.0349 14.6418 12.3709C14.6416 11.7069 14.3632 11.0702 13.8677 10.6008C13.3723 10.1314 12.7004 9.86777 12 9.86792H12.0012ZM3.60116 9.86792C3.25431 9.86792 2.91086 9.93268 2.59042 10.0585C2.26997 10.1843 1.97881 10.3687 1.73355 10.6012C1.48829 10.8337 1.29374 11.1097 1.16101 11.4134C1.02828 11.7172 0.959961 12.0427 0.959961 12.3715C0.959961 12.7003 1.02828 13.0258 1.16101 13.3296C1.29374 13.6333 1.48829 13.9093 1.73355 14.1418C1.97881 14.3743 2.26997 14.5587 2.59042 14.6845C2.91086 14.8103 3.25431 14.8751 3.60116 14.8751C4.30165 14.8749 4.97339 14.611 5.4686 14.1414C5.9638 13.6718 6.24192 13.0349 6.24176 12.3709C6.2416 11.7069 5.96318 11.0702 5.46775 10.6008C4.97231 10.1314 4.30045 9.86777 3.59996 9.86792H3.60116ZM20.4012 9.86792C20.0543 9.86792 19.7109 9.93268 19.3904 10.0585C19.07 10.1843 18.7788 10.3687 18.5336 10.6012C18.2883 10.8337 18.0937 11.1097 17.961 11.4134C17.8283 11.7172 17.76 12.0427 17.76 12.3715C17.76 12.7003 17.8283 13.0258 17.961 13.3296C18.0937 13.6333 18.2883 13.9093 18.5336 14.1418C18.7788 14.3743 19.07 14.5587 19.3904 14.6845C19.7109 14.8103 20.0543 14.8751 20.4012 14.8751C21.1017 14.8749 21.7734 14.611 22.2686 14.1414C22.7638 13.6718 23.0419 13.0349 23.0418 12.3709C23.0416 11.7069 22.7632 11.0702 22.2677 10.6008C21.7723 10.1314 21.1005 9.86777 20.4 9.86792H20.4012Z" fill="#FCFCFC"/>
                                                    </svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" >
                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="d-flex fill justify-content-between align-items-center">
                                            <h2 className="text">Free</h2>
                                            <Link to={"#"}>Upgrade Plan</Link>
                                        </div>
                                        <h4>
                                            <Link to={"post-details"} className="text-bla">
                                                <svg className="me-1" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="4.5" cy="4.5" r="4.5" fill="#FCFCFC"/>
                                                </svg>
                                                {" "} 50 GB Storage
                                            </Link>
                                        </h4>
                                        <h4><Link to={"post-details"} className="text-bla"><svg className="me-1" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4.5" cy="4.5" r="4.5" fill="#FCFCFC"/>
                                            </svg>
                                            {" "} Limited Features</Link></h4>
                                        <p className="mb-0">Upgrade to Premium Plan to get more Features & Storage memory</p>
                                        <div className="shape">
                                            <svg width="488" height="353" viewBox="0 0 488 353" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_51_1209" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="438" height="283">
                                                <rect width="438" height="283" fill="url(#paint0_linear_51_1209)"/>
                                                </mask>
                                                <g mask="url(#mask0_51_1209)">
                                                <path d="M165 410.5H15L465.5 88H487.5L165 410.5Z" fill="#ccecff"/>
                                                <path d="M264 369.5H114L564.5 47H586.5L264 369.5Z" fill="#ccecff"/>
                                                </g>
                                                <defs>
                                                <linearGradient id="paint0_linear_51_1209" x1="308.075" y1="-143.042" x2="316.634" y2="468.334" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#363B64"/>
                                                <stop offset="1" stopColor="#4CBC9A"/>
                                                </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card messages ">
                                <div className="card-header border-0 p-4 pb-0 ">
                                    <div>
                                        <h2 className="heading">Messages</h2>
                                    </div>
                                    <div >
                                        <Link to={"#"} className="add" data-bs-toggle="modal" onClick={() => childRef.current.openModal()}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="white"/>
                                                <path d="M16.3503 11.0251H12.9753V7.65009C12.9753 7.12509 12.5253 6.67509 12.0003 6.67509C11.4753 6.67509 11.0253 7.12509 11.0253 7.65009V11.0251H7.65029C7.12529 11.0251 6.67529 11.4751 6.67529 12.0001C6.67529 12.5251 7.12529 12.9751 7.65029 12.9751H11.0253V16.3501C11.0253 16.8751 11.4753 17.3251 12.0003 17.3251C12.5253 17.3251 12.9753 16.8751 12.9753 16.3501V12.9751H16.3503C16.8753 12.9751 17.3253 12.5251 17.3253 12.0001C17.3253 11.4751 16.8753 11.0251 16.3503 11.0251Z" fill="white"/>
                                            </svg>								
                                        </Link>									
                                    </div>	
                                </div>
                                
                                <div className="card-body loadmore-content  recent-activity-wrapper p-4" id="RecentActivityContent">
                                    <div className="input-group search-area mb-3">
                                        <input type="text" className="form-control" placeholder="Search here..." />
                                        <span className="input-group-text"><Link to={"#"}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.3" d="M16.6751 19.4916C16.2194 19.036 16.2194 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9916 22.5084C23.4473 22.964 23.4473 23.7027 22.9916 24.1583C22.536 24.6139 21.7973 24.6139 21.3417 24.1583L16.6751 19.4916Z" fill="#01A3FF"></path>
                                            <path d="M12.8333 18.6667C16.055 18.6667 18.6667 16.055 18.6667 12.8334C18.6667 9.61169 16.055 7.00002 12.8333 7.00002C9.61166 7.00002 6.99999 9.61169 6.99999 12.8334C6.99999 16.055 9.61166 18.6667 12.8333 18.6667ZM12.8333 21C8.323 21 4.66666 17.3437 4.66666 12.8334C4.66666 8.32303 8.323 4.66669 12.8333 4.66669C17.3436 4.66669 21 8.32303 21 12.8334C21 17.3437 17.3436 21 12.8333 21Z" fill="#01A3FF"></path>
                                            </svg>
                                            </Link>
                                        </span>
                                    </div>
                                    {messageBlog.map((data, ind)=>(
                                        <div className="d-flex align-items-center student" key={ind}>
                                            <span className="me-3 me-lg-2">
                                                <img src={data.image} alt="" width="50" />
                                            </span>
                                            <div className="user-info">
                                                <h6 className="name"><Link to={"post-details"}>{data.title}</Link></h6>
                                                <span className="fs-14 font-w400 text-wrap">{data.subtitle}</span>
                                            </div>
                                            <div className="indox text-center">
                                                <span className="d-block">12:45 PM</span>
                                                <span className="badge  badge-primary">2</span>		
                                            </div>																
                                        </div>
                                    ))}
                                  
                                </div>
                                <div className="card-footer text-center border-0 pt-0">
                                    <Link to={"#"} className="btn btn-block btn-primary  dlab-load-more" >View More</Link>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div> 

            </div>    
            <BasicModal ref={childRef} />

        </>

    )
}
export default User;