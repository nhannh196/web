import React, { useEffect, useState } from 'react'
import { Nav, Tab, ProgressBar, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import copy from "copy-to-clipboard";
import 'react-modal-video/scss/modal-video.scss';
import { isLogin } from '../../../services/AuthService';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';


function Forum() {
    const [socialModal, setSocialModal] = useState();
    const [isOpen, setOpen] = useState(false);
    let copyText = 'https://finlab.dexignlab.com/react';
    const copyToClipboard = () => {
        copy(copyText);
        alert(`You have copied ${copyText}`);
    }
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(false);
    const [commentblog, setCommentblog] = useState([]);

    const fakeData = (index, postQuality) => {
        let listPosts = []
        for (let i = 1; i <= postQuality; i++) {
            let post = {
                postId: i + index,
                title: `Title ${i + index}`,
                content: `Content ${i + index}: 
             Rerum quia sit vel soluta natus quisquam error. Repellat et nulla corrupti ad tempora corrupti tenetur vel. Iusto et quod aut qui eos sed. Libero facere ut deserunt iusto.
 
Illum repellendus incidunt id ipsam. Blanditiis eligendi voluptatem nostrum occaecati fuga. Ut dolorum repudiandae eos sequi id ipsa culpa. Corporis tempora ullam omnis magni.
 
Reiciendis natus officia impedit. Amet sit omnis officiis. Facere sit sit ut reprehenderit fuga dolor. Neque necessitatibus in praesentium voluptatibus. Ut assumenda quisquam in doloremque molestiae eaque. Tenetur voluptatum quia omnis dolores facilis labore.`,
                accept: true,
                baned: false,
            }
            listPosts = [...listPosts, post]
        }

        return listPosts;
    }
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [listPosts, setListPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [listShowDetail, setListShowDetail] = useState([])
    const [commentsOfPost, setCommentsOfPost] = useState([])
    const fetchMoreData = () => {
        if (listPosts.length >= 20) {
            setHasMore(false)
            return;
        }
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setListPosts([...listPosts, ...fakeData(listPosts.length, 5)]);
        }, 2000);
    };
    useEffect(() => {
        // console.log('load danh sach lan dau')
        getPostData()
    }, [])
    useEffect(() => {
        getComment()
    }, [commentsOfPost])
    const getPostData = () => {
        try {
            axios.get('https://localhost:7053/api/ForumPosts')
                .then((response) => {

                    let listPost = response.data.filter((post) => {
                        return post.accept === true && (post.baned === false || post.baned === null)
                    })
                    // console.log(listPost)
                    setListPosts(listPost)
                });

        }
        catch (err) {

        }
    }

    const getComment = () => {
        try {
            axios.get(`https://localhost:7053/api/Comments`)
                .then((response) => {
                    setCommentsOfPost(response.data)
                })
                .catch(() => {
                    setCommentsOfPost([])
                })
        }
        catch (err) {
            // console.log(err)
        }
    }


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
        try {
            const data = {
                postId: postId,
                userId: userId,
                content: comment
            }
            const response = axios.post('https://localhost:7053/api/Comments', data)
                .then((response) => {
                    setCommentsOfPost([...commentsOfPost, response.data])
                    setComment('')
                    setCommentError(false)
                })

        }
        catch (e) {

        }
    }

    return (
        <>

            <div id="scrollableDiv" className="row">
                {listPosts &&
                    <InfiniteScroll
                        dataLength={listPosts.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>You have seen all posts</b>
                            </p>
                        }

                    // scrollableTarget="scrollableDiv"
                    >

                        {listPosts && listPosts.map((post, index) => {
                            return (
                                <div key={post.postId}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="course-content d-flex justify-content-between flex-wrap">
                                                <div>
                                                    <h3>{post.title}</h3>
                                                    <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                                        {/* <li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i></li> */}
                                                        {/* <li>Review (1k)</li> */}
                                                        {/* <li>10k Students</li> */}
                                                    </ul>

                                                </div>
                                            </div>

                                            <div className="course-details-tab style-2 mt-4">
                                                {post.content.length < 100 ?
                                                    <>
                                                        <div className="about-content">
                                                            <p>{post.content}</p>
                                                        </div>
                                                        <a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}><h5>{listShowDetail.includes(post.postId) ? "Hide" : "More..."}</h5></a>
                                                    </>
                                                    :
                                                    <>
                                                        {listShowDetail.includes(post.postId) ?
                                                            <>
                                                                <div className="about-content">
                                                                    <p>{post.content}</p>
                                                                </div>
                                                                <a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}><h5>Hide</h5></a>
                                                            </>

                                                            :

                                                            <>
                                                                <div className="about-content">
                                                                    <p>{post.content.slice(0, 200)}<strong><a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}>... and more</a></strong></p>
                                                                </div>
                                                                <a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}><h5>More...</h5></a>
                                                            </>

                                                        }

                                                    </>
                                                }
                                                {/* <a href='#' onClick={(e) => { handleShowDetail(post.postId, e) }}><h5>{listShowDetail.includes(post.postId) ? "Hide" : "More..."}</h5></a> */}
                                                {listShowDetail.includes(post.postId) &&
                                                    <Tab.Container >
                                                        <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                                            <Nav.Link className="nav-link" eventKey="Comments" >Commnets</Nav.Link>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="Comments">
                                                                {commentsOfPost.map((data, ind) => (
                                                                    data.postId === post.postId && (
                                                                        <>
                                                                            <div className="user-pic2" key={ind}>
                                                                                <div className="d-flex align-items-center">
                                                                                    {/* <img src={data.image} alt="" /> */}
                                                                                    <div className="ms-3">
                                                                                        <h4>{data.fullName}</h4>
                                                                                        <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                                                                            {/* <li><span className="font-w500">5.0</span><i className="fas fa-star star-orange ms-2"></i>
                                                                                                <i className="fas fa-star star-orange me-1"></i>
                                                                                                <i className="fas fa-star star-orange me-1"></i>
                                                                                                <i className="fas fa-star star-orange me-1"></i>
                                                                                                <i className="fas fa-star star-orange"></i>
                                                                                            </li> */}
                                                                                            <li>{data.commentDate}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="ms-3">{data.content}</p>
                                                                            </div>

                                                                        </>

                                                                    )
                                                                ))}

                                                                <div className="comment">
                                                                    <h3 className="heading mt-4 mb-3">Leave Comment</h3>
                                                                    {isLogin() ? <> <div className="row">
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
                                                                    </div></> :
                                                                        <><Button className="me-2" variant="primary" style={{ width: '100%' }}>
                                                                            <Link to="/login">Login to comment</Link>
                                                                        </Button></>
                                                                    }

                                                                </div>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )

                        })}
                    </InfiniteScroll>
                }
            </div>
        </>
    )
}

export default Forum