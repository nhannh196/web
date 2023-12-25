import React, { Fragment, useState,useEffect } from "react";
import { ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
// import PageTItle from "../../../layouts/PageTitle";
import CkEditorBlog from "../../Forms/CkEditor/CkEditorBlog";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../services/AxiosConfig";
import { getUserDetails } from "../../../../services/AuthService";

const PostNew = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [titleError, setTitleError] = useState(false);
    // console.log(userDetails)
    const [userDetails, setUserDetails] = useState('')
	useEffect( () => {
		const getUserDetailsData = async () => {
			try {
				let respone = await getUserDetails();
				setUserDetails(respone.data)
			} catch (error) {
				console.log(error)
			}
		}
		getUserDetailsData()
	},[])

    const handleSubmitPost = (title, content) => {
        if (userDetails === null || userDetails === undefined) {
            navigate("/Login");
            return;
        }
        if (title.trim().length === 0 || content.trim().length === 0) {
            setTitleError(true)
            return;
        }
        const data = {
            userId: userDetails.userId,
            title: title,
            content: content,
            fullName: userDetails.fullName
        }
        console.log(data)
        axiosInstance.post('/api/ForumPosts', data)
            .then(() => {
                setTitle('')
                setContent('')
                setTitleError(false)
                console.log("post success")
            }).catch(error => console.log(error))
    }
    return (
        <Fragment>
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Title</h4>
                        <div className="basic-form">
                            <form onSubmit={(e) => e.preventDefault()}>
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

                            </form>
                        </div>
                        {titleError && <p style={{ color: 'red' }}>Please input title</p>}
                    </div>

                    <div className="card-body">
                        <h4 >Content</h4>
                        <textarea value={content} onChange={(e) => { setContent(e.target.value) }} className="form-control" id="exampleFormControlTextarea3" rows="3" placeholder="Input your content" />
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
        </Fragment>
    )
}
export default PostNew;