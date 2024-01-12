import React, { useState, useContext, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    Table,
    Badge,
    Dropdown,
    Modal
} from "react-bootstrap";
import DrawChart from '../../DrawChart/DrawChart';
import { axiosInstance } from '../../../../services/AxiosConfig';
import "./favorite-stocks.css"
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";


const FavoriteStocks = () => {
    //list stock to view detail
    const [listStockDetails, setListStockDetails] = useState([])
    //list my stockname favorite
    const [listStockNameFavorite, setListStockNameFavorite] = useState([])
    //list my favorite
    const [listMyFavorite, setListMyFavorite] = useState([])
    const [showChart, setShowChart] = useState(false);
    const [dateDraw, setDateDraw] = useState('')
    //stockName to draw
    const [stockNameDraw, setStockNameDraw] = useState('');
    const [loading, setLoading] = useState(false);

    //method Round to four decimal places
    const parseValuesTo4Decimal = (value) => {
        return Number(value.toFixed(4))
    }

    //api get list detail of stock favorite
    const apiGetDetailStockFavorite = () => {
        return axiosInstance.get(`/api/Stocks/GetStocksFavorites`)
    }

    //api get list favorite
    const getListMyFavorite = () => {
        return axiosInstance.get(`/api/WatchlistStocks/getMyId`)
    }

    //apir delete favorite
    const deleteFavorite = (id) => {
        return axiosInstance.delete(`/api/WatchlistStocks/${id}`)
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
    //handle delete favorite
    const handleDeleteFavorite = (stockName) => {
        let stockDelete = listMyFavorite.find((stock) => stock.stockName === stockName)
        swal({
            // title: response.data.message,
            text:
                "Do you want to delete this stocks ?",
            // icon: "success",
            buttons:
            {
                Yes: {
                    text: 'Yes',
                    value: true // Giá trị tương ứng với nút này
                },
                No: {
                    text: 'No',
                    value: false // Giá trị tương ứng với nút này
                },
            }
        }).then((res) => {
            if (res) {
                setLoading(true)
                deleteFavorite(stockDelete.id)
                    .then(() => {
                        notifySusscess("Deleted Successfully", 3000)
                        getListMyFavorite()
                            .then((respone) => {
                                let stocksName = respone.data.map((stock) => stock.stockName)
                                setListMyFavorite(respone.data)
                                setListStockNameFavorite(stocksName)
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
                    .finally(() => { setLoading(false) })
            } else {

                return;
            }
        })

    }

    //load list stock detail to view
    useEffect(() => {
        setLoading(true)
        apiGetDetailStockFavorite()
            .then((result) => {
                console.log(result.data)
                setListStockDetails(result.data)
            }).catch((err) => {
                console.log(err)
            }).finally(() => setLoading(false))
    },[])

    //load list favorite
    useEffect(() => {
        getListMyFavorite()
            .then((respone) => {
                let stocksName = respone.data.map((stock) => stock.stockName)
                setListMyFavorite(respone.data)
                setListStockNameFavorite(stocksName)
            }).catch(error => {
                console.log(error)
                setListMyFavorite([])
                setListStockNameFavorite([])
            })
    }, [])
    let stockDraw = { stockName: stockNameDraw, date: dateDraw }
    return (
        <>
            <div className='row'>
                <div className="col-xl-12">
                    <Col lg={12}>
                        <Card>
                            <Card.Header className='home'>
                                <Card.Title>My Favorite</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                <Link><strong onClick={() => {
                                                }}>STOCK CODE
                                                </strong></Link>
                                            </th>
                                            <th>
                                                <Link><strong onClick={() => {
                                                }}>DAILY PROFIT
                                                </strong></Link>
                                            </th>
                                            <th>
                                                <strong>SHARPE RATIO</strong>
                                            </th>
                                            <th>
                                                <strong>CLOSE</strong>
                                            </th>
                                            <th>
                                                <strong>VOLUME</strong>
                                            </th>
                                            <th>
                                                <strong>DATE</strong>
                                            </th>

                                            <th>
                                                <strong>ACTION</strong>
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
                                                listStockDetails.length > 0 ?
                                                    listStockDetails?.map((stock, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <strong>{stock.ticker}</strong>
                                                                </td>
                                                                {stock.dailyProfit >= 0 ?
                                                                    <td className='positive-numbers'>{stock.dailyProfit}</td>
                                                                    :
                                                                    <td className='negative-numbers'>{stock.dailyProfit}</td>
                                                                }
                                                                {parseValuesTo4Decimal(stock.sharpeRatio) >= 0 ?
                                                                    <td className='positive-numbers'>{parseValuesTo4Decimal(stock.sharpeRatio)}</td>
                                                                    :
                                                                    <td className='negative-numbers'>{parseValuesTo4Decimal(stock.sharpeRatio)}</td>
                                                                }
                                                                <td>{stock.close}</td>
                                                                <td>{stock.volume}</td>
                                                                <td>{stock.dtyyyymmdd}</td>
                                                                <td className='favorite-action'>
                                                                    <Link className='me-2 shadow btn-xs sharp'
                                                                        onClick={() => {
                                                                            setShowChart(!showChart);
                                                                            setStockNameDraw(stock.ticker)
                                                                            setDateDraw(stock.dtyyyymmdd)
                                                                        }}
                                                                    ><i class="bi bi-bar-chart-fill"></i></Link>
                                                                    <Link className="me-2 btn btn-danger shadow btn-xs sharp">
                                                                        <i onClick={() => handleDeleteFavorite(stock.ticker)} class="fa fa-close color-danger" title='Delete from favorites'></i>
                                                                    </Link>
                                                                </td>


                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr className='notify-newpost'>
                                                        <td colSpan={8}>
                                                            <div className='d-flex flex-column py-2 align-items-center justify-content-center'>
                                                                <h4>No stock in your favorite</h4>
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
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={5}
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
            <Modal className="modal container-fluid modal-portfolio" show={showChart}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{`Stock code: ${stockDraw.stockName}`}</h4>
                        <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowChart(!showChart) }
                        }>
                        </Button>
                    </div>
                    <div className="modal-body portfolio">
                        <DrawChart stock={stockDraw} />
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </>
    )
}
export default FavoriteStocks