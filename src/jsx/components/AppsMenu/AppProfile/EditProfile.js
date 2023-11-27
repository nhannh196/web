import React,{useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import user from './../../../../images/user.jpg';

const inputBlog = [
    { label:'Name', value:'John' },
    { label:'Surname', value:'Brahim' },
    { label:'Specialty', value:'Developer' },
    { label:'Skills', value:'HTML,  JavaScript,  PHP' },
];

const EditProfile = () => {
   // const [selectOption , setSelectOption] = useState('Gender');
    return(
        <>
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="clearfix">
                        <div className="card card-bx profile-card author-profile m-b30">
                            <div className="card-body">
                                <div className="p-5">
                                    <div className="author-profile">
                                        <div className="author-media">
                                            <img src={user} alt="" />
                                            <div className="upload-link" title="" data-toggle="tooltip" data-placement="right" data-original-title="update">
                                                <input type="file" className="update-flie" />
                                                <i className="fa fa-camera"></i>
                                            </div>
                                        </div>
                                        <div className="author-info">
                                            <h6 className="title">Nella Vita</h6>
                                            <span>Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-list">
                                    <ul>
                                        <li><a href="app-profile.html">Models</a><span>36</span></li>
                                        <li><a href="uc-lightgallery.html">Gallery</a><span>3</span></li>
                                        <li><a href="app-profile.html">Lessons</a><span>1</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="input-group mb-3">
                                    <div className="form-control rounded text-center bg-white">Portfolio</div>
                                </div>
                                <div className="input-group">
                                    <a href="https://www.dexignlab.com/" className="form-control text-primary rounded text-start bg-white">https://www.dexignlab.com/</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                    <div className="card profile-card card-bx m-b30">
                        <div className="card-header">
                            <h6 className="title">Account setup</h6>
                        </div>
                        <form className="profile-form">
                            <div className="card-body">
                                <div className="row">
                                    { inputBlog.map((item, ind)=>(
                                        <div className="col-sm-6 m-b30" key={ind}>
                                            <label className="form-label">{item.label}</label>
                                            <input type="text" className="form-control" defaultValue={item.value}  />
                                        </div>
                                    ))}
                                   
                                    <div className="col-sm-6 m-b30">                                        
                                        <label className="form-label">Gender</label>
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                        {/* <Dropdown className="profile-btn">
                                            <Dropdown.Toggle as="div" className="i-false profile-btn-toggle">{selectOption} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
                                            <Dropdown.Menu> 
                                                <Dropdown.Item onClick={()=>setSelectOption("Male")}>Male</Dropdown.Item>
                                                <Dropdown.Item onClick={()=>setSelectOption("Female")}>Female</Dropdown.Item>
                                                <Dropdown.Item onClick={()=>setSelectOption("Other")}>Other</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                          
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Birth</label>
                                        <input type="text" className="form-control" placeholder="dd. mm .yyyy" />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className="form-control" defaultValue="+123456789" />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Email address</label>
                                        <input type="text" className="form-control" defaultValue="demo@gmail.com" />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Country</label>
                                        
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Russia</option>
                                            <option>Canada</option>
                                            <option>China</option>
                                            <option>India</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">City</label>
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Krasnodar</option>
                                            <option>Tyumen</option>
                                            <option>Chelyabinsk</option>
                                            <option>Moscow</option>
                                        </select>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">UPDATE</button>
                                <Link to={"#"} className="btn-link">Forgot your password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProfile;
