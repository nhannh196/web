import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Col,
    Card,
    Table,
    Badge,
    Dropdown,
    Button,
    Modal
} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import DatePicker from "react-datepicker";
import '../../../../css/datepicker.css';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import "./optimization.css"
import ReactApexChart from "react-apexcharts";

const PortofolioComponent = () => {
    const [open, setOpen] = useState(false);
    //page curren
    const [pageCurrent, setPageCurrent] = useState();
    //check search
    const [searching, setSearching] = useState(false);
    //search stock id in table
    const [stockIdSeach, setStockIdSearch] = useState('');
    //data to search
    const [dataToSearching, setDataToSearching] = useState('');
    //list data portofolio view
    const [listDataPortofolioView, setlistDataPortofolioView] = useState([])
    //labels for pieChart
    const [labelsPieChart, setLabelsPieChart] = useState([])
    //series for pieChart
    const [seriesPieChart, setSeriesPieChart] = useState([])
    //data after portofolio
    const [dataPortofolio, setDataPortofolio] = useState({})
    //show portofolio
    const [showPortofolio, setShowPortofolio] = useState(false)
    //Loaing
    const [loading, setLoading] = useState(false);
    //Profit margin
    const [profitMargin, setProfitMargin] = useState(null);
    //message error
    const [messageError, setMessageError] = useState(null);
    //Sort with StockId
    const [sortStockId, setSortStockId] = useState(null);
    //Sort with Daily Profit
    const [sortDailyProfit, setSortDailyProfit] = useState(null);
    //Date to filter
    const [dateFilter, setDateFilter] = useState('');
    //Stock id to dilter
    const [stockIdFilter, setStockIdFilter] = useState('')
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
    const dataStocksDefault = JSON.parse(sessionStorage.getItem('dataStocksDefault'));
    useEffect(() => {
        // getListStock().then((stock) => { setListStocksView(stock.data) });
        setListStocksView(dataStocksDefault)
        //
    }, [])

    //Paging
    let itemsPerPage = 10
    // console.log(pageCurrent)
    useEffect(() => {
        if (pageCurrent > pageCount) {
            setCurrentItems(listStocksView.slice(0, itemsPerPage));
            setPageCurrent(0)
        } else {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(listStocksView.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listStocksView.length / itemsPerPage));
        }

    }, [itemOffset, itemsPerPage, listStocksView, sortStockId, sortDailyProfit, stockIdSeach, pageCount, searching,pageCurrent]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % listStocksView.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
        setPageCurrent(event.selected)
    };

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    //Get stock data
    const filterStock = () => {
        let dateRelease = ""
        if (dateFilter === "") {
            dateRelease = ""
        } else {
            dateRelease = formatDateToYYYYMMDD(dateFilter);
        }
        const data = {
            nameStock: stockIdFilter,
            dateRelease: dateRelease
        }
        return axios.post(
            `https://localhost:7053/api/Stocks/ViewPost`, data
        )
    }

    //
    const checkStockTiker = (stockId) => {
        let result = false
        if (listStockPortofolio !== null || listStockPortofolio !== undefined) {
            result = listStockPortofolio.some((stock) => {
                return stock.ticker === stockId
            })
        }
        return result
    }

    //Add Stock Portofolio
    const addStockPortofolio = (stock) => {
        setListStockPortofolio([...listStockPortofolio, stock])
    }
    //Delete Stock Portofolio
    const deleteStockPortofolio = (stock) => {
        let result = listStockPortofolio.filter((s) => {
            return s.ticker !== stock;
        })
        setListStockPortofolio([...result])
    }

    //function srot character ascending
    const sortCharacterAscending = (list, obj) => {
        return list.sort(function (a, b) {
            return a[obj].localeCompare(b[obj]);
        });
    }
    //function sort character descending
    const sortCharacterDescending = (list, obj) => {
        return list.sort(function (a, b) {
            return b[obj].localeCompare(a[obj]);
        });
    }

    //function sort number ascending
    // console.log(listStocksView)
    const sortNumerAscending = (list, obj) => {
        return list.sort(function (a, b) {
            return a[obj] - b[obj];
        });
    }
    //function sort numer descending
    const sortNumberDescending = (list, obj) => {
        return list.sort(function (a, b) {
            return b[obj] - a[obj];
        });
    }

    //hande sort stock id
    const handleSortStockId = () => {
        if (sortStockId === null) {
            setSortStockId(true)
            setListStocksView(sortCharacterAscending(listStocksView, "ticker"))
        } else {
            if (sortStockId === true) {
                setListStocksView(sortCharacterDescending(listStocksView, "ticker"))
                setSortStockId(!sortStockId)
            } else {
                setListStocksView(sortCharacterAscending(listStocksView, "ticker"))
                setSortStockId(!sortStockId)
            }
        }
    }


    //handle sort daily profits
    const handleSortDailyProfit = () => {
        if (sortDailyProfit === null) {
            setSortDailyProfit(true)
            setListStocksView(sortNumerAscending(listStocksView, "dailyProfit"))
        } else {
            if (sortDailyProfit === true) {
                setListStocksView(sortNumberDescending(listStocksView, "dailyProfit"))
                setSortDailyProfit(!sortDailyProfit)
            } else {
                setListStocksView(sortNumerAscending(listStocksView, "dailyProfit"))
                setSortDailyProfit(!sortDailyProfit)
            }
        }
    }

    useEffect(() => {
        if (listStockPortofolio.length < 2) {
            setMessageError(null)
        }
    }, [listStockPortofolio])



    //handle submit filter
    const handleSubmitFilter = () => {
        setLoading(true)
        filterStock()
            .then(response => {
                setListStocksView(response.data)
                setLoading(false)
            })
            .catch(error => { console.log(error) });
    }
    //handle clear filter
    const handleClearFilter = () => {
        setStockIdFilter("")
        setDateFilter("")

    }
    //handle reset filter
    const handleResetStockData = () => {
        setListStocksView(dataStocksDefault)
        setSortStockId(null)
        setSortDailyProfit(null)
        setSearching(false)
        setDataToSearching('')
    }

    //options for portofolio
    const options = [
        { value: true, label: "Daily" },
        { value: false, label: "Month" },
        // { value: "vanilla", label: "Vanilla" },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    // const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    //api portofolio for select stock
    const portofolioOfUsers = () => {
        const data = listStockPortofolio.map((stock) => stock.ticker)
        return axios.post(`https://localhost:7053/api/Stocks/QuadraticForSelectStock?mathWithDailyOrMonth=${selectedOption.value}`, data);
    }
    //api portofolio of system
    const portofolioOfSystems = (choose) => {
        return axios.post(`https://localhost:7053/api/Stocks/QuadraticForSystemChose?mathWithDailyOrMonth=${choose}`)
    }
    //method Round to four decimal places
    const parseValuesTo4Decimal = (value) => {
        return Number((value * 100).toFixed(4))
    }
    const findDailyProfit = (stockId) => {
        let result = null;
        listStockPortofolio.map((stock) => {
            if (stock.ticker === stockId) {
                result = stock.dailyProfit
            }
        })
        return result
    }
    //hande submit optimization
    const handleSubmitOptimization = () => {
        if (selectedOption === null) {
            setMessageError("Please select option!")
        } else {
            portofolioOfUsers()
                .then((response) => {
                    setDataPortofolio(response.data)
                    let labels = []
                    let series = []
                    let data = []
                    response.data.stockResults.map((stock) => {
                        let obj = {
                            ticker: stock.nameStock,
                            dailyProfit: findDailyProfit(stock.nameStock),
                            value: parseValuesTo4Decimal(stock.xValue),
                        }
                        data = [...data, obj]
                        if (stock.xValue > 0) {
                            labels = [...labels, `${stock.nameStock} (${parseValuesTo4Decimal(stock.xValue)} %)`]
                            series = [...series, parseValuesTo4Decimal(stock.xValue)]
                        }
                    })
                    if (response.data.sum < 1) {
                        labels = [...labels, "Not investing"]
                        series = [...series, parseValuesTo4Decimal(1 - response.data.sum)]
                    }
                    setLabelsPieChart(labels)
                    setSeriesPieChart(series)
                    setlistDataPortofolioView(data)
                    // console.log(seriesPieChart)
                })
                .catch((error) => {
                    console.log(error)
                })
            setShowPortofolio(!showPortofolio)
        }
    }
    //handle submit suggestion
    const handleSuggestions = (choose) => {
        setLoading(true)
        portofolioOfSystems(choose)
            .then((response) => {
                setDataPortofolio(response.data)
                let labels = []
                let series = []
                let data = []
                response.data.stockResults.map((stock) => {
                    let obj = {
                        ticker: stock.nameStock,
                        dailyProfit: findDailyProfit(stock.nameStock),
                        value: parseValuesTo4Decimal(stock.xValue),
                    }
                    data = [...data, obj]
                    if (stock.xValue > 0) {
                        labels = [...labels, `${stock.nameStock} (${parseValuesTo4Decimal(stock.xValue)} %)`]
                        series = [...series, parseValuesTo4Decimal(stock.xValue)]
                    }

                })
                if (response.data.sum < 1) {
                    labels = [...labels, "Not investing"]
                    series = [...series, parseValuesTo4Decimal(1 - response.data.sum)]
                }
                setLabelsPieChart(labels)
                setSeriesPieChart(series)
                setlistDataPortofolioView(data)
                setLoading(false)
                // console.log(seriesPieChart)
            })
            .catch((error) => {
                console.log(error)
            })
        setShowPortofolio(!showPortofolio)
    }
    //handle search
    const handleSearch = () => {
        if (searching === false) {
            setSearching(true)
            setDataToSearching(listStocksView)
            let dataSearch = listStocksView.filter((stock) => {
                return stock.ticker.includes(stockIdSeach.toUpperCase())
            })
            setListStocksView(dataSearch)
            setPageCurrent(0)
        } else {
            if (stockIdSeach === '') {
                setListStocksView(dataToSearching)
                setCurrentItems(listStocksView.slice(0, itemsPerPage));
                setPageCurrent(0)
            } else {
                let dataSearch = dataToSearching.filter((stock) => {
                    return stock.ticker.includes(stockIdSeach.toUpperCase())
                })
                setListStocksView(dataSearch)
                setCurrentItems(dataSearch.slice(0, itemsPerPage));
                setPageCurrent(0)
            }
        }

    }


    console.log(stockIdSeach)

    // console.log(stockIdSeach)
    return (
        <>
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
                                                    <input value={stockIdFilter} onChange={(e) => { setStockIdFilter(e.target.value) }} type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="STOCK ID" />
                                                </div>

                                                <div className="col-xl-3 col-xxl-6">
                                                    <DatePicker
                                                        className="form-control mb-xxl-0 mb-3"
                                                        dateFormat="yyyy-MM-dd"
                                                        selected={dateFilter}
                                                        onChange={(date) => setDateFilter(date)}
                                                        placeholderText='Choose a date'
                                                    />
                                                </div>
                                                <div className="col-xl-3 col-xxl-6">
                                                    <Button className="me-2" variant="warning" title="Click here to Search" onClick={() => { handleSubmitFilter(); setSearching(false); setStockIdSearch('') }}><i className="fa fa-search me-1"></i>
                                                        Filter
                                                    </Button>
                                                    <Button className="me-2" variant="danger" title="Click here to clear filter" onClick={() => handleClearFilter()}>
                                                        Clear
                                                    </Button>
                                                    <Button className="me-2" variant="outline-danger" onClick={() => handleResetStockData()}>
                                                        Reset list stocks
                                                    </Button>
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
                                        <Card.Header className='portofolio'>
                                            <div className="col-xl-3 col-xxl-3 input-container">
                                                {/* <i class="bi bi-search"></i>  */}
                                                <input value={stockIdSeach}
                                                    onChange={(e) => {
                                                        setStockIdSearch(e.target.value);
                                                        

                                                    }}
                                                    onKeyUp={(e) => {
                                                        handleSearch();
                                                        e.preventDefault()
                                                    }}
                                                    type="text" className="form-control mb-xl-0 mb-3 input-field" id="exampleFormControlInput1" placeholder="Search STOCK ID" />
                                            </div>

                                        </Card.Header>
                                        <Card.Body>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Link><strong onClick={() => {
                                                                handleSortStockId();
                                                                setSortDailyProfit(null)
                                                            }}>STOCK ID
                                                                {sortStockId && <i class="bi bi-arrow-up"></i>}
                                                                {(!sortStockId && sortStockId !== null) && <i class="bi bi-arrow-down"></i>}
                                                            </strong></Link>
                                                        </th>
                                                        <th>
                                                            <Link><strong onClick={() => {
                                                                handleSortDailyProfit();
                                                                setSortStockId(null)
                                                            }}>DAILY PROFIT
                                                                {sortDailyProfit && <i class="bi bi-arrow-up"></i>}
                                                                {(!sortDailyProfit && sortDailyProfit !== null) && <i class="bi bi-arrow-down"></i>}
                                                            </strong></Link>
                                                        </th>
                                                        <th>
                                                            <strong >STANDARD DEVIATION</strong>
                                                        </th>

                                                        <th>
                                                            <strong>DATE</strong>
                                                        </th>

                                                        <th>
                                                            <strong>ACTION</strong>
                                                        </th>


                                                    </tr>
                                                </thead>
                                                {loading ?
                                                    <h5 className='loading'>Loading...</h5>
                                                    :
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
                                                                            {listStockPortofolio.length < 10 ?
                                                                                checkStockTiker(stock.ticker) ?
                                                                                    <Link title="Delete" className="me-2 btn btn-danger shadow btn-xs sharp" onClick={() => { deleteStockPortofolio(stock.ticker) }}>
                                                                                        <i className="fa fa-close color-danger"></i>
                                                                                    </Link>
                                                                                    :
                                                                                    <Link
                                                                                        className="me-2 btn btn-primary shadow btn-xs sharp"
                                                                                        title="Add to Stock Investment Portofolio"
                                                                                        onClick={() => { addStockPortofolio(stock) }}
                                                                                    >
                                                                                        {/* <i className="fas fa-pencil-alt color-muted"></i> */}
                                                                                        {/* <i class="bi bi-plus-circle"></i> */}
                                                                                        <i class="bi bi-plus"></i>
                                                                                    </Link>
                                                                                :
                                                                                checkStockTiker(stock.ticker) ?
                                                                                    <Link title="Delete" className="me-2 btn btn-danger shadow btn-xs sharp" onClick={() => { deleteStockPortofolio(stock.ticker) }}>
                                                                                        <i className="fa fa-close color-danger"></i>
                                                                                    </Link>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                }
                                            </Table>
                                        </Card.Body>
                                        <ReactPaginate
                                            nextLabel=">"
                                            onPageChange={(e) => { handlePageClick(e) }
                                            }
                                            pageRangeDisplayed={2}
                                            marginPagesDisplayed={2}
                                            pageCount={pageCount}
                                            forcePage={pageCurrent}
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
                                        // renderOnZeroPageCount={null}
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
                                            <Dropdown className='suggestion-system'>
                                                <Dropdown.Toggle variant="primary">
                                                    Suggestion of system
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => { handleSuggestions(true) }}>Daily</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { handleSuggestions(false) }}>Month</Dropdown.Item>
                                                    {/* <Dropdown.Item >Link 3</Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Select
                                                className='options-portofolio'
                                                defaultValue={selectedOption?.label}
                                                onChange={(e) => { setSelectedOption(e); setMessageError("") }}
                                                options={options}
                                            // style={{
                                            //     lineHeight: "40px",
                                            //     color: "#7e7e7e",
                                            //     paddingLeft: " 15px",
                                            // }}
                                            />
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
                                            {messageError && <div className='messageError'>{messageError}</div>}
                                            {listStockPortofolio.length < 1 ?
                                                <>
                                                    <div>Please add 2 to 10 stock</div>
                                                </>
                                                :
                                                listStockPortofolio.length < 2 ?
                                                    <Link className="btn btn-block btn-danger dlab-load-more" onClick={(e) => { setListStockPortofolio([]) }}>Clear All</Link>
                                                    :
                                                    <>
                                                        <Link className="btn btn-block btn-primary dlab-load-more" onClick={(e) => { handleSubmitOptimization(); console.log(messageError) }}>Start</Link>
                                                        <Link className="btn btn-block btn-danger dlab-load-more" onClick={(e) => { setListStockPortofolio([]); console.log(messageError) }}>Clear All</Link>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="modal container-fluid modal-portofolio" show={showPortofolio} >
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h6 className="modal-title">View</h6> */}
                        <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowPortofolio(!showPortofolio); setLabelsPieChart([]); setSeriesPieChart([]); setlistDataPortofolioView([]) }//dispatch({ type: 'addNewAdmin' })
                        }>

                        </Button>
                    </div>

                    <div className="modal-body portofolio">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className='row main-card'>
                                    <div className='col-xxl-7 col-xl-9'>
                                        <div className='row>'>
                                            <Col lg={12}>
                                                <Card>
                                                    <Card.Header className='portofolio'>
                                                        <Card.Title>STOCK</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {dataPortofolio.rr > 0 && <h6>Estimated profit: {dataPortofolio.rr.toFixed(4)}%</h6>}
                                                        {dataPortofolio.sum > 0 && <h6>Sum of rate: {parseValuesTo4Decimal(dataPortofolio.sum)}%</h6>}
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <strong>STOCK ID</strong>
                                                                    </th>
                                                                    {/* <th>
                                                                        <strong>DAILY PROFIT</strong>
                                                                    </th> */}
                                                                    <th>
                                                                        <strong>INVESTMENT RATIO</strong>
                                                                    </th>
                                                                    {/* <th>
                                                                        <strong >STANDARD DEVIATION</strong>
                                                                    </th> */}
                                                                </tr>
                                                            </thead>
                                                            {loading ?
                                                                <h5 className='loading'>Loading...</h5>
                                                                :
                                                                <tbody>
                                                                    {listDataPortofolioView.map((stock, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    <strong>{stock.ticker}</strong>
                                                                                </td>
                                                                                {/* <td>{stock.dailyProfit}</td> */}
                                                                                <td>{stock.value} %</td>
                                                                                {/* {dataPortofolio?.stockResults.map((s, index) => {
                                                                                    stock.ticker === s.nameStock &&
                                                                                        <td>
                                                                                            <strong>{parseValuesTo4Decimal(s.xValue)}</strong>
                                                                                        </td>
                                                                                })} */}


                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            }
                                                        </Table>

                                                    </Card.Body>

                                                </Card>
                                            </Col >
                                        </div>
                                    </div>
                                    <div className='col-xxl-5 col-xl-3 wow fadeInUp' data-wow-delay="1s">
                                        <div className="card">
                                            <div className="card-header border-0">
                                            </div>
                                            <div className="card-body text-center pt-0 pb-2">
                                                <div id="pieChart" className="d-inline-block">
                                                    <ReactApexChart
                                                        options={
                                                            {
                                                                chart: {
                                                                    type: 'pie',
                                                                    height: 200,
                                                                    // innerRadius: 100,
                                                                },
                                                                dataLabels: {
                                                                    enabled: true,
                                                                    style: {
                                                                        fontSize: '9px'
                                                                    }
                                                                },
                                                                labels: labelsPieChart,
                                                                stroke: {
                                                                    width: 0.5,
                                                                },
                                                                plotOptions: {
                                                                    pie: {
                                                                        startAngle: 0,
                                                                        endAngle: 360,
                                                                        // donut: {
                                                                        // 	size: '70%',
                                                                        // },
                                                                    },
                                                                },
                                                                colors: ['#0080FF', '#00A86B', '#FF801A', '#E62020', '#A020F0',
                                                                    '#5218FA', '#1B7931', '#FFDB58', '#FF878D', '#B57EDC'],
                                                                legend: {
                                                                    position: 'bottom',
                                                                    show: true
                                                                },
                                                                responsive: [{
                                                                    breakpoint: 600,
                                                                    options: {
                                                                        chart: {
                                                                            width: 400
                                                                        },
                                                                    }
                                                                }]
                                                            }
                                                        }
                                                        series={seriesPieChart} type="pie"
                                                        height={500}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default PortofolioComponent;