import React, { useEffect, useState } from 'react'
import { Nav, Tab, ProgressBar, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'react-modal-video/scss/modal-video.scss';
import { isLogin } from '../../../../services/AuthService';

import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosInstance } from '../../../../services/AxiosConfig';
// import "../../../../css/icon-name.css"
import './forum.css'
import { get } from 'lodash';

function Forum() {
    const [socialModal, setSocialModal] = useState();
    const [isOpen, setOpen] = useState(false);

    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(false);

    //     const fakeData = (index, postQuality) => {
    //         let listPosts = []
    //         for (let i = 1; i <= postQuality; i++) {
    //             let post = {
    //                 postId: i + index,
    //                 title: `Title ${i + index}`,
    //                 content: `Content ${i + index}: 
    //              Rerum quia sit vel soluta natus quisquam error. Repellat et nulla corrupti ad tempora corrupti tenetur vel. Iusto et quod aut qui eos sed. Libero facere ut deserunt iusto.

    // Illum repellendus incidunt id ipsam. Blanditiis eligendi voluptatem nostrum occaecati fuga. Ut dolorum repudiandae eos sequi id ipsa culpa. Corporis tempora ullam omnis magni.

    // Reiciendis natus officia impedit. Amet sit omnis officiis. Facere sit sit ut reprehenderit fuga dolor. Neque necessitatibus in praesentium voluptatibus. Ut assumenda quisquam in doloremque molestiae eaque. Tenetur voluptatum quia omnis dolores facilis labore.`,
    //                 accept: true,
    //                 baned: false,
    //             }
    //             listPosts = [...listPosts, post]
    //         }

    //         return listPosts;
    //     }
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [listPosts, setListPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [listShowDetail, setListShowDetail] = useState([])
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
    //load list react
    const loadListReact = () => {
        getListReact()
            .then((response) => {
                setListReact(response.data)
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        loadListReact()
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

    //get post by quality
    const getPostByQuality = (startOffset, itemOnePage, listPosts) => {
        let result = [];
        for (let i = startOffset; i < startOffset + itemOnePage; ++i) {
            result = [...result, listPosts[i]]
        }
        setStartOffset(startOffset + itemOnePage)
        return result
    }
    //get all posts
    const getPostData = () => {
        return axiosInstance.get('/api/ForumPosts/GetForumPostsAccept')
    }

    const loadPosts = () => {
        getPostData()
            .then((response) => {
                // let listPostsNeed = response.data.filter((post) => {
                //     return post.accept === true && (post.baned === false || post.baned === null)
                // })
                setListPosts(response.data)
                // setListPostsView(getPostByQuality(0, 3, listPostsNeed))
                setListPostsView(response.data)
            })
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
        loadPosts()
    }, [])

    useEffect(() => {
        getComment()
    }, [])


    // console.log(listPosts[0])
    // console.log(getPostByQuality(1,2,listPosts))

    // console.log(startOffset)
    // console.log(hasMore)
    // console.log(listPosts)
    // console.log(listPostsView)


    const fetchMoreData = () => {
        console.log('call fetch')
        setHasMore(false)
        // if (listPostsView.length >= 11) {
        //     console.log('dung')
        //     setHasMore(false)
        //     return;
        // }
        console.log('chay')
        setListPostsView([...listPostsView, ...getPostByQuality(0, listPosts.length, listPosts)]);


        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // setTimeout(() => {
        //     setListPostsView([...listPostsView, ...getPostByQuality(startOffset, 2, listPosts)]);
        // }, 2000);
    };

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
        let datePare = date.split('T');
        let timeParse = datePare[1].split(':')
        return `${datePare[0]} ${timeParse[0]}:${timeParse[1]}`;
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


    return (
        <>

            <div id="scrollableDiv" className="row">
                {listPostsView &&
                    <InfiniteScroll
                        dataLength={3}
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

                        {listPostsView && listPostsView.map((post, index) => {
                            return (
                                <div key={post.postId}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="course-content d-flex flex-wrap">
                                                <div class="initial-avatar-forum header-item">
                                                    {convertFullName(post.fullName)}
                                                </div>
                                                <div className="forum-title">
                                                    <h4>{post.title}</h4>
                                                    <ul className="d-flex align-items-center raiting my-0 flex-wrap react">
                                                        {isLogin() ?
                                                            !!react(post.postId) === true ?
                                                                react(post.postId).status === "Like" ?
                                                                    <>
                                                                        <li className='li-react like active' onClick={() => handleLikeClick(post.postId)}><i class="bi bi-hand-thumbs-up-fill"></i> {post.likeCount}</li>
                                                                        <li className='li-react dislike' onClick={() => handleDislikeClick(post.postId)}><i class="bi bi-hand-thumbs-down-fill"></i> {post.dislikeCount}</li>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <li className='li-react like' onClick={() => handleLikeClick(post.postId)}><i class="bi bi-hand-thumbs-up-fill"></i> {post.likeCount}</li>
                                                                        <li className='li-react dislike active' onClick={() => handleDislikeClick(post.postId)}><i class="bi bi-hand-thumbs-down-fill"></i> {post.dislikeCount}</li>
                                                                    </>

                                                                :
                                                                <>
                                                                    <li className='li-react like' onClick={() => handleLikeClick(post.postId)}><i class="bi bi-hand-thumbs-up-fill"></i> {post.likeCount}</li>
                                                                    <li className='li-react dislike' onClick={() => handleDislikeClick(post.postId)}><i class="bi bi-hand-thumbs-down-fill"></i> {post.dislikeCount}</li>
                                                                </>
                                                            :
                                                            <>
                                                                <li title='Login to use'><i class="bi bi-hand-thumbs-up-fill"></i> {post.likeCount}</li>
                                                                <li title='Login to use'><i class="bi bi-hand-thumbs-down-fill"></i> {post.dislikeCount}</li>
                                                            </>
                                                        }
                                                    </ul>

                                                </div>
                                            </div>

                                            <div className="course-details-tab style-2">
                                                {post.content.length < 100 ?
                                                    <>
                                                        <div className="about-content forum">
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
                                                            <Nav.Link className="nav-link" eventKey="Comments" ><i class="bi bi-chat-dots-fill"></i> Commnets</Nav.Link>
                                                            <Nav.Link className="nav-link" eventKey="Report"><i class="bi bi-exclamation-triangle-fill"></i> Report</Nav.Link>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="Comments">
                                                                {commentsOfPost.map((data, ind) => (
                                                                    data.postId === post.postId && (
                                                                        <>
                                                                            <div className="user-pic2" key={ind}>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="ms-3">
                                                                                        <h4>{data.fullName}</h4>
                                                                                        <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                                                                            <li>{parseDate(data.commentDate)}</li>
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
                                                                            <Link to="/login">Login to use</Link>
                                                                        </Button></>
                                                                    }

                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="Report">
                                                                <div>
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