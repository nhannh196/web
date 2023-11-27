import React,{useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';

//Component
import DropDownBlog from './DropDownBlog';
import TicketingSlider from './Ticketing/TicketingSlider';
import QuestionIcon from './Ticketing/QuestionIcon';
import BasicModal from './BasicModal';

const RightIcon = () =>{
    return(
        <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">
                <path d="M5.50912 14.5C5.25012 14.5 4.99413 14.4005 4.80013 14.2065L1.79362 11.2C1.40213 10.809 1.40213 10.174 1.79362 9.78302C2.18512 9.39152 2.81913 9.39152 3.21063 9.78302L5.62812 12.2005L12.9306 7.18802C13.3866 6.87502 14.0106 6.99102 14.3236 7.44702C14.6371 7.90352 14.5211 8.52702 14.0646 8.84052L6.07613 14.324C5.90363 14.442 5.70612 14.5 5.50912 14.5Z" fill="#1EBA62"/>
                <path d="M5.50912 8.98807C5.25012 8.98807 4.99413 8.88857 4.80013 8.69457L1.79362 5.68807C1.40213 5.29657 1.40213 4.66207 1.79362 4.27107C2.18512 3.87957 2.81913 3.87957 3.21063 4.27107L5.62812 6.68857L12.9306 1.67607C13.3866 1.36307 14.0106 1.47907 14.3236 1.93507C14.6371 2.39157 14.5211 3.01507 14.0646 3.32857L6.07613 8.81257C5.90363 8.93057 5.70612 8.98807 5.50912 8.98807Z" fill="#1EBA62"/>
            </svg>
        </>
    )
}

const lastestTable = [
    {title:'Marilyn Workman', icon:'#1EBA62', iconClass:'btn-success', icon2: <RightIcon />, icontext:'Complete'},
    {title:'Talan Siphron', icon:'#FF4646', iconClass:'btn-primary', icon2: <QuestionIcon colorchange="#01A3FF" />, icontext:'Pending'},
    {title:'Thomas Khun', icon:'#FF4646', iconClass:'btn-pink', icon2: <QuestionIcon colorchange="#EB62D0" />, icontext:'Unpaid'},
    {title:'Talan Siphron', icon:'#1EBA62', iconClass:'btn-success', icon2: <RightIcon />, icontext:'Complete'},
    {title:'Marilyn Workman', icon:'#FF4646', iconClass:'btn-pink', icon2: <QuestionIcon colorchange="#EB62D0" />, icontext:'Unpaid'},
    {title:'Thomas Khun', icon:'#FF4646',  iconClass:'btn-primary', icon2: <QuestionIcon colorchange="#01A3FF" />, icontext:'Pending'},
    {title:'Talan Siphron', icon:'#1EBA62', iconClass:'btn-success', icon2: <RightIcon />, icontext:'Complete'},
];

const eventBlog = [
    {date:'1', title:'Design Webinar with Team'},
    {date:'2', title:'Anime Music Event'},
    {date:'3', title:'Top Management Meeting'},
    {date:'4', title:'Vacation'},
    {date:'5', title:'Usability Testing'},
    {date:'10', title:'Design Webinar with Team'},
    {date:'11', title:'Concert'},
    {date:'12', title:'Design Webinar with Team'},
    {date:'15', title:'Usability Testing'},
    {date:'17', title:'Top Management Meeting'},
];

const Ticketing = () =>{
    const [selectBtn, setSelectBtn] = useState("This Month");
    const childRef = useRef();
    return(
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-titles">
                                <div className="d-flex align-items-center">
                                    <h2 className="heading">Ticketing</h2>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row main-card">
                        <div className="col-xxl-8 col-xl-9">
                            {/* Slider  */}
                                <TicketingSlider />
                            {/* Slider  End*/}
                            <div className="row">
                                <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
                                    <div className="card">
                                        <div className="card-header border-0 flex-wrap">
                                            <h2 className="heading">Lastest Transaction</h2>
                                            <div className="d-flex align-items-center">
                                                <Dropdown className="me-4 drop-select">
                                                    <Dropdown.Toggle as="div" className="i-false drop-select-btn">{selectBtn} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=>setSelectBtn("This Month")}>This Month</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>setSelectBtn("This Weeks")}>This Weeks</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>setSelectBtn("Today")}>Today</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <DropDownBlog />
                                            </div>
                                        </div>
                                        <div className="card-body py-0">
                                            <div className="table-responsive">
                                                <table className="table-responsive-lg table display mb-4 order-table card-table text-black no-footer student-tbl">
                                                    <tbody>
                                                        {lastestTable.map((item, ind)=>(
                                                            <tr key={ind}>
                                                                <td className="whitesp-no p-0">
                                                                    <div className="d-flex py-sm-3 py-1 align-items-center trans-info">
                                                                        <span className="icon me-3">
                                                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M17.1657 -4.57764e-05H3.83236C2.9483 -4.57764e-05 2.10046 0.351144 1.47533 0.976265C0.850213 1.60139 0.499023 2.44923 0.499023 3.33329V16.6666C0.499023 17.5507 0.850213 18.3985 1.47533 19.0236C2.10046 19.6488 2.9483 20 3.83236 20H17.1657C18.0497 20 18.8976 19.6488 19.5227 19.0236C20.1478 18.3985 20.499 17.5507 20.499 16.6666V3.33329C20.499 2.44923 20.1478 1.60139 19.5227 0.976265C18.8976 0.351144 18.0497 -4.57764e-05 17.1657 -4.57764e-05ZM12.2074 12.5H7.56569L8.53236 13.475C8.68757 13.6311 8.77469 13.8423 8.77469 14.0625C8.77469 14.2826 8.68757 14.4938 8.53236 14.65C8.45449 14.7272 8.36214 14.7883 8.26061 14.8298C8.15908 14.8712 8.05036 14.8923 7.94069 14.8916C7.72207 14.8907 7.51258 14.8039 7.35736 14.65L4.96569 12.25C4.84866 12.1337 4.76877 11.9853 4.73613 11.8236C4.70349 11.6619 4.71958 11.4942 4.78236 11.3416C4.84487 11.1894 4.95104 11.0592 5.08747 10.9672C5.22391 10.8753 5.3845 10.8258 5.54902 10.825H12.2157C12.4367 10.825 12.6487 10.9128 12.8049 11.069C12.9612 11.2253 13.049 11.4373 13.049 11.6583C13.049 11.8793 12.9612 12.0913 12.8049 12.2475C12.6487 12.4038 12.4367 12.4916 12.2157 12.4916L12.2074 12.5ZM16.2574 8.68329C16.1904 8.82794 16.0834 8.95036 15.949 9.03603C15.8146 9.12169 15.6584 9.16702 15.499 9.16662H8.83236C8.61134 9.16662 8.39938 9.07882 8.2431 8.92254C8.08682 8.76626 7.99902 8.5543 7.99902 8.33329C7.99902 8.11228 8.08682 7.90031 8.2431 7.74403C8.39938 7.58775 8.61134 7.49996 8.83236 7.49996H13.474L12.5074 6.53329C12.3521 6.37715 12.265 6.16594 12.265 5.94579C12.265 5.72563 12.3521 5.51442 12.5074 5.35829C12.6635 5.20308 12.8747 5.11596 13.0949 5.11596C13.315 5.11596 13.5262 5.20308 13.6824 5.35829L16.074 7.74162C16.1961 7.85992 16.2792 8.01273 16.3119 8.17956C16.3447 8.34639 16.3257 8.51926 16.2574 8.67496V8.68329Z" fill={item.icon}/>
                                                                            </svg>	
                                                                        </span>
                                                                        <div >
                                                                            <h6 className="font-w500 fs-15 mb-0">{item.title}</h6>
                                                                            <span className="fs-14 font-w400"><Link to={"app-profile"}>@thomaskhuncoro</Link></span>
                                                                        </div>												
                                                                    </div>
                                                                </td>
                                                                <td className="whitesp-no">
                                                                    <Link to={"ecom-invoice"}  className="tb-mail">
                                                                        vita@mail.com	
                                                                    </Link>	
                                                                </td>
                                                                <td className="text-end">
                                                                    <span className={`btn light  btn-sm ${item.iconClass}`}>
                                                                        {item.icon2}
                                                                        {" "}
                                                                        {item.icontext}
                                                                    </span>
                                                                </td>
                                                                <td className="doller">- $ 60,00</td>
                                                            </tr>             
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>	
                                        <div className="table-pagenation px-4">
                                            <p>Showing <span>1-5</span>from <span>100</span>data</p>
                                            <nav>
                                                <ul className="pagination pagination-gutter pagination-primary no-bg">
                                                    <li className="page-item page-indicator">
                                                        <Link to={"#"} className="page-link" >
                                                            <i className="fa-solid fa-angle-left"></i>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item "><Link to={"#"} className="page-link" >1</Link></li>
                                                    <li className="page-item active"><Link to={"#"} className="page-link" >2</Link></li>
                                                    <li className="page-item"><Link to={"#"} className="page-link" >3</Link></li>
                                                    <li className="page-item page-indicator">
                                                        <Link to={"#"} className="page-link" >
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-3">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card event-agenda  h-auto">
                                        <div className="card-header border-0 pb-0">
                                            <div>
                                                <h2 className="heading">Event Agenda</h2>
                                            </div>
                                            <div className="add-icon">
                                                <Link to={"#"} className="add"  onClick={() => childRef.current.openModal()}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="white"/>
                                                        <path d="M16.3503 11.0251H12.9753V7.65009C12.9753 7.12509 12.5253 6.67509 12.0003 6.67509C11.4753 6.67509 11.0253 7.12509 11.0253 7.65009V11.0251H7.65029C7.12529 11.0251 6.67529 11.4751 6.67529 12.0001C6.67529 12.5251 7.12529 12.9751 7.65029 12.9751H11.0253V16.3501C11.0253 16.8751 11.4753 17.3251 12.0003 17.3251C12.5253 17.3251 12.9753 16.8751 12.9753 16.3501V12.9751H16.3503C16.8753 12.9751 17.3253 12.5251 17.3253 12.0001C17.3253 11.4751 16.8753 11.0251 16.3503 11.0251Z" fill="white"/>
                                                    </svg>								
                                                </Link>									
                                            </div>	
                                        </div>
                                        <div className="card-body loadmore-content  recent-activity-wrapper p-3 pt-0" id="RecentActivityContent">
                                            {eventBlog.map((data, ind)=>(
                                                <div className="d-flex align-items-center event" key={ind}>
                                                    <span className="event-date">
                                                        <h4>{data.date}</h4>
                                                        <span>DEC</span>
                                                    </span>
                                                    <div className="event-info">
                                                        <h6><Link to={"app-profile"}>{data.title}</Link></h6>
                                                        <span>1 December 2021 - 10.00 AM</span>
                                                    </div>                  
                                                </div>
                                            ))}
                                        </div>
                                        <div className="card-footer text-center border-0 pt-0">
                                            <Link to={"#"} className="btn btn-block light btn-secondary  dlab-load-more" id="RecentActivity">View More</Link>
                                        </div>
                                    </div>
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
export default Ticketing;