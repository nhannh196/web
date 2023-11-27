import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

//comp
//import Nav from '../../layouts/nav';
import DropDownBlog from '../Dashboard/DropDownBlog';

//images
import profile11 from './../../../images/profile/11.jpg';
import profile13 from './../../../images/profile/13.jpg';
import profile15 from './../../../images/profile/15.jpg';
import profile16 from './../../../images/profile/16.jpg';
import profile17 from './../../../images/profile/17.jpg';
import profile18 from './../../../images/profile/18.jpg';
import profile19 from './../../../images/profile/19.jpg';
import profile21 from './../../../images/profile/21.jpg';
import profile22 from './../../../images/profile/22.jpg';
import profile23 from './../../../images/profile/23.jpg';
import profile24 from './../../../images/profile/24.jpg';
import profile25 from './../../../images/profile/25.jpg';

function Dzmedia({image}) {
    return(
        <>
            <div className="dz-media">
                <img src={image} alt="" />
            </div>
        </>
    )
}


const Activity = () => {
    const [selectBtn, setSelectBtn] = useState("Recently");
    return(
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="page-titles acti-space">
                        <h2 className="heading sm-mb-0 mb-2">Activity</h2>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="me-2">
                                <button type="button" className="btn light btn-primary btn-sm mx-1">Activity</button>
                                <button type="button" className="btn light btn-primary btn-sm mx-1">Notifications</button>
                            </div>
                            
                            <Dropdown className="me-2 drop-select">
                                <Dropdown.Toggle as="div" className="i-false drop-select-btn">{selectBtn} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>setSelectBtn("Recently")}>Recently</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>setSelectBtn("This Weeks")}>This Weeks</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>setSelectBtn("Today")}>Today</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <DropDownBlog />
                        </div>
                    </div>
                </div>  
                <div className="col-xl-12">
                    <div >
                        <div className="card activity">
                            <div className="card-body pt-0">
                                <div id="DZ_W_TimeLine11" className="widget-timeline style-3 ">
                                    <h4 className="mt-3">Today</h4>
                                    <ul className="timeline-active">
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <Dzmedia image={profile11} />
                                            <div className="panel">
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <h4><strong>Karen Hope</strong> has created new task at <strong>Frize</strong> <strong className="text-primary">Projects</strong> </h4>
                                                </Link>
                                                <div className="modulel flex-wrap">
                                                    <Dzmedia image={profile15} />
                                                    <Dzmedia image={profile16} />
                                                </div>
                                            </div>
                                            <span className="time">Monday, June 31 2022</span>	
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <Dzmedia image={profile17} />
                                            <div className="panel">
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <h4><strong className="text-pink">[REMINDER] </strong> Due date of <strong className="text-pink">Erempe Studios Projects</strong> task will be coming</h4>
                                                </Link>
                                            </div>	
                                            <span className="time">Monday, June 31 2022</span>
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <Dzmedia image={profile18} />
                                            <div className="panel">
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <h4 ><strong>Tony Soap </strong> commented at <strong className="text-primary"> Frize Projects </strong></h4>
                                                </Link>
                                                
                                            </div>
                                            <span className="time">Monday, June 31 2022</span>	
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <Dzmedia image={profile19} />
                                            <div className="panel">
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <h4 ><strong>Samantha William </strong> add 4 files on  Frize <strong className="text-danger">Projects </strong></h4>
                                                </Link>
                                                <div className="modulel flex-wrap">
                                                    <Dzmedia image={profile21} />
                                                    <Dzmedia image={profile22} />
                                                    <Dzmedia image={profile23} />
                                                    <Dzmedia image={profile24} />
                                                </div>
                                            </div>
                                            <span className="time">Monday, June 31 2022</span>	
                                        </li>
                                    </ul>
                                    <h4 className="mt-3">Yesterday</h4>
                                    <ul className="timeline-active">
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <Dzmedia image={profile25} />
                                            <div className="panel">
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <h4 ><strong>Johnny Ahmad </strong>  mentioned you at <strong className="text-primary"> Web Design Projects</strong></h4>
                                                </Link>
                                            </div>
                                            <span className="time">Monday, June 31 2022</span>	
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <Dzmedia image={profile13} />
                                            <div className="panel">
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <h4><strong>Nadila Adja  </strong> mentioned you at <strong className="text-pink"> Projects</strong> </h4>
                                                </Link>
                                            </div>
                                            <span className="time">Monday, June 31 2022</span>	
                                        </li>
                                    </ul>
                                    <div className="loadmore-btn">
                                        <button className="btn btn-primary">Load More</button>
                                    </div>
                                </div>	
                            </div>
                        </div>	
                    </div>
                    
                </div>

            </div>    

        </>

    )
}
export default Activity;