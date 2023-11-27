import React, { Fragment, useState } from "react";
import { ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
// import PageTItle from "../../../layouts/PageTitle";
import CkEditorBlog from "../../Forms/CkEditor/CkEditorBlog";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PostNew = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [titleError, setTitleError] = useState(false);

    const handleSubmitPost = (userId, title, content) => {
        if (userDetails === null || userDetails === undefined) {
            navigate("/Login");
            return;
        }
        if (title.trim().length === 0 || content.trim().length === 0) {
            setTitleError(true)
            return;
        }
        try {
            const data = {
                userId: userId,
                title: title,
                content: content,
            }
            console.log(data);
            const response = axios.post('https://localhost:7053/api/ForumPosts', data)
            setTitle('')
            setContent('')
            setTitleError(false)
        }
        catch (e) {

        }
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
                                    handleSubmitPost(userDetails.id, title, content)
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