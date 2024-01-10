import axios from "axios";
import { useState, useEffect } from "react";
import { axiosInstance, baseURL } from "../../../../services/AxiosConfig";
import {
    Row,
    Col,
    Card,
    Table,
    Badge,
    Dropdown,
    ProgressBar,
    Modal,
    ModalHeader,
    Button,
    ModalBody,
    Nav,
    Tab,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import './manage-post.css'

const ManageMyPosts = () => {
    const [showDetail, setShowDetail] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listMyPosts, setListMyPosts] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [startOffset, setStartOffset] = useState(0)
    const [postDetails, setPostDetails] = useState()
    const [listComments, setListComments] = useState()
    // const

    //get post
    const getMyPosts = () => {
        return axiosInstance.get(`/api/ForumPosts/GetMyForumPosts`)
    }
    //get comment of post
    const getComments = (postid) => {
        return axiosInstance.get(`api/Comments/post/${postid}`)
    }

    useEffect(() => {
        getMyPosts()
            .then((response) => {
                // console.log(response.data)
                setListMyPosts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    let itemsPerPage = 10
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = startOffset + itemsPerPage;
        // console.log(`Loading items from ${startOffset} to ${endOffset}`);
        setCurrentItems(listMyPosts.slice(startOffset, endOffset));
        setPageCount(Math.ceil(listMyPosts.length / itemsPerPage));
    }, [startOffset, itemsPerPage, listMyPosts,]);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % listMyPosts.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setStartOffset(newOffset);
    };

    //parse date
    const parseDate = (date) => {
        let datePare = date.split('T');
        let timeParse = datePare[1].split(':')
        return `${datePare[0]} ${timeParse[0]}:${timeParse[1]}`;
    }

    //handle detail
    const handleDetail = (postDetails) => {
        setShowDetail(!showDetail);
        setPostDetails(postDetails);
        // console.log(postDetails);
        getComments(postDetails.postId)
            .then(response => {
                setListComments(response.data)
            })
            .catch((error) => {
                // setListComments('')
                console.log(error)
                if (error.data?.status === 404) {
                    setListComments('')
                }
            })
    }

    return (
        <>
            <div className='row'>
                <div className="col-xl-12">
                    <Col lg={12}>
                        <Card>
                            <Card.Header className='home'>
                                <Card.Title>MY POSTS</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                <strong></strong>
                                            </th>
                                            <th>
                                                <strong>TITLE</strong>
                                            </th>
                                            <th>
                                                <strong>POST DATE</strong>
                                            </th>
                                            <th>
                                                <strong>REACTS</strong>
                                            </th>
                                            <th>
                                                <strong>COMMENTS</strong>
                                            </th>
                                            <th>
                                                <strong>STATUS</strong>
                                            </th>
                                            <th>
                                                <strong>ACTION</strong>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ?
                                            <div class="spinner-border" role="status"
                                            >
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            :
                                            currentItems.length > 0 ?
                                                currentItems.map((post, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            {post.title.length < 40 ?
                                                                <td><h6>{post.title}</h6></td>
                                                                :
                                                                <td><h6>{`${post.title.slice(0, 39)} ...`}</h6></td>
                                                            }
                                                            <td>{parseDate(post.postDate)}</td>
                                                            <td>{(post.likeCount || 0)} likes| {(post.dislikeCount || 0)} dislikes</td>
                                                            <td>{post.commentCount || 0} comments</td>
                                                            {post.accept === true ?
                                                                <td><span className="light badge-success badge">Aprroved</span></td>
                                                                :
                                                                <td ><span className="light badge-warning badge">Waiting</span></td>
                                                            }
                                                            <td >
                                                                <Link title="Detail of post" onClick={() => handleDetail(post)}>
                                                                    <i class="bi bi-card-list" ></i> Detail
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr className='notify-newpost'>
                                                        <td colSpan={8}>
                                                            <div className='d-flex flex-column py-2 align-items-center justify-content-center'>
                                                                <h4>No posts</h4>
                                                            </div>
                                                        </td>
                                                    </tr>
                                        }
                                    </tbody>

                                </Table>
                            </Card.Body>
                            {/* <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            /> */}
                        </Card>
                    </Col >
                </div>
            </div>
            <Modal show={showDetail} className="fade modal-manage-post" centered>
                <ModalHeader>
                    <Modal.Title>Detail</Modal.Title>
                    <Button onClick={() => { setShowDetail(!showDetail); setListComments('') }} variant="" className="btn-close"></Button>
                </ModalHeader>
                <ModalBody>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-wrap ">
                                <div>
                                    {postDetails?.title && <h4>Title: {postDetails.title}</h4>}
                                    {/* <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                        <li><span className="font-w500">5.0</span><i className="fas fa-star text-orange ms-2"></i></li>
                                        <li>Review (1k)</li>
                                        <li>10k Students</li>
                                    </ul> */}
                                </div>
                            </div>

                            <div className="course-details-tab style-2">
                                <>
                                    <div className="about-content post-detail-content">
                                        {postDetails?.content && <p>{postDetails.content}</p>}
                                    </div>
                                </>
                                <Tab.Container >
                                    <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                        <Nav.Link className="nav-link" eventKey="Comments" >Commnets</Nav.Link>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="Comments">
                                            {listComments ?
                                                listComments.map((comment, index) => (
                                                    <>
                                                        <div className="user-pic2" key={index}>
                                                            <div className="d-flex align-items-center">

                                                                <div className="ms-3">
                                                                    {comment?.fullName && <h4>{comment.fullName}</h4>}
                                                                    <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                                                        {comment?.commentDate && <li>{parseDate(comment.commentDate)}</li>}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            {comment?.content && <p className="ms-3">{comment.content}</p>}
                                                        </div>
                                                    </>
                                                ))
                                                : <><h5>No comment</h5></>
                                            }

                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ManageMyPosts