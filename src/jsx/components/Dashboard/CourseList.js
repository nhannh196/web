import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import CourseSlider from './CourseSlider';
import ModalVideo from 'react-modal-video'

import bitcoin from './../../../images/svg/bitcoin.svg';
import course1 from './../../../images/course/1.jpg';
import course2 from './../../../images/course/2.jpg';
import course3 from './../../../images/course/3.jpg';
import course4 from './../../../images/course/4.jpg';
import course5 from './../../../images/course/5.jpg';
import course6 from './../../../images/course/6.jpg';
import course10 from './../../../images/course/10.jpg';
import course11 from './../../../images/course/11.jpg';

const bigCardData = [
    {id:'1', image:course1, title:'Jack and Sally', name:'Bitcoin and Cryptocurrencies Technologies'},
    {id:'2', image:course2, title:'Samantha William', name:'Introduction to Cryptocurrencies and Blockchain'},
    {id:'3', image:course3, title:'Karen Hope', name:'Blockchain – Principles and Practices'},
    {id:'4', image:course4, title:'Cahaya Hikari ', name:'Blockchain and Cryptocurrency Explained'},  
    {id:'5', image:course5, title:'Nico Kelly', name:'Trading Preparation'},
    {id:'6', image:course6, title:'Samantha John', name:'Blockchain Specialization '},
    {id:'7', image:course10, title:'Jordan Nice', name:'Candlestick Chart Patterns'},
    {id:'8', image:course11, title:'Johnny Ahmad', name:'Cryptocurrency Foundation'},
];
function CourseList() {
    const [isOpen, setOpen] = useState();    
  return (
    <>
        <div className="widget-heading d-flex justify-content-between align-items-center">
            <h3 className="m-0 heading">Popular This Week</h3>
            <Link to={"#"} className="btn btn-primary btn-sm">View all</Link>
        </div>
        <div className="row">            
           <CourseSlider />
        </div>	
        <div className="widget-heading d-flex justify-content-between align-items-center">
            <h3 className="heading mb-0">All Courses</h3>
            <Link to={"#"} className="btn btn-primary btn-sm">View all</Link>
        </div>
        <div className="row">
            {bigCardData.map((item, index)=>(
                <div className="col-xl-3 col-xxl-4 col-sm-6" key={index}>
                    <div className="card all-crs-wid">
                        <div className="card-body">
                            <div className="courses-bx">
                                <div className="dlab-media overlay-main position-relative">
                                    <img src={item.image} alt="" />
                                    <div className="overlay-bx">
                                        <div className="overlay-icon">
                                            <Link to={"#"} className="popup-youtube"
                                                onClick={()=>setOpen(true)}
                                            >
                                                <i className="fa-solid fa-video"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-100">
                                    <div className="dlab-info">
                                        <div className="dlab-title d-flex justify-content-between">
                                            <div>                                                
                                                <h4><Link to={"/course-details"}>{item.name}</Link></h4>
                                                <div className="">
                                                    <p className="m-0">{item.title}
                                                        <svg className="ms-1" width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2" cy="2.5" r="2" fill="#DBDBDB"/>
                                                        </svg>
                                                        <span>5.0<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8 0.5L9.79611 6.02786H15.6085L10.9062 9.44427L12.7023 14.9721L8 11.5557L3.29772 14.9721L5.09383 9.44427L0.391548 6.02786H6.20389L8 0.5Z" fill="#FEC64F"/>
                                                            </svg>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>	
                                        </div>
                                        <div className="d-flex justify-content-between content align-items-center">
                                            <span>
                                                <img src={bitcoin} alt="" />{" "}
                                                110+ Content
                                            </span>
                                            <Link to={"/course-details"} className="btn btn-primary btn-sm">View all</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>	
            ))}
        </div>	
        <div className="table-pagenation mb-3">
            <p className="ms-0">Showing <span>1-8</span>from <span>20</span>data</p>
            <nav>
                <ul className="pagination pagination-gutter pagination-primary no-bg">
                    <li className="page-item page-indicator">
                        <Link to={"#"} className="page-link">
                            <i className="fa-solid fa-angle-left"></i>
                        </Link>
                    </li>
                    <li className="page-item active"><Link to={"#"} className="page-link">1</Link>
                    </li>
                    <li className="page-item "><Link className="page-link" >2</Link></li>
                    <li className="page-item"><Link className="page-link" >3</Link></li>
                    <li className="page-item page-indicator me-0">
                        <Link to={"#"} className="page-link">
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <ModalVideo channel='youtube' autoplay 
            isOpen={isOpen} videoId="e6MhFghdQps"
            onClose={() => setOpen(false)} 
        />
    </>
  )
}

export default CourseList