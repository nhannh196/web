import React, { useState } from 'react'
import { Nav,Tab, ProgressBar, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import copy from "copy-to-clipboard";
import ModalVideo from 'react-modal-video'
import 'react-modal-video/scss/modal-video.scss';

import course7 from './../../../images/course/7.jpg';
import course8 from './../../../images/course/8.jpg';
import course10 from './../../../images/course/10.jpg';
import course12 from './../../../images/course/12.jpg';
import course13 from './../../../images/course/13.jpg';
import course14 from './../../../images/course/14.jpg';

const courseBlog = [
    { image:course12, title:'Trending Course' },
    { image:course13, title:'Currency Foundation' },
    { image:course14, title:'Trending Course' },
];

const commentblog = [
    { image: course8, name:'Karen Hope', },
    { image: course10, name:'John Tegar', },
];

function CourseDetails() {
    const [socialModal, setSocialModal] = useState();
    const [isOpen, setOpen] = useState(false);
    let copyText = 'https://finlab.dexignlab.com/react'; 
    const copyToClipboard = () => {
        copy(copyText);
        alert(`You have copied ${copyText}`);
    }
    return (
        <>
            <div className="row">
                <div className="col-xl-9 col-xxl-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="course-content d-flex justify-content-between flex-wrap">
                                <div>
                                    <h3>Bitcoin and Cryptocurrencies Technologies</h3>
                                    <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                        <li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i></li>
                                        <li>Review (1k)</li>
                                        <li>10k Students</li>
                                    </ul>
                                </div>
                                <div className="mt-2">
                                    <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.5 3.35248H18.3825V2.625C18.3825 2.00999 17.88 1.5 17.2575 1.5C16.635 1.5 16.1325 2.00999 16.1325 2.625V3.35248H13.125V2.625C13.125 2.00999 12.6225 1.5 12 1.5C11.3775 1.5 10.875 2.00999 10.875 2.625V3.35248H7.86749V2.625C7.86749 2.00999 7.36501 1.5 6.74249 1.5C6.11998 1.5 5.61749 2.00999 5.61749 2.625V3.35248H4.5C2.22748 3.35248 0.375 5.19749 0.375 7.47748V18.375C0.375 20.6475 2.22748 22.5 4.5 22.5H19.5C21.7725 22.5 23.625 20.6475 23.625 18.375V7.47748C23.625 5.19749 21.7725 3.35248 19.5 3.35248ZM21.375 8.715H2.625V7.47748C2.625 6.44248 3.465 5.60248 4.5 5.60248H5.61749V6.285C5.61749 6.90747 6.11998 7.41 6.74249 7.41C7.36501 7.41 7.86749 6.90747 7.86749 6.285V5.60248H10.875V6.285C10.875 6.90747 11.3775 7.41 12 7.41C12.6225 7.41 13.125 6.90747 13.125 6.285V5.60248H16.1325V6.285C16.1325 6.90747 16.635 7.41 17.2575 7.41C17.88 7.41 18.3825 6.90747 18.3825 6.285V5.60248H19.5C20.535 5.60248 21.375 6.44248 21.375 7.47748V8.715Z" fill="#c7c7c7"/>
                                    </svg>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0005 5.25H6.00049C5.6028 5.25045 5.22154 5.40864 4.94033 5.68984C4.65912 5.97105 4.50094 6.35231 4.50049 6.75V21C4.50049 21.1378 4.53846 21.2729 4.61023 21.3906C4.682 21.5082 4.7848 21.6038 4.90733 21.6669C5.02986 21.7299 5.1674 21.758 5.30485 21.748C5.44229 21.738 5.57433 21.6904 5.68646 21.6103L10.4998 18.1717L15.3146 21.6103C15.4267 21.6904 15.5588 21.7381 15.6962 21.748C15.8336 21.758 15.9712 21.7299 16.0937 21.6669C16.2162 21.6038 16.319 21.5082 16.3908 21.3906C16.4625 21.2729 16.5005 21.1378 16.5005 21V6.75C16.5 6.35231 16.3419 5.97105 16.0606 5.68984C15.7794 5.40864 15.3982 5.25045 15.0005 5.25Z" fill="#c7c7c7"/>
                                        <path d="M18.0005 2.25H8.25049C8.05158 2.25 7.86081 2.32902 7.72016 2.46967C7.57951 2.61032 7.50049 2.80109 7.50049 3C7.50049 3.19891 7.57951 3.38968 7.72016 3.53033C7.86081 3.67098 8.05158 3.75 8.25049 3.75H18.0005V18C18.0005 18.1989 18.0795 18.3897 18.2202 18.5303C18.3608 18.671 18.5516 18.75 18.7505 18.75C18.9494 18.75 19.1402 18.671 19.2808 18.5303C19.4215 18.3897 19.5005 18.1989 19.5005 18V3.75C19.5 3.35231 19.3419 2.97105 19.0606 2.68984C18.7794 2.40864 18.3982 2.25045 18.0005 2.25Z" fill="#c7c7c7"/>
                                    </svg>
                                    <Link to={"#"} onClick={()=>setSocialModal(true)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.7001 14.1C18.5001 14 18.2001 14 18.0001 14C16.8001 14 15.7001 14.5 14.9001 15.5L9.80011 13.2C10.0001 12.5 10.0001 11.7 9.80011 10.9L14.9001 8.6C16.3001 10.3 18.8001 10.5 20.5001 9.1C22.2001 7.7 22.4001 5.2 21.0001 3.5C19.6001 1.8 17.1001 1.6 15.4001 3C14.5001 3.7 14.0001 4.8 14.0001 6C14.0001 6.2 14.0001 6.5 14.1001 6.7L8.80011 9.1C7.20011 7.6 4.70011 7.6 3.10011 9.2C1.60011 10.8 1.60011 13.3 3.20011 14.9C4.80011 16.4 7.20011 16.4 8.80011 14.9L14.1001 17.3C13.7001 19.5 15.1001 21.6 17.3001 21.9C19.5001 22.3 21.6001 20.9 21.9001 18.7C22.3001 16.5 20.9001 14.5 18.7001 14.1Z" fill="#c7c7c7"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="video-img style-1">
                                <div className="view-demo">
                                    <img src={course7} alt="" />
                                    <div className="play-button text-center">
                                        <Link to={"#"} href="https://www.youtube.com/watch?v=e6MhFghdQps" className="popup-youtube" onClick={()=>setOpen(true)}>
                                            <svg width="96" height="96" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.6154 0C7.41046 0 0 7.41043 0 16.6154V55.3846C0 64.5896 7.41046 72 16.6154 72H55.3846C64.5895 72 72 64.5896 72 55.3846V16.6154C72 7.41043 64.5895 0 55.3846 0H16.6154ZM26.259 19.3846C26.5876 19.3728 26.9098 19.4783 27.1677 19.6821L46.5523 34.9129C47.2551 35.4672 47.2551 36.5328 46.5523 37.0871C40.0921 42.1633 33.6278 47.2366 27.1677 52.3125C26.2575 53.034 24.9168 52.3814 24.9231 51.22V20.7692C24.9226 20.0233 25.5135 19.4141 26.259 19.3846Z" fill="white"/>
                                            </svg>
                                        </Link>
                                    </div>	
                                </div>	
                            </div>
                            <div className="course-details-tab style-2 mt-4">     
                                <Tab.Container defaultActiveKey={'About'}>
                                    <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                        <Nav.Link className="nav-link" eventKey="About">About</Nav.Link>
                                        <Nav.Link className="nav-link" eventKey="Reviews">Reviews</Nav.Link>
                                        <Nav.Link className="nav-link" eventKey="Discuss">Discussion</Nav.Link>
                                    </Nav>                            
                                    <Tab.Content>
                                        <Tab.Pane eventKey="About">
                                            <div className="about-content">
                                                <h4>About This Course</h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Reviews">
                                            {commentblog.map((data, ind)=>(
                                                <div className="user-pic2" key={ind}>
                                                    <div className="d-flex align-items-center">
                                                        <img src={data.image} alt="" />
                                                        <div className="ms-3">
                                                            <h4>{data.name}</h4>
                                                            <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                                                <li><span className="font-w500">5.0</span><i className="fas fa-star star-orange ms-2"></i>
                                                                    <i className="fas fa-star star-orange me-1"></i>
                                                                    <i className="fas fa-star star-orange me-1"></i>
                                                                    <i className="fas fa-star star-orange me-1"></i>
                                                                    <i className="fas fa-star star-orange"></i>
                                                                </li>
                                                                <li>1 Month Ago</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                                </div>
                                            ))}                                               
                                           
                                            <div className="comment">
                                                <h3 className="heading mt-4 mb-3">Leave Comment</h3>
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label mb-2">First Name</label>
                                                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Karen Hope" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6 ">
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleFormControlInput2" className="form-label mb-2">Email Id</label>
                                                            <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="hello@example.com" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleFormControlTextarea3" className="form-label mb-2">Messasge</label>
                                                            <textarea className="form-control" id="exampleFormControlTextarea3" rows="3" placeholder="Messasge"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-primary" type="submit">Submit A Comment</button>
                                                    </div>                                        
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Discuss">
                                            <div className="about-content">
                                                <h3 className="heading mb-3">Comments</h3>
                                                <ul>
                                                    <li className="mb-3">
                                                        <span className="d-flex">
                                                            <span className="comment-media"> 
                                                                <img src={course12} alt="" /> 
                                                            </span>
                                                            <span className="">
                                                                <h6 className="mb-1">John Doe</h6> 
                                                                <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                                <Link to={"#"} className="text-primary"><i className="fa fa-reply me-2"></i>Reply</Link>
                                                            </span>
                                                        </span>                                                    
                                                    </li>
                                                    <hr />
                                                    <li>
                                                        <span className="d-flex">
                                                            <span className="comment-media"> 
                                                                <img src={course8} alt="" /> 
                                                            </span>
                                                            <span className="">
                                                                <h6 className="mb-1">Harry Doe</h6> 
                                                                <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                                <Link to={"#"} className="text-primary"><i className="fa fa-reply me-2"></i>Reply</Link>
                                                            </span> 
                                                        </span>                                                    
                                                    </li>
                                                </ul>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>      
                <div className="col-xl-3 col-xxl-4">
                    <div className="card h-auto">
                        <div className="card-header border-0 pb-0">
                            <h4>Progress</h4>
                            
                        </div>
                        <div className="card-body pt-0">
                            <div className="progress-box">                               
                                <ProgressBar now={20} />
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0 fs-14 font-w600">Bitcoin and Cryptocurrencies Technologies</h5>
                                    <span className="font-w600">10/110</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card h-auto">
                        <div className="card-header d-block border-0">
                            <h4 className="mb-0">Most Popular this week</h4>
                            <p>Based on your preferences</p>
                        </div>
                        <div className="card-body pt-0">
                            {courseBlog.map((item, ind)=>(
                                <div className="popular-bx mb-3" key={ind}>
                                    <div className="popular-media">
                                        <img src={item.image} alt="" />
                                        <div className="video-icon">
                                            <i className="fa-solid fa-circle-play text-white"></i>
                                        </div>
                                    </div>
                                    <div className="popular-content">
                                        <h5 className="mb-2">{item.title}</h5>                                        
                                        <span>Lorem Ipsum is simply dummy text of the printing and typesetting.</span>
                                    </div>
                                </div>
                            ))}                            
                        </div>
                    </div>
                </div>   
            </div>
            <Modal  show={socialModal} onHide={setSocialModal} centered >  
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Share Modal</h1>
                        <button  className="btn-close" onClick={()=>setSocialModal(false)} ></button>
                    </div>
                    <div className="modal-body post-input mb-0	">
                        <div className="row">
                            <div className="col-xl-12 mb-4">
                                <p className="">Or this link via</p>
                                <Link to={"#"} className="btn-social facebook me-1" ><i className="fab fa-facebook-f"></i></Link>
                                <Link to={"#"} className="btn-social google-plus me-1" ><i className="fab fa-google-plus-g"></i></Link>
                                <Link to={"#"} className="btn-social linkedin me-1" ><i className="fab fa-linkedin-in"></i></Link>
                                <Link to={"#"} className="btn-social instagram me-1" ><i className="fab fa-instagram"></i></Link>
                                <Link to={"#"} className="btn-social twitter me-1" ><i className="fab fa-twitter"></i></Link>
                                <Link to={"#"} className="btn-social youtube me-1" ><i className="fab fa-youtube"></i></Link>
                                <Link to={"#"} className="btn-social whatsapp me-1" ><i className="fab fa-whatsapp"></i></Link>
                            </div>
                            <div className="col-xl-12">
                                <label className="d-block mb-3">Or Copy link via</label> 
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control m-0"                                         
                                        id="data"                                        
                                        defaultValue={copyText}                                       
                                    />
                                    <div className="input-group-prepend ms-3 c-pointer"
                                        onClick={copyToClipboard}
                                    >
                                        <span className="input-group-text" id="copy">Copy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={()=>setSocialModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>                
            </Modal>
            <ModalVideo channel='youtube' autoplay 
                isOpen={isOpen} videoId="e6MhFghdQps"
                onClose={() => setOpen(false)} 
            />
        </>
    )
}

export default CourseDetails