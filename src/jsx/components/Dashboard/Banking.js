import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";


//Component
import DropDownBlog from './DropDownBlog';
//import BalanceBarChart from './Banking/BalanceBarChart';

import trans1 from './../../../images/trans/1.jpg';
import trans2 from './../../../images/trans/2.jpg';
import trans3 from './../../../images/trans/3.jpg';
import trans4 from './../../../images/trans/4.jpg';
import quick1 from './../../../images/contacts/New folder/1.jpg';

const BalanceBarChart = loadable(() =>
	pMinDelay(import("./Banking/BalanceBarChart"), 1000)
);
const ProjectAreaChart = loadable(() =>
	pMinDelay(import("./Banking/ProjectAreaChart"), 1000)
);


const TransactionData = [
    { image: trans1, title:'Portu Adja'},
    { image: trans2, title:'Bea Mine'},
    { image: trans3, title:'Nextrun Adja'},
    { image: trans4, title:'Anita Bath'},
    { image: trans2, title:'Rhoda Report'},
];

const infoblog = [
    {title:'Nadila Adja', price:'12.568,60 '},
    {title:'Mine Bea', price:'10.162,30 '},
    {title:'Rhoda Report', price:'14.654,70 '},
];

const Banking = () =>{
    const [selectBtn, setSelectBtn] = useState("This Month");
    const [selectBtn2, setSelectBtn2] = useState("This Month");
    return(
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="page-titles">
                        <div className="d-flex align-items-center">
                            <h2 className="heading">Banking</h2>
                        </div>
                    </div>
                </div>    
                <div className="col-xl-6">
                    {/* <!-- Row --> */}
                    <div className="row">
                        {/* <!-- ----column---- --> */}
                        <div className="col-xl-12">
                            <div className="card your_balance">
                                <div className="card-header border-0">
                                    <div>
                                        <h2 className="heading mb-1">Your Balance</h2>
                                        <span>June 1, 2020, 08:22 AM</span>
                                    </div>
                                </div>
                                <div className="card-body pt-0 custome-tooltip">
                                    <div className="row gx-0">
                                        <div className="col-xl-4 col-sm-4">
                                            <div className="mothly-income">
                                                <span>This Month</span>
                                                <h4>$23,741.00 <span className="ms-1"> + 15%</span></h4>
                                            </div>
                                            <div className="balance_data">
                                                <div className="balance-icon income">
                                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.16667 25.6667H19.8333C20.9384 25.6667 21.9982 25.2277 22.7796 24.4463C23.561 23.6649 24 22.6051 24 21.5V16.5C24 15.3949 23.561 14.3351 22.7796 13.5537C21.9982 12.7723 20.9384 12.3333 19.8333 12.3333H8.16667C7.0616 12.3333 6.00179 12.7723 5.22039 13.5537C4.43899 14.3351 4 15.3949 4 16.5V21.5C4 22.6051 4.43899 23.6649 5.22039 24.4463C6.00179 25.2277 7.0616 25.6667 8.16667 25.6667ZM5.66667 16.5C5.66667 15.837 5.93006 15.2011 6.3989 14.7322C6.86774 14.2634 7.50363 14 8.16667 14H19.8333C20.4964 14 21.1323 14.2634 21.6011 14.7322C22.0699 15.2011 22.3333 15.837 22.3333 16.5V21.5C22.3333 22.163 22.0699 22.7989 21.6011 23.2678C21.1323 23.7366 20.4964 24 19.8333 24H8.16667C7.50363 24 6.86774 23.7366 6.3989 23.2678C5.93006 22.7989 5.66667 22.163 5.66667 21.5V16.5Z" fill="#FCFCFC"/>
                                                        <path d="M14.0002 22.3333C14.6595 22.3333 15.3039 22.1378 15.8521 21.7716C16.4002 21.4053 16.8275 20.8847 17.0798 20.2756C17.3321 19.6665 17.3981 18.9963 17.2695 18.3497C17.1409 17.7031 16.8234 17.1091 16.3572 16.643C15.891 16.1768 15.2971 15.8593 14.6505 15.7307C14.0039 15.6021 13.3337 15.6681 12.7246 15.9204C12.1155 16.1727 11.5949 16.5999 11.2286 17.1481C10.8623 17.6963 10.6669 18.3407 10.6669 19C10.6669 19.884 11.018 20.7319 11.6432 21.357C12.2683 21.9821 13.1161 22.3333 14.0002 22.3333ZM14.0002 17.3333C14.3298 17.3333 14.6521 17.4311 14.9261 17.6142C15.2002 17.7973 15.4138 18.0576 15.54 18.3622C15.6661 18.6667 15.6991 19.0018 15.6348 19.3251C15.5705 19.6484 15.4118 19.9454 15.1787 20.1785C14.9456 20.4116 14.6486 20.5703 14.3253 20.6346C14.002 20.6989 13.6669 20.6659 13.3624 20.5398C13.0578 20.4136 12.7975 20.2 12.6144 19.9259C12.4313 19.6519 12.3335 19.3296 12.3335 19C12.3335 18.558 12.5091 18.134 12.8217 17.8215C13.1342 17.5089 13.5582 17.3333 14.0002 17.3333ZM14.0002 2.33333C13.7792 2.33333 13.5672 2.42113 13.4109 2.57741C13.2546 2.73369 13.1669 2.94565 13.1669 3.16666V7.825L11.0502 5.70833C10.8908 5.57181 10.6857 5.50047 10.476 5.50857C10.2662 5.51667 10.0673 5.60361 9.91888 5.75203C9.77047 5.90044 9.68353 6.09939 9.67543 6.30912C9.66733 6.51885 9.73866 6.72391 9.87519 6.88333L13.4085 10.425C13.4853 10.5 13.5759 10.5594 13.6752 10.6C13.778 10.6435 13.8885 10.666 14.0002 10.666C14.1118 10.666 14.2224 10.6435 14.3252 10.6C14.4245 10.5594 14.5151 10.5 14.5919 10.425L18.1669 6.88333C18.3034 6.72391 18.3747 6.51885 18.3666 6.30912C18.3585 6.09939 18.2716 5.90044 18.1232 5.75203C17.9747 5.60361 17.7758 5.51667 17.5661 5.50857C17.3563 5.50047 17.1513 5.57181 16.9919 5.70833L14.8335 7.825V3.16666C14.8335 2.94565 14.7457 2.73369 14.5894 2.57741C14.4332 2.42113 14.2212 2.33333 14.0002 2.33333V2.33333Z" fill="#FCFCFC"/>
                                                    </svg>
                                                </div>
                                                <div className="balance_info">
                                                    <span className="text-success">Income</span>
                                                    <h4>$23,741.00</h4>
                                                </div>
                                            </div>
                                            <div className="balance_data">
                                                <div className="balance-icon outcome">
                                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.16667 25.6667H19.8333C20.9384 25.6667 21.9982 25.2277 22.7796 24.4463C23.561 23.6649 24 22.6051 24 21.5V16.5C24 15.3949 23.561 14.3351 22.7796 13.5537C21.9982 12.7723 20.9384 12.3333 19.8333 12.3333H8.16667C7.0616 12.3333 6.00179 12.7723 5.22039 13.5537C4.43899 14.3351 4 15.3949 4 16.5V21.5C4 22.6051 4.43899 23.6649 5.22039 24.4463C6.00179 25.2277 7.0616 25.6667 8.16667 25.6667ZM5.66667 16.5C5.66667 15.837 5.93006 15.2011 6.3989 14.7322C6.86774 14.2634 7.50363 14 8.16667 14H19.8333C20.4964 14 21.1323 14.2634 21.6011 14.7322C22.0699 15.2011 22.3333 15.837 22.3333 16.5V21.5C22.3333 22.163 22.0699 22.7989 21.6011 23.2678C21.1323 23.7366 20.4964 24 19.8333 24H8.16667C7.50363 24 6.86774 23.7366 6.3989 23.2678C5.93006 22.7989 5.66667 22.163 5.66667 21.5V16.5Z" fill="#FCFCFC"/>
                                                        <path d="M14.0002 22.3333C14.6595 22.3333 15.3039 22.1378 15.8521 21.7716C16.4002 21.4053 16.8275 20.8847 17.0798 20.2756C17.3321 19.6665 17.3981 18.9963 17.2695 18.3497C17.1409 17.7031 16.8234 17.1091 16.3572 16.643C15.891 16.1768 15.2971 15.8593 14.6505 15.7307C14.0039 15.6021 13.3337 15.6681 12.7246 15.9204C12.1155 16.1727 11.5949 16.5999 11.2286 17.1481C10.8623 17.6963 10.6669 18.3407 10.6669 19C10.6669 19.884 11.018 20.7319 11.6432 21.357C12.2683 21.9821 13.1161 22.3333 14.0002 22.3333ZM14.0002 17.3333C14.3298 17.3333 14.6521 17.4311 14.9261 17.6142C15.2002 17.7973 15.4138 18.0576 15.54 18.3622C15.6661 18.6667 15.6991 19.0018 15.6348 19.3251C15.5705 19.6484 15.4118 19.9454 15.1787 20.1785C14.9456 20.4116 14.6486 20.5703 14.3253 20.6346C14.002 20.6989 13.6669 20.6659 13.3624 20.5398C13.0578 20.4136 12.7975 20.2 12.6144 19.9259C12.4313 19.6519 12.3335 19.3296 12.3335 19C12.3335 18.558 12.5091 18.134 12.8217 17.8215C13.1342 17.5089 13.5582 17.3333 14.0002 17.3333ZM14.0002 2.33333C13.7792 2.33333 13.5672 2.42113 13.4109 2.57741C13.2546 2.73369 13.1669 2.94565 13.1669 3.16666V7.825L11.0502 5.70833C10.8908 5.57181 10.6857 5.50047 10.476 5.50857C10.2662 5.51667 10.0673 5.60361 9.91888 5.75203C9.77047 5.90044 9.68353 6.09939 9.67543 6.30912C9.66733 6.51885 9.73866 6.72391 9.87519 6.88333L13.4085 10.425C13.4853 10.5 13.5759 10.5594 13.6752 10.6C13.778 10.6435 13.8885 10.666 14.0002 10.666C14.1118 10.666 14.2224 10.6435 14.3252 10.6C14.4245 10.5594 14.5151 10.5 14.5919 10.425L18.1669 6.88333C18.3034 6.72391 18.3747 6.51885 18.3666 6.30912C18.3585 6.09939 18.2716 5.90044 18.1232 5.75203C17.9747 5.60361 17.7758 5.51667 17.5661 5.50857C17.3563 5.50047 17.1513 5.57181 16.9919 5.70833L14.8335 7.825V3.16666C14.8335 2.94565 14.7457 2.73369 14.5894 2.57741C14.4332 2.42113 14.2212 2.33333 14.0002 2.33333V2.33333Z" fill="#FCFCFC"/>
                                                    </svg>
                                                </div>
                                                <div className="balance_info">
                                                    <span className="text-danger">Outcome</span>
                                                    <h4>$23,741.00</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-sm-8">
                                            <BalanceBarChart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card lastest_trans">
                                <div className="card-header border-0 flex-wrap pb-0">
                                    <div>
                                        <h2 className="heading">Lastest Transaction</h2>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <Dropdown className="me-2 drop-select">
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
                                <div className="card-body p-0">
                                    {/* <!-- --list- --> */}
                                    <div className="table-responsive">
                                        <table className="table shadow-hover trans-table border-no tbl-btn short-one">
                                            <tbody>
                                                {TransactionData.map((data, index)=>(
                                                    <tr className="trans-td-list" key={index}>
                                                        <td>
                                                            <div className="trans-list">
                                                                <div className="profile-img">
                                                                    <img src={data.image} alt="" />
                                                                </div>
                                                                <div className="user-info">
                                                                    <h4>{data.title}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="doller"> $ 650,036.34</span>
                                                        </td>
                                                        <td>
                                                            <span className="date">March 25, 2022</span>
                                                        </td>
                                                        <td className="pe-3">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <div className="print">
                                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M19.1667 15.8333H15.775C15.554 15.8333 15.342 15.7455 15.1857 15.5892C15.0295 15.433 14.9417 15.221 14.9417 15V12.5H5V15C5 15.221 4.9122 15.433 4.75592 15.5892C4.59964 15.7455 4.38768 15.8333 4.16667 15.8333H0.833333C0.61232 15.8333 0.400358 15.7455 0.244078 15.5892C0.0877974 15.433 0 15.221 0 15V6.66666C0 6.00362 0.263392 5.36773 0.732233 4.89889C1.20107 4.43005 1.83696 4.16666 2.5 4.16666H17.5C18.163 4.16666 18.7989 4.43005 19.2678 4.89889C19.7366 5.36773 20 6.00362 20 6.66666V15C20 15.221 19.9122 15.433 19.7559 15.5892C19.5996 15.7455 19.3877 15.8333 19.1667 15.8333ZM16.6083 14.1667H18.3333V6.66666C18.3346 6.55688 18.3138 6.44797 18.2724 6.34631C18.231 6.24465 18.1696 6.15229 18.092 6.07466C18.0144 5.99704 17.922 5.9357 17.8204 5.89426C17.7187 5.85281 17.6098 5.8321 17.5 5.83332H2.5C2.39022 5.8321 2.28131 5.85281 2.17965 5.89426C2.07799 5.9357 1.98564 5.99704 1.90801 6.07466C1.83038 6.15229 1.76904 6.24465 1.7276 6.34631C1.68615 6.44797 1.66544 6.55688 1.66667 6.66666V14.1667H3.33333V11.6667C3.33333 11.4456 3.42113 11.2337 3.57741 11.0774C3.73369 10.9211 3.94565 10.8333 4.16667 10.8333H15.775C15.996 10.8333 16.208 10.9211 16.3643 11.0774C16.5205 11.2337 16.6083 11.4456 16.6083 11.6667V14.1667Z" fill="#2A353A"/>
                                                                        <path d="M15.7772 5.83333H4.16634C3.94533 5.83333 3.73337 5.74554 3.57709 5.58926C3.42081 5.43297 3.33301 5.22101 3.33301 5V0.833333C3.33301 0.61232 3.42081 0.400358 3.57709 0.244078C3.73337 0.0877974 3.94533 0 4.16634 0L15.7772 0C15.9982 0 16.2101 0.0877974 16.3664 0.244078C16.5227 0.400358 16.6105 0.61232 16.6105 0.833333V5C16.6105 5.22101 16.5227 5.43297 16.3664 5.58926C16.2101 5.74554 15.9982 5.83333 15.7772 5.83333ZM4.99967 4.16667H14.9438V1.66667H4.99967V4.16667ZM14.1938 20H5.74967C5.10873 20 4.49405 19.7454 4.04083 19.2922C3.58762 18.839 3.33301 18.2243 3.33301 17.5833V11.6667C3.33301 11.4457 3.42081 11.2337 3.57709 11.0774C3.73337 10.9211 3.94533 10.8333 4.16634 10.8333H15.7747C15.9957 10.8333 16.2077 10.9211 16.3639 11.0774C16.5202 11.2337 16.608 11.4457 16.608 11.6667V17.5833C16.608 18.2238 16.3537 18.8382 15.9011 19.2913C15.4484 19.7444 14.8343 19.9993 14.1938 20ZM4.99967 12.5V17.5833C4.99967 17.7822 5.07869 17.973 5.21934 18.1137C5.36 18.2543 5.55076 18.3333 5.74967 18.3333H14.1938C14.3928 18.3333 14.5835 18.2543 14.7242 18.1137C14.8648 17.973 14.9438 17.7822 14.9438 17.5833V12.5H4.99967ZM16.6663 8.33333H15.833C15.612 8.33333 15.4 8.24554 15.2438 8.08926C15.0875 7.93297 14.9997 7.72101 14.9997 7.5C14.9997 7.27899 15.0875 7.06702 15.2438 6.91074C15.4 6.75446 15.612 6.66667 15.833 6.66667H16.6663C16.8874 6.66667 17.0993 6.75446 17.2556 6.91074C17.4119 7.06702 17.4997 7.27899 17.4997 7.5C17.4997 7.72101 17.4119 7.93297 17.2556 8.08926C17.0993 8.24554 16.8874 8.33333 16.6663 8.33333Z" fill=" #2A353A"/>
                                                                        <path d="M12.5003 15H7.50033C7.27931 15 7.06735 14.9122 6.91107 14.7559C6.75479 14.5997 6.66699 14.3877 6.66699 14.1667C6.66699 13.9457 6.75479 13.7337 6.91107 13.5774C7.06735 13.4211 7.27931 13.3333 7.50033 13.3333H12.5003C12.7213 13.3333 12.9333 13.4211 13.0896 13.5774C13.2459 13.7337 13.3337 13.9457 13.3337 14.1667C13.3337 14.3877 13.2459 14.5997 13.0896 14.7559C12.9333 14.9122 12.7213 15 12.5003 15ZM10.0003 17.5H7.50033C7.27931 17.5 7.06735 17.4122 6.91107 17.2559C6.75479 17.0997 6.66699 16.8877 6.66699 16.6667C6.66699 16.4457 6.75479 16.2337 6.91107 16.0774C7.06735 15.9211 7.27931 15.8333 7.50033 15.8333H10.0003C10.2213 15.8333 10.4333 15.9211 10.5896 16.0774C10.7459 16.2337 10.8337 16.4457 10.8337 16.6667C10.8337 16.8877 10.7459 17.0997 10.5896 17.2559C10.4333 17.4122 10.2213 17.5 10.0003 17.5Z" fill="#2A353A"/>
                                                                    </svg>		
                                                                </div>
                                                                <DropDownBlog />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}    
                                                
                                            </tbody>
                                        </table>	
                                    </div>
                                </div>
                                <div className="table-pagenation ">
                                    <p>Showing <span>5-10</span>from <span>20</span>data</p>
                                    <nav>
                                        <ul className="pagination pagination-gutter pagination-primary no-bg">
                                            <li className="page-item page-indicator">
                                                <Link to={"#"} className="page-link">
                                                    <i className="fa-solid fa-angle-left"></i>
                                                </Link>
                                            </li>
                                            <li className="page-item "><Link to={"#"} className="page-link">1</Link>
                                            </li>
                                            <li className="page-item active"><Link to={"#"} className="page-link">2</Link></li>
                                            <li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
                                            <li className="page-item page-indicator">
                                                <Link to={"#"} className="page-link">
                                                    <i className="fa-solid fa-angle-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
							
							{/* <!-- ----/column---- --> */}
                        </div>
                        {/* <!-- /Row --> */}
                    </div>


                    
                </div>
                <div className="col-xl-6">
                        <div className="row">
                            {/* <!-- ----column---- --> */}
                            <div className="col-md-6 col-xl-6 col-xxl-12" >
                                <div className="card quick_payment">
                                    <div className="card-header border-0 pb-0">
                                        <h2 className="heading">Quick Payment</h2>
                                    </div>
                                    <div className="card-body p-0">
                                        {infoblog.map((item, ind)=>(
                                            <div className="quick-info" key={ind}>
                                                <div className="quick-content">
                                                    <span className="quick_img">
                                                        <img src={quick1} alt="" />
                                                    </span>
                                                    <div className="user-name">
                                                        <span>{item.title}</span>
                                                        <h6>$ {item.price}</h6>                                                    
                                                    </div>
                                                </div>
                                                <div className="count">
                                                    <span>09/09/2022</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="card-footer border-0">
                                        <Link to={"#"} className="btn btn-primary w-100 mb-3">New Transfer</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- ----/column---- -->
                            <!-- ----column---- --> */}
                            <div className="col-md-6 col-xl-6 col-xxl-12">
                                <div className="row">
                                        {/* <!-- ----column---- --> */}
                                    <div className="col-xl-12">
                                        <div className="card prim-card">
                                            <div className="card-body py-3">
                                                <h4 className="number">1234 5678 9012 3456</h4>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="prim-info">
                                                        <span>Card Holder</span>
                                                        <h4>Nella Vita</h4>
                                                    </div>
                                                    <div className="master-card">
                                                        <svg width="55" height="35" viewBox="0 0 55 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle opacity="0.5" cx="17.5" cy="17.5" r="17.5" fill="#FCFCFC"/>
                                                            <circle opacity="0.5" cx="37.5" cy="17.5" r="17.5" fill="#FCFCFC"/>
                                                        </svg>	
                                                        <span className="text-white d-block mt-1">Master Card</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- ----/column---- -->
                                    <!-- ----column---- --> */}
                                    <div className="col-xl-12">
                                        <div className="card recent-activity">
                                            <div className="card-header pb-0 border-0">
                                                <h2 className="heading mb-0">Recent Activity</h2>
                                            </div>
                                            <div className="card-body p-0 pb-3">                                                    
                                                <div className="recent-info">
                                                    <div className="recent-content">
                                                        <span className="recent_icon">
                                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14.0038 25.4285C11.7434 25.4285 9.53382 24.7582 7.6544 23.5024C5.77498 22.2466 4.31015 20.4617 3.44515 18.3734C2.58015 16.2851 2.35382 13.9872 2.7948 11.7703C3.23577 9.55337 4.32424 7.51699 5.92255 5.91868C7.52087 4.32036 9.55724 3.2319 11.7742 2.79092C13.9911 2.34995 16.289 2.57627 18.3773 3.44127C20.4656 4.30627 22.2505 5.7711 23.5063 7.65052C24.7621 9.52994 25.4323 11.7395 25.4323 13.9999C25.429 17.0299 24.2239 19.9349 22.0813 22.0774C19.9388 24.22 17.0338 25.4251 14.0038 25.4285ZM14.0038 4.85704C12.1955 4.85704 10.4278 5.39326 8.92427 6.39789C7.42074 7.40252 6.24887 8.83044 5.55687 10.5011C4.86487 12.1717 4.68381 14.01 5.03659 15.7836C5.38937 17.5571 6.26014 19.1862 7.5388 20.4649C8.81745 21.7435 10.4465 22.6143 12.2201 22.9671C13.9936 23.3199 15.832 23.1388 17.5026 22.4468C19.1732 21.7548 20.6011 20.5829 21.6058 19.0794C22.6104 17.5759 23.1466 15.8082 23.1466 13.9999C23.1439 11.5759 22.1798 9.25196 20.4657 7.53793C18.7517 5.8239 16.4278 4.85976 14.0038 4.85704Z" fill="#FCFCFC"/>
                                                                <path d="M15.1466 18.5714H11.7181C11.4149 18.5714 11.1243 18.451 10.9099 18.2367C10.6956 18.0224 10.5752 17.7317 10.5752 17.4286C10.5752 17.1255 10.6956 16.8348 10.9099 16.6204C11.1243 16.4061 11.4149 16.2857 11.7181 16.2857H15.1466V15.1428H12.8609C12.2547 15.1428 11.6733 14.902 11.2447 14.4734C10.816 14.0447 10.5752 13.4633 10.5752 12.8571V11.7143C10.5752 11.1081 10.816 10.5267 11.2447 10.098C11.6733 9.66937 12.2547 9.42856 12.8609 9.42856H16.2895C16.5926 9.42856 16.8833 9.54897 17.0976 9.76329C17.3119 9.97762 17.4323 10.2683 17.4323 10.5714C17.4323 10.8745 17.3119 11.1652 17.0976 11.3795C16.8833 11.5939 16.5926 11.7143 16.2895 11.7143H12.8609V12.8571H15.1466C15.7528 12.8571 16.3342 13.0979 16.7629 13.5266C17.1915 13.9553 17.4323 14.5366 17.4323 15.1428V16.2857C17.4323 16.8919 17.1915 17.4733 16.7629 17.9019C16.3342 18.3306 15.7528 18.5714 15.1466 18.5714Z" fill="#FCFCFC"/>
                                                                <path d="M14.0032 11.7142C13.7001 11.7142 13.4094 11.5937 13.1951 11.3794C12.9808 11.1651 12.8604 10.8744 12.8604 10.5713V9.42844C12.8604 9.12534 12.9808 8.83465 13.1951 8.62032C13.4094 8.40599 13.7001 8.28558 14.0032 8.28558C14.3063 8.28558 14.597 8.40599 14.8113 8.62032C15.0257 8.83465 15.1461 9.12534 15.1461 9.42844V10.5713C15.1461 10.8744 15.0257 11.1651 14.8113 11.3794C14.597 11.5937 14.3063 11.7142 14.0032 11.7142ZM14.0032 19.7142C13.7001 19.7142 13.4094 19.5937 13.1951 19.3794C12.9808 19.1651 12.8604 18.8744 12.8604 18.5713V17.4284C12.8604 17.1253 12.9808 16.8346 13.1951 16.6203C13.4094 16.406 13.7001 16.2856 14.0032 16.2856C14.3063 16.2856 14.597 16.406 14.8113 16.6203C15.0257 16.8346 15.1461 17.1253 15.1461 17.4284V18.5713C15.1461 18.8744 15.0257 19.1651 14.8113 19.3794C14.597 19.5937 14.3063 19.7142 14.0032 19.7142Z" fill="#FCFCFC"/>
                                                            </svg>
                                                        </span>
                                                        <div className="user-name">
                                                            <h6>Payment </h6>
                                                            <span>2 March 2022, 13:45 PM</span>
                                                        </div>
                                                    </div>
                                                    <div className="count">
                                                        <span>+$2000</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="recent-info">
                                                    <div className="recent-content">
                                                        <span className="recent_icon">
                                                            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M20.0038 0.857117H4.00377C3.09445 0.857117 2.22238 1.21834 1.5794 1.86132C0.936419 2.5043 0.575195 3.37637 0.575195 4.28569V15.7143C0.575195 16.6236 0.936419 17.4956 1.5794 18.1386C2.22238 18.7816 3.09445 19.1428 4.00377 19.1428H20.0038C20.9131 19.1428 21.7852 18.7816 22.4281 18.1386C23.0711 17.4956 23.4323 16.6236 23.4323 15.7143V4.28569C23.4323 3.37637 23.0711 2.5043 22.4281 1.86132C21.7852 1.21834 20.9131 0.857117 20.0038 0.857117ZM2.86091 4.28569C2.86091 3.98258 2.98132 3.69189 3.19565 3.47757C3.40997 3.26324 3.70066 3.14283 4.00377 3.14283H20.0038C20.3069 3.14283 20.5976 3.26324 20.8119 3.47757C21.0262 3.69189 21.1466 3.98258 21.1466 4.28569V5.42854H2.86091V4.28569ZM21.1466 15.7143C21.1466 16.0174 21.0262 16.3081 20.8119 16.5224C20.5976 16.7367 20.3069 16.8571 20.0038 16.8571H4.00377C3.70066 16.8571 3.40997 16.7367 3.19565 16.5224C2.98132 16.3081 2.86091 16.0174 2.86091 15.7143V7.71426H21.1466V15.7143Z" fill="#FCFCFC"/>
                                                                <path d="M5.14676 11.1429H7.43248C7.73558 11.1429 8.02627 11.0225 8.2406 10.8081C8.45493 10.5938 8.57533 10.3031 8.57533 10C8.57533 9.6969 8.45493 9.40621 8.2406 9.19188C8.02627 8.97756 7.73558 8.85715 7.43248 8.85715H5.14676C4.84366 8.85715 4.55297 8.97756 4.33864 9.19188C4.12431 9.40621 4.00391 9.6969 4.00391 10C4.00391 10.3031 4.12431 10.5938 4.33864 10.8081C4.55297 11.0225 4.84366 11.1429 5.14676 11.1429Z" fill="#FCFCFC"/>
                                                            </svg>
                                                        </span>
                                                        <div className="user-name">
                                                            <h6>Subcription</h6>
                                                            <span>2 March 2022, 13:45 PM</span>
                                                        </div>
                                                    </div>
                                                    <div className="count">
                                                        <span>-$120</span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- ----/column---- --> */}
                                </div>
                            </div>


                            <div className="col-xl-12">
                                <div className="card crypto-chart ">
                                    <div className="card-header pb-0 border-0 flex-wrap">
                                        <div>
                                            <div className="chart-title mb-3">
                                                <h2 className="heading">Project Statistic</h2>	
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <div className="round" id="dzNewSeries">
                                                    <div>
                                                        <input type="checkbox" id="checkbox" name="radio" value="monthly" />
                                                        <label htmlFor="checkbox" className="checkmark"></label>
                                                    </div>
                                                    <div>
                                                        <span className="fs-14">This Week</span>
                                                        <h4 className="fs-5 font-w600 mb-0">1.982</h4>
                                                    </div>	
                                                </div>
                                                <div className="round weekly" id="dzOldSeries">
                                                    <div>
                                                        <input type="checkbox" id="checkbox1" name="radio" value="weekly" />
                                                        <label htmlFor="checkbox1" className="checkmark"></label>
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
                                                <div className="progress mt-3">
                                                    <div className="progress-bar bg-primary" style={{width: "30%", height:"100%"}} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-body pt-2 custome-tooltip pb-3">
                                        <ProjectAreaChart />
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
            </div>       
        </>
    )
}
export default Banking;