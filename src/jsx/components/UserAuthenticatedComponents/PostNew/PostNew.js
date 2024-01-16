import React, { Fragment, useState, useEffect } from "react";
import { ButtonGroup, Dropdown, SplitButton, Toast } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
// import PageTItle from "../../../layouts/PageTitle";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../services/AxiosConfig";
import { getUserDetails } from "../../../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "./post-new.css"
import { isInvalidContent, isInvalidTittle } from "../../../../services/ValidateInput";

const PostNew = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [titleError, setTitleError] = useState(false);
    // console.log(userDetails)
    const [userDetails, setUserDetails] = useState('')
    const [message, setMessage] = useState({})

    //toast 
    const notifySusscess = (message, timeClose) => {
		toast.success(`✔️ ${message} !`, {
			position: "top-center",
			autoClose: timeClose,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};
    useEffect(() => {
        const getUserDetailsData = async () => {
            try {
                let respone = await getUserDetails();
                setUserDetails(respone.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserDetailsData()
    }, [])

    const checkInput = (input) => {
        let message = {}
        if (isInvalidTittle(input.title)) {
            message = { ...message, titleError: isInvalidTittle(input.title) }
        }
        if (isInvalidContent(input.content)) {
            message = { ...message, contentError: isInvalidContent(input.content) }
        }
        return message
    }

    const handleSubmitPost = (title, content) => {
        // if (userDetails === null || userDetails === undefined) {
        //     navigate("/Login");
        //     return;
        // }
        const data = {
            userId: userDetails.userId,
            title: title,
            content: content,
            fullName: userDetails.fullName
        }
        let message = checkInput(data)
        if (JSON.stringify(message) === "{}") {
            axiosInstance.post('/api/ForumPosts', data)
                .then(() => {
                    setTitle('')
                    setContent('')
                    setMessage(message)
                    notifySusscess('Post successfully',3000)
                }).catch(error => console.log(error))
        } else {
            setMessage(message)
        }
        console.log("message", message)
        // console.log(data)

    }

    const columContent = () => {
        let result;
        if (window.innerHeight >= 900) {
            result = 24
        } else if (window.innerHeight >= 750 && window.innerHeight < 900) {
            result = 19
        } else {
            result = 12
        }
        return result
    }

    return (
        <Fragment>
            <div className="row">
                <div className="card">
                    <div className="post-new-title">
                        <h4>Title</h4>
                        <div className="basic-form">
                           
                                <div className="form-group mb-3">
                                    {title.length >= 0 &&
                                        <input
                                            type="text"
                                            className="form-control input-default "
                                            placeholder="Input your Title"
                                            onChange={(e) => { setTitle(e.target.value) }}
                                            value={title}
                                        />}
                                </div>
                                {message.titleError && <p style={{ color: 'red' }}>{message.titleError}</p>}

                           
                        </div>
                    </div>

                    <div className="post-new-content">
                        <h4 >Content</h4>
                        <textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="form-control post-new-content-input" id="exampleFormControlTextarea3" rows={columContent()} placeholder="Input your content" />
                        {message.contentError && <p style={{ color: 'red' }}>{message.contentError}</p>}
                        <br />
                        <div>

                            <button className="btn btn-primary"
                                onClick={
                                    () => {
                                        handleSubmitPost(title, content)
                                    }
                                }>Post</button>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}
export default PostNew;