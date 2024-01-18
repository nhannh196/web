import React, { useState, useContext, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Table,
    Badge,
    Dropdown,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "react-bootstrap";
import { axiosInstance } from '../../../../services/AxiosConfig';
import swal from "sweetalert";

import "./list-new-posts.css"


const ListNewPosts = () => {
    const [loading, setLoading] = useState(false)
    const [listNewPosts, setListNewPosts] = useState([])
    const [postReview, setPostReview] = useState()
    const [showReview, setShowReview] = useState(false)

    //api get new posts
    const getNewPosts = () => {
        return axiosInstance.get(`/api/ForumPosts/GetForumPostsTaskManager`)
    }
    //load new post
    const loadNewPosts = () => {
        setLoading(true)
        getNewPosts()
            .then((result) => {
                // console.log(result.data)
                setListNewPosts(result.data);
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        loadNewPosts()
    }, [])
    useEffect(() => {
        const timeLoadNewPost = setInterval(() => {
            loadNewPosts()
        }, 10000)
        return () => {
            clearInterval(timeLoadNewPost)
        }
    }, [])
    const parseDate = (date) => {
        let dateParse = date.split('T');
        let dateChange = dateParse[0].split('-').reverse();
        let dateAfterParse = dateChange.join('-')
        let timeAfterParse = dateParse[1].split(':')
        return `${dateAfterParse} at ${timeAfterParse[0]}:${timeAfterParse[1]}`;
    }
    //handle click review
    const handleClickReview = (postId) => {
        const postFind = listNewPosts.find((post) => {
            return post.postId === postId;
        })
        setPostReview(postFind);
        setShowReview(true)
    }

    //api approve post
    const apiApprovePost = (postId) => {
        return axiosInstance.put(`/api/ForumPosts/AcceptStatus/${postId}`)
    }
    //api disapprove post
    const apiDisapprovePost = (postId) => {
        return axiosInstance.put(`/api/ForumPosts/DisAcceptStatus/${postId}`)
    }
    //handle click approve
    const handleClickApprove = (postId) => {
        swal({
            title: "Do you want to approve this post ?",
            // text:
            //   "Do you want to Login ?",
            buttons:
            {
                Yes: {
                    text: 'Yes',
                    value: true
                },
                No: {
                    text: 'No',
                    value: false
                },
            }
        }).then((res) => {
            if (res) {
                apiApprovePost(postId)
                    .then((result) => {
                        console.log(postId)
                        setShowReview(false)
                        setPostReview(null)
                        loadNewPosts()
                    }).catch((err) => {
                        console.log(err)
                    });
            } else {
                return;
            }
        })
    }

    //handle click approve
    const handleClickDisapprove = (postId) => {
        swal({
            title: "Do you want to disapprove this post ?",
            // text:
            //   "Do you want to Login ?",
            buttons:
            {
                Yes: {
                    text: 'Yes',
                    value: true
                },
                No: {
                    text: 'No',
                    value: false
                },
            }
        }).then((res) => {
            if (res) {
                console.log(postId)
                apiDisapprovePost(postId)
                    .then((result) => {
                        console.log(postId)
                        setShowReview(false)
                        setPostReview(null)
                        loadNewPosts()
                    }).catch((err) => {
                        console.log(err)
                    });
            } else {
                return;
            }
        })
    }
    console.log(listNewPosts)
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <Col lg={12}>
                        <Card>
                            <Card.Header className='home'>
                                <Card.Title>New posts</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                            </th>
                                            <th>
                                                <strong>User</strong>
                                            </th>
                                            <th>
                                                <strong>Title</strong>
                                            </th>
                                            <th>
                                                <strong>Date post</strong>
                                            </th>
                                            <th>
                                                <strong>Action</strong>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody >
                                        {
                                            loading ?
                                                <div class="spinner-border" role="status"
                                                >
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                :
                                                listNewPosts.length > 0 ?
                                                    listNewPosts.map((post, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <strong>{index + 1}</strong>
                                                                </td>
                                                                <td>{post.fullName}</td>
                                                                {post.title.length < 60 ?
                                                                    <td>{post.title}</td>
                                                                    :
                                                                    <td>
                                                                        {post.title.slice(0, 59)} ...
                                                                    </td>
                                                                }
                                                                <td>{parseDate(post.postDate)}</td>
                                                                <td>
                                                                    <button className='btn-review' onClick={() => { handleClickReview(post.postId) }}><i class="bi bi-eye"></i> Review</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr className='notify-newpost'>
                                                        <td colSpan={6}>
                                                            <div className='d-flex flex-column py-2 align-items-center justify-content-center'>
                                                                <h4>No new posts</h4>
                                                            </div>
                                                        </td>
                                                    </tr>
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>

                        </Card>
                    </Col >

                </div>
            </div>
            <Modal show={showReview} className="fade review-post" centered>
                <ModalHeader>
                    <Modal.Title>Review</Modal.Title>
                    <Button onClick={() => { setShowReview(!showReview) }} variant="" className="btn-close"></Button>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-wrap ">
                                <div>
                                    {postReview?.title && <h4>Title: {postReview.title}</h4>}
                                </div>
                            </div>

                            <div className="course-details-tab style-2">
                                <>
                                    <div className="about-content post-detail-content">
                                        {postReview?.content && <p>{postReview.content}</p>}
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='approve' onClick={() => handleClickApprove(postReview.postId)}>Approve <i class="bi bi-check2"></i></button>
                    <button className='disapprove' onClick={() => handleClickDisapprove(postReview.postId)}>Disapprove <i class="bi bi-x-circle"></i></button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ListNewPosts