import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Col,
    Card,
    Table,
    Badge,
    Dropdown,
} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import DatePicker from "react-datepicker";
import '../../../../css/datepicker.css';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import "./optimization.css"

const PortofolioOptimization = () => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date);
    //List Stock Portofolio
    const [listStockPortofolio, setListStockPortofolio] = useState([]);

    //List stock view
    const [listStocksView, setListStocksView] = useState([])
    //Page load
    const [currentItems, setCurrentItems] = useState(listStocksView);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        getListStock().then((stock) => { setListStocksView(stock.data) });
        //
    }, [])
    //Paging
    let itemsPerPage = 6
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(listStocksView.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listStocksView.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listStocksView]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % listStocksView.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const options = [
        //{ value: '1', label: 'Select Status' },
        { value: '2', label: 'Top 30 stock' },
        { value: '3', label: 'Top 50 stock' },
        // { value: '4', label: 'Trash' },
        // { value: '5', label: 'Private' },
        // { value: '6', label: 'Pending' }
    ]

    //Get stock data
    const getListStock = () => {
        const data = {
            nameStock: "",
            dateRelease: "2023-10-18"
        }
        return axios.post(
            `https://localhost:7053/api/Stocks/ViewPost`, data
        )
    }

    //
    const svg1 = (
        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24"></rect>
                <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                <circle fill="#000000" cx="19" cy="12" r="2"></circle>
            </g>
        </svg>
    );

    const checkStockTiker = (stockId) => {
        let result=false
        console.log(listStockPortofolio)
        if(listStockPortofolio!==null||listStockPortofolio!==undefined){
             result = listStockPortofolio.some((stock) => {
                return stock.ticker === stockId
            })
        }
        return result
    }

    //Add Stock Portofolio
    const addStockPortofolio = (stock) => {
        console.log(listStockPortofolio)
        setListStockPortofolio([...listStockPortofolio, stock])
    }

    const deleteStockPortofolio = (stock) => {
        let result = listStockPortofolio.filter((s) => {
            return s.ticker !== stock;
        })
        console.log(result)
        setListStockPortofolio([...result])
    }
    // console.log(listStockPortofolio)
    //Data test
    const messageBlog = [
        { image: "", title: 'Dedi Cahyadi', subtitle: 'Head Manager' },
        { image: "", title: 'Evans John', subtitle: 'Programmer' },
        { image: "", title: 'Brian Brandon', subtitle: 'Graphic Designer' },
        { image: "", title: 'Chynthia Lawra', subtitle: 'Software Engineer' },
        { image: "", title: 'Dedi Cahyadi', subtitle: 'CEO' },
        { image: "", title: 'Dedi Cahyadi', subtitle: 'CEO' },
        { image: "", title: 'Dedi Cahyadi', subtitle: 'CEO' },
        { image: "", title: 'Dedi Cahyadi', subtitle: 'CEO' },
        { image: "", title: 'Dedi Cahyadi', subtitle: 'CEO' },
        { image: "", title: 'Dedi Cahyadi', subtitle: 'CEO' },
    ];
    const childRef = useRef();
    // console.log(formatDateToYYYYMMDD(startDate))
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="row">
                    <div className='col-xl-12'>
                        <div className="filter cm-content-box box-primary">
                            <div className="content-title">
                                <div className="cpa">
                                    <i className="fas fa-filter me-2"></i>Filter
                                </div>
                                <div className="tools">
                                    <Link to={"#"} className={`SlideToolHeader ${open ? 'collapse' : 'expand'}`}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <i className="fas fa-angle-up"></i>
                                    </Link>
                                </div>
                            </div>

                            <Collapse in={open}>
                                <div className="cm-content-body form excerpt">
                                    <div className="card-body">
                                        <div className="row filter-row">
                                            <div className="col-xl-3 col-xxl-6">
                                                <input type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="STOCK ID" />
                                            </div>
                                            <div className="col-xl-3 col-xxl-6">
                                                <Select options={options} className="custom-react-select mb-3 mb-xxl-0" />
                                            </div>
                                            <div className="col-xl-3 col-xxl-6">
                                                <DatePicker
                                                    className="form-control mb-xxl-0 mb-3"
                                                    dateFormat="yyyy-MM-dd"
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                />
                                            </div>
                                            <div className="col-xl-3 col-xxl-6">
                                                <button className="btn btn-primary me-2" title="Click here to Search" type="button"><i className="fa fa-search me-1"></i>Filter</button>
                                                <button className="btn btn-danger light" title="Click here to remove filter" type="button">Remove Filter</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </div>
                <div className='row main-card'>
                    <div className='col-xxl-9 col-xl-9'>
                        <div className='row>'>
                            <Col lg={12}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>STOCK</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <strong>STOCK ID</strong>
                                                    </th>
                                                    <th>
                                                        <strong>DAILY PROFIT</strong>
                                                    </th>
                                                    <th>
                                                        <strong>STANDARD DEVIATION</strong>
                                                    </th>

                                                    <th>
                                                        <strong>DATE</strong>
                                                    </th>

                                                    <th>
                                                        <strong>ACTION</strong>
                                                    </th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((stock, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <strong>{stock.ticker}</strong>
                                                            </td>
                                                            <td>{stock.dailyProfit}</td>
                                                            <td>{stock.standardDeviation}</td>
                                                            <td>{stock.dtyyyymmdd}</td>
                                                            <td>
                                                                <span className="d-flex justify-content-end">

                                                                    {checkStockTiker(stock.ticker) ?
                                                                        <Link title="Delete" className="me-2 btn btn-danger shadow btn-xs sharp" onClick={() => { deleteStockPortofolio(stock.ticker) }}>
                                                                            <i className="fa fa-close color-danger"></i>
                                                                        </Link>
                                                                        :
                                                                        <Link
                                                                            className="me-2 btn btn-primary shadow btn-xs sharp"
                                                                            title="Add"
                                                                            onClick={() => { addStockPortofolio(stock) }}
                                                                        >
                                                                            <i className="fas fa-pencil-alt color-muted"></i>
                                                                        </Link>}


                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>

                                    </Card.Body>
                                    <ReactPaginate
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
                                    />
                                </Card>
                            </Col >
                        </div>
                    </div>
                    <div className='col-xxl-3 col-xl-4'>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card messages ">
                                    <div className="card-header border-0 p-4 pb-0 ">
                                        <div>
                                            <h3 className="heading">Stock Investment Portofolio</h3>
                                        </div>

                                    </div>

                                    <div className="card-body loadmore-content  recent-activity-wrapper p-4" id="RecentActivityContent">
                                        <div className="input-group search-area mb-3">
                                            <input type="text" className="form-control" placeholder="Input level of risk" />
                                            {/* <span className="input-group-text">
                                            <Link to={"#"}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.3" d="M16.6751 19.4916C16.2194 19.036 16.2194 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9916 22.5084C23.4473 22.964 23.4473 23.7027 22.9916 24.1583C22.536 24.6139 21.7973 24.6139 21.3417 24.1583L16.6751 19.4916Z" fill="#01A3FF"></path>
                                            <path d="M12.8333 18.6667C16.055 18.6667 18.6667 16.055 18.6667 12.8334C18.6667 9.61169 16.055 7.00002 12.8333 7.00002C9.61166 7.00002 6.99999 9.61169 6.99999 12.8334C6.99999 16.055 9.61166 18.6667 12.8333 18.6667ZM12.8333 21C8.323 21 4.66666 17.3437 4.66666 12.8334C4.66666 8.32303 8.323 4.66669 12.8333 4.66669C17.3436 4.66669 21 8.32303 21 12.8334C21 17.3437 17.3436 21 12.8333 21Z" fill="#01A3FF"></path>
                                            </svg>
                                            </Link>
                                        </span> */}
                                        </div>
                                        {listStockPortofolio.map((stock, ind) => (
                                            <div className="align-items-center student" key={ind}>
                                                <div className='d-flex justify-content-space-between'>
                                                    <div className="d-flex">
                                                        <span className="me-3 me-lg-2">
                                                            {ind + 1}
                                                        </span>
                                                        <div className="user-info">
                                                            <h6 className="name">{stock.ticker}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="justify-content-end">
                                                        <span className="justify-content-end btn-xs sharp">
                                                            <Link className="btn btn-danger shadow btn-xs sharp" title="Delete"
                                                                onClick={() => { deleteStockPortofolio(stock.ticker) }}
                                                            >
                                                                <i className="fa fa-close color-danger"></i>
                                                            </Link>
                                                        </span>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="card-footer text-center border-0 pt-0">
                                        <Link className="btn btn-block btn-primary  dlab-load-more" >Start</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortofolioOptimization;