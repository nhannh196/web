import React, { useState, useContext, useEffect } from 'react';
import {

    Col,
    Card,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "react-bootstrap";
import { axiosInstance } from '../../../../services/AxiosConfig';
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import "./manage-posts.css"

// import "./list-new-posts.css"
const ManagePosts = () => {
    const [loading, setLoading] = useState(false)
    const [listHistory, setListHistory] = useState([])
    const [postDetail, setPostDetail] = useState()
    const [showPostDetail, setShowPostDetail] = useState(false)

    //api get history
    const apiGetHistory = () => {
        return axiosInstance.get(`/api/ForumPosts/GetForumPostsManagerHistory`)
    }
    //load history
    const loadHistory = () => {
        setLoading(true)
        apiGetHistory()
            .then((result) => {
                // console.log(result.data)
                setListHistory(result.data);
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        loadHistory()
    }, [])

    const parseDate = (date) => {
        let dateParse = date.split('T');
        let dateChange = dateParse[0].split('-').reverse();
        let dateAfterParse = dateChange.join('-')
        let timeAfterParse = dateParse[1].split(':')
        return `${dateAfterParse} at ${timeAfterParse[0]}:${timeAfterParse[1]}`;
    }
    //handle click review
    const handleClickDetail = (postId) => {
        const postFind = listHistory.find((post) => {
            return post.postId === postId;
        })
        setPostDetail(postFind);
        setShowPostDetail(true)
    }

    //api ban
    const apiBan = (postId) => {
        return axiosInstance.put(`/api/ForumPosts/BanForumPost/${postId}`)
    }
    //handle ban click
    const handleBanClick = (postId) => {

        swal({
            // title: "Do you want to report this post ?",
            text:
                `Do you want to ban post with post id is ${postId}?`,
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
                console.log("ban")
                apiBan(postId)
                    .then((res) => {
                        console.log(res)
                        notifySusscess("Baned successfully",3000)
                        loadHistory()
                    })
                    .catch((err) => console.log(err))
            } else {
                console.log("no")
                return;
            }
        })
    }

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

    console.log(listHistory)
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <Col lg={12}>
                        <Card>
                            <Card.Header className='home'>
                                <Card.Title>History review</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                <strong>Post Id</strong>
                                            </th>
                                            <th>
                                                <strong>User post</strong>
                                            </th>
                                            <th>
                                                <strong>Title</strong>
                                            </th>
                                            <th>
                                                <strong>Date post</strong>
                                            </th>
                                            <th>
                                                <strong>Status</strong>
                                            </th>
                                            <th>
                                                <strong>Action</strong>
                                            </th>
                                            <th>

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
                                                listHistory.length > 0 ?
                                                    listHistory.map((post, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <strong>{post.postId}</strong>
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
                                                                {post.accept ?
                                                                    <td ><span className="light badge-success badge">Approved</span></td>
                                                                    :
                                                                    <td ><span className="light badge-danger badge">Disapproved</span></td>
                                                                }

                                                                {post.baned ?
                                                                    <td className='btn-action-manage' title='UnBan'>
                                                                        <Link><i class="bi bi-unlock-fill"></i> UnBan</Link>
                                                                    </td>
                                                                    :
                                                                    <td className='btn-action-manage' title='Ban'>
                                                                        <Link onClick={() => handleBanClick(post.postId)}> <i class="bi bi-lock-fill"></i> Ban</Link>
                                                                    </td>
                                                                }
                                                                <td>
                                                                    <Link onClick={() => handleClickDetail(post.postId)}><i class="bi bi-card-list"></i> Detail</Link>
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
            <Modal show={showPostDetail} className="fade review-post" centered>
                <ModalHeader>
                    <Modal.Title>Detail</Modal.Title>
                    <Button onClick={() => { setShowPostDetail(!showPostDetail) }} variant="" className="btn-close"></Button>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-wrap ">
                                <div>
                                    {postDetail?.title && <h4>Title: {postDetail.title}</h4>}
                                </div>
                            </div>

                            <div className="course-details-tab style-2">
                                <>
                                    <div className="about-content post-detail-content">
                                        {postDetail?.content && <p>{postDetail.content}</p>}
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
            <ToastContainer />
        </>
    )
}

export default ManagePosts