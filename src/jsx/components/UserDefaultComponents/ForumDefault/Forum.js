import React, { useEffect, useState } from 'react'
import { Nav, Tab, ProgressBar, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'react-modal-video/scss/modal-video.scss';
import { isLogin } from '../../../../services/AuthService';

import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosInstance } from '../../../../services/AxiosConfig';
// import "../../../../css/icon-name.css"
import './forum.css'
import { getUserDetails } from '../../../../services/AuthService';
import { get } from 'lodash';

function Forum() {
    const [socialModal, setSocialModal] = useState();
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(false);
    const [listPosts, setListPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [listShowDetail, setListShowDetail] = useState([])
    const [listShowComments, setListShowComments] = useState([])
    const [commentsOfPost, setCommentsOfPost] = useState([])
    const [listPostsView, setListPostsView] = useState([])
    const [startOffset, setStartOffset] = useState(0)
    //list react
    const [listReact, setListReact] = useState([])

    //test 
    //get list react
    const getListReact = () => {
        return axiosInstance.get(`/api/Reacts/getMyId`)
    }
    //get user details
    const [userDetails, setUserDetails] = useState('')
    useEffect(() => {
        const getUserDetailsData = async () => {
            try {
                let respone = await getUserDetails();
                setUserDetails(respone.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (isLogin()) {
            getUserDetailsData()
        }
    }, [])
    //load list react
    const loadListReact = () => {
        getListReact()
            .then((response) => {
                setListReact(response.data)
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        if (isLogin()) {
            loadListReact()
        }
    }, [])
    //like
    const likeAction = (postId) => {
        const data = {
            postId: postId
        }
        return axiosInstance.post(`/api/Reacts/Like`, data)
    }
    // handle click like
    const handleLikeClick = (postId) => {
        likeAction(postId)
            .then(response => { loadListReact(); loadPosts() })
            .catch(error => console.log(error))
    }
    //dislike
    const dislikeAction = (postId) => {
        const data = {
            postId: postId
        }
        return axiosInstance.post(`/api/Reacts/Dislike`, data)
    }
    // handle click like
    const handleDislikeClick = (postId) => {
        dislikeAction(postId)
            .then(response => { loadListReact(); loadPosts() })
            .catch(error => console.log(error))
    }
    //check react
    const react = (postId) => {
        return listReact.find((r) => {
            return r.postId === postId
        })
    }


    //get all posts
    const getPostData = () => {
        return axiosInstance.get('/api/ForumPosts/GetForumPostsAccept')
    }

    const loadPosts = () => {
        getPostData()
            .then((response) => {
                setListPosts(response.data)
                setListPostsView(response.data)
            })
            .catch((error) => console.log(error))
    }


    //get all comment
    const getComment = () => {
        axiosInstance.get(`/api/Comments`)
            .then((response) => {
                setCommentsOfPost(response.data)
            })
            .catch(() => {
                setCommentsOfPost([])
            })
    }

    useEffect(() => {
        setLoading(true)
        getPostData()
            .then((response) => {
                setListPostsView(response.data)
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        getComment()
    }, [])

    const reactNavLink = document.querySelectorAll('.react-nav-link');
    const menuReact = document.querySelectorAll('.menu-react');
    useEffect(() => {
        let timeout;
        if (isLogin()) {
            if (reactNavLink !== null && menuReact !== null) {
                for (let i = 0; i < reactNavLink.length; i++) {
                    reactNavLink[i].addEventListener('mouseenter', function () {
                        timeout = setTimeout(function () {
                            menuReact[i].style.display = 'flex';
                        }, 800); // 0.5s
                    });
                    reactNavLink[i].addEventListener('mouseleave', function () {
                        clearTimeout(timeout);
                        menuReact[i].style.display = 'none';
                    });
                    menuReact[i].addEventListener('click', function () {
                        clearTimeout(timeout);
                        menuReact[i].style.display = 'none';
                    })
                }
            } else {
                return;
            }
        }
    }, [listPostsView])


    const handleShowDetail = (postId, e) => {
        if (listShowDetail.includes(postId)) {
            let newListShowDetail = listShowDetail.filter((id) => {
                return id !== postId
            })
            setListShowDetail(newListShowDetail);
        } else {
            setListShowDetail([...listShowDetail, postId]);
        }
        e.preventDefault();
    }

    const handleSubmitComment = (postId, userId, comment) => {
        if (comment.trim().length == 0) {
            setCommentError(true)
            return;
        }
        const data = {
            postId: postId,
            userId: userId,
            content: comment,
        }
        const response = axiosInstance.post('/api/Comments', data)
            .then((response) => {
                // setCommentsOfPost([...commentsOfPost, response.data])
                getComment()
                setComment('')
                setCommentError(false)
            })
            .catch(error => console.log(error))
    }

    const parseDate = (date) => {
        let dateParse = date.split('T');
        let dateChange = dateParse[0].split('-').reverse();
        let dateAfterParse = dateChange.join('-')
        let timeAfterParse = dateParse[1].split(':')
        return `${dateAfterParse} at ${timeAfterParse[0]}:${timeAfterParse[1]}`;
    }

    const convertFullName = (fullName) => {
        // console.log(fullName.trim() === "")
        if (fullName?.trim() === null || fullName?.trim() === "" || fullName?.trim() === undefined) {
            // console.log('chay vo khong tu')
            return ""
        } else {
            const nameSplit = fullName.trim().split(' ');
            if (nameSplit.length > 1) {
                // console.log('chay vo nhieu tu')
                const firstLetterFirstName = nameSplit[0][0].toUpperCase()
                const lastName = nameSplit[nameSplit.length - 1]
                const firstLetterLastName = lastName[0].toUpperCase()
                return firstLetterFirstName + firstLetterLastName
            } else {
                // console.log('chay vo 1 tu')
                return nameSplit[0][0].toUpperCase()
            }
        }
    }

    //handle show comment 
    const handleShowCommentClick = (postId) => {
        if (listShowComments.includes(postId)) {
            let newList = listShowComments.filter((data) => {
                return data !== postId
            })
            setListShowComments(newList)
            console.log(newList)
        } else {

            setListShowComments([...listShowComments, postId])
        }
    }

    return (
        <>
            {/* <div id="scrollableDiv" className="row"> */}



            {
                loading ?
                    <div class="spinner-border" role="status"
                    >
                        <span class="sr-only">Loading...</span>
                    </div>
                    :
                    listPostsView.length > 0 ?
                        listPostsView.map((post, index) => {
                            return (
                                <div key={post.postId}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="course-content d-flex flex-wrap">
                                                <div class="initial-avatar-forum header-item">
                                                    {convertFullName(post.fullName)}
                                                </div>
                                                <div className="forum-details">
                                                    <div className='forum-author'><strong>{post.fullName}</strong></div>
                                                    <div className='forum-date' >{post.activationDateAgo}
                                                        <div className='forum-date-details'>{parseDate(post.activationDate)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="course-details-tab style-2">
                                                <h6>{post.title}</h6>
                                                {post.content.length < 100 ?
                                                    <>
                                                        <div className="forum">
                                                            <p>{post.content}</p>
                                                        </div>

                                                    </>
                                                    :
                                                    <>
                                                        {listShowDetail.includes(post.postId) ?
                                                            <>
                                                                <div className="">
                                                                    <p>{post.content}</p>
                                                                </div>
                                                                <a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}><h5>Hide</h5></a>
                                                            </>

                                                            :

                                                            <>
                                                                <div className="">
                                                                    <p>{post.content.slice(0, 200)}<strong><a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}> ... and more</a></strong></p>
                                                                </div>
                                                            </>

                                                        }

                                                    </>
                                                }
                                                <div className='d-flex justify-content-between count-total-post'>
                                                    <div className='d-flex total-react-post'>
                                                        <div><i class="bi bi-hand-thumbs-up-fill" title='Like'></i> {post.likeCount}</div>
                                                        <div>|</div>
                                                        <div><i class="bi bi-hand-thumbs-down-fill" title='Dislike'></i> {post.dislikeCount}</div>
                                                    </div>
                                                    <div title='Comments'>{post.commentCount} <i class="bi bi-chat-dots-fill"></i></div>
                                                </div>
                                                {/* <a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}><h5>{listShowDetail.includes(post.postId) ? "Hide" : "More..."}</h5></a> */}

                                                <Tab.Container activeKey={listShowComments.includes(post.postId) ? "Comments" : ""}>
                                                    <Nav className="nav nav-tabs tab-auto forum-nav" id="nav-tab" role="tablist">
                                                        <Nav.Link className="forum-nav-link" eventKey="Comments" onClick={e => handleShowCommentClick(post.postId)}><i class="bi bi-chat-dots-fill"></i> Commnets</Nav.Link>
                                                        <Nav.Link className="forum-nav-link react-nav-link" eventKey="React">
                                                            {isLogin() ?
                                                                <>
                                                                    <div className='menu-react'>
                                                                        <>
                                                                            <div className=' like active' onClick={(e) => { handleLikeClick(post.postId); e.preventDefault() }}><i class="bi bi-hand-thumbs-up-fill"></i></div>
                                                                            <div className=' dislike active' onClick={() => handleDislikeClick(post.postId)}><i class="bi bi-hand-thumbs-down-fill"></i></div>
                                                                        </>
                                                                    </div>
                                                                    {!!react(post.postId) === true ?
                                                                        react(post.postId).status === "Like" ?
                                                                            <>
                                                                                <div className='react like active' onClick={() => handleLikeClick(post.postId)}><i class="bi bi-hand-thumbs-up-fill"></i> Like</div>

                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div className='react dislike active' onClick={() => handleDislikeClick(post.postId)}><i class="bi bi-hand-thumbs-down-fill"></i> Dislike</div>

                                                                            </>

                                                                        :
                                                                        <>
                                                                            <div className='like' onClick={() => handleLikeClick(post.postId)}><i class="bi bi-hand-thumbs-up-fill"></i> Like</div>
                                                                        </>}
                                                                </>
                                                                :
                                                                <>
                                                                    <div title='Login to use'><i class="bi bi-hand-thumbs-up-fill"></i>Like</div>
                                                                    {/* <div title='Login to use'><i class="bi bi-hand-thumbs-down-fill"></i> </div> */}
                                                                </>
                                                            }
                                                        </Nav.Link>
                                                    </Nav>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="Comments" className='tab-comments'>
                                                            {commentsOfPost.map((data, ind) => (
                                                                data.postId === post.postId && (
                                                                    <div className='d-flex' key={ind}>
                                                                        <div class="initial-avatar-comment">
                                                                            {convertFullName(post.fullName)}
                                                                        </div>
                                                                        <div className="comment-details" key={ind}>
                                                                            <div>
                                                                                <div className='comment-author'>{data.fullName}</div>
                                                                                <div className='comment-date'>{parseDate(data.commentDate)}</div>
                                                                            </div>
                                                                            <div className="comment-content">{data.content}</div>
                                                                        </div>

                                                                    </div>

                                                                )
                                                            ))}

                                                            <div className="comment">
                                                                <h3 className="heading">Leave Comment</h3>
                                                                {isLogin() ?
                                                                    <> <div className="row">
                                                                        <div className="col-xl-12">
                                                                            <div className="mb-3">
                                                                                {/* <label htmlFor="exampleFormControlTextarea3" className="form-label mb-2">Messasge</label> */}
                                                                                <textarea value={comment} onChange={(e) => { setComment(e.target.value) }} className="form-control" id="exampleFormControlTextarea3" rows="3" placeholder="Messasge" />
                                                                                {commentError && <p style={{ color: 'red' }}>Please input comment</p>}
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <button onClick={() => {
                                                                                handleSubmitComment(post.postId, userDetails.userId, comment)
                                                                                console.log(userDetails)
                                                                            }} className="btn btn-primary" type="submit">Submit Comment</button>
                                                                        </div>
                                                                    </div></>
                                                                    :
                                                                    <><Button className="me-2" variant="primary" style={{ width: '100%' }}>
                                                                        <Link to="/login">Login to use</Link>
                                                                    </Button></>
                                                                }

                                                            </div>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="Report">
                                                            {/* <div>
                                                                    {isLogin() ?
                                                                        !!react(post.postId) === true ?
                                                                            react(post.postId).status === "Like" ?
                                                                                <div className="row">
                                                                                    <div className="react">
                                                                                        <button className='react-button react-like' onClick={() => handleLikeClick(post.postId)} title='Like'>
                                                                                            <i class="bi bi-hand-thumbs-up-fill"></i>
                                                                                        </button>
                                                                                        <button className='react-button'
                                                                                            onClick={() => handleDislikeClick(post.postId)} title='Dislike'>
                                                                                            <i class="bi bi-hand-thumbs-down-fill"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div className="row">
                                                                                    <div className="react">
                                                                                        <button className='react-button' onClick={() => handleLikeClick(post.postId)} title='Like'>
                                                                                            <i class="bi bi-hand-thumbs-up-fill"></i>
                                                                                        </button>
                                                                                        <button className='react-button react-dislike' onClick={() => handleDislikeClick(post.postId)} title='Dislike'>
                                                                                            <i class="bi bi-hand-thumbs-down-fill"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>

                                                                            :
                                                                            <div className="row">
                                                                                <div className="react">
                                                                                    <button className='react-button' onClick={() => handleLikeClick(post.postId)} title='Like'>
                                                                                        <i class="bi bi-hand-thumbs-up-fill"></i>
                                                                                    </button>
                                                                                    <button className='react-button' onClick={() => handleDislikeClick(post.postId)} title='Dislike'>
                                                                                        <i class="bi bi-hand-thumbs-down-fill"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                        <>
                                                                            <Button className="me-2" variant="primary" style={{ width: '100%' }}>
                                                                                <Link to="/login">Login to use</Link>
                                                                            </Button>
                                                                        </>
                                                                    }

                                                                </div> */}
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Tab.Container>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h4>No post in forum</h4>
            }


            {/* </div> */}
        </>
    )
}

export default Forum