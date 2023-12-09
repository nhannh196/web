import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import "../../../../css/number-ratio.css";
import ReactApexChart from "react-apexcharts";
import { axiosInstance } from '../../../../services/AxiosConfig';
import DrawChart from '../../DrawChart/DrawChart';

//Paging
let ITEMS_PER_PAGE = 10

const PortofolioComponent = () => {
    const [open, setOpen] = useState(false);
    //stockName to draw
    const [stockNameDraw, setStockNameDraw] = useState('');
    //show chart
    const [showChart, setShowChart] = useState(false);
    //list my stockname favorite
    const [listStockNameFavorite, setListStockNameFavorite] = useState([])
    //list my favorite
    const [listMyFavorite, setListMyFavorite] = useState([])
    //loading Optimize portofolio view
    const [loadingOptimizePortofolioView, setLoadingOptimizePortofolioView] = useState(false)
    //loading Stock Investment Portofolio
    const [loadingStockInvestmentPortofolio, setLoadingStockInvestmentPortofolio] = useState(false);
    //Desired quantity
    const [desiredQuantity, setDesiredQuantity] = useState()
    //page current
    const [pageCurrent, setPageCurrent] = useState(0);
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
    // const [currentItems, setCurrentItems] = useState(listStocksView);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const dataStocksDefault = useMemo(() => JSON.parse(sessionStorage.getItem('dataStocksDefault')), []);
    useEffect(() => {
        // getListStock().then((stock) => { setListStocksView(stock.data) });
        setListStocksView(dataStocksDefault)
        //
    }, [dataStocksDefault])


    // console.log(pageCurrent)
    useEffect(() => {
        setPageCount(Math.ceil(listStocksView.length / ITEMS_PER_PAGE));
    }, [listStocksView]);

    const currentItems = useMemo(() => {
        const itemOffset = pageCurrent * ITEMS_PER_PAGE % listStocksView.length
        const endOffset = itemOffset + ITEMS_PER_PAGE;
        return listStocksView.slice(itemOffset, endOffset)
    }, [listStocksView, pageCurrent,sortStockId,sortDailyProfit])
    //load list favorite
    useEffect(() => {
        getListMyFavorite()
            .then((respone) => {
                let stocksName = respone.data.map((stock) => stock.stockName)
                setListMyFavorite(respone.data)
                setListStockNameFavorite(stocksName)
            })
    }, [])

    //handle add favorite
    const handleAddFavorite = (stockName) => {
        addFavorite(stockName)
            .then(() => {
                getListMyFavorite()
                    .then((respone) => {
                        let stocksName = respone.data.map((stock) => stock.stockName)
                        setListMyFavorite(respone.data)
                        setListStockNameFavorite(stocksName)
                        console.log(respone.data)
                    }).then((error) => {
                        console.log(error)
                        setListMyFavorite([])
                        setListStockNameFavorite([])
                    })
            })
            .catch(error => console.log(error))
    }
    //handle delete favorite
    const handleDeleteFavorite = (stockName) => {
        let stockDelete = listMyFavorite.find((stock) => stock.stockName === stockName)
        console.log(stockDelete)
        deleteFavorite(stockDelete.id)
            .then(() => {
                getListMyFavorite()
                    .then((respone) => {
                        let stocksName = respone.data.map((stock) => stock.stockName)
                        setListMyFavorite(respone.data)
                        setListStockNameFavorite(stocksName)
                    })
            })
            .catch(error => console.log(error))
    }

    //api get list favorite
    const getListMyFavorite = () => {
        return axiosInstance.get(`/api/WatchlistStocks/getMyId`)
    }
    //api add favorite
    const addFavorite = (nameStock) => {
        return axiosInstance.post(`/api/WatchlistStocks?NameStock=${nameStock}`);
    }
    //apir delete favorite
    const deleteFavorite = (id) => {
        return axiosInstance.delete(`/api/WatchlistStocks/${id}`)
    }


    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
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
        return axiosInstance.post(`/api/Stocks/QuadraticForSelectStock?mathWithDailyOrMonth=${false}`, data);
    }
    //api portofolio of system
    // const portofolioOfSystems = (choose) => {
    //     return axiosInstance.post(`/api/Stocks/QuadraticForSystemChose?mathWithDailyOrMonth=${choose}`)
    // }

    //api get stock from system
    const getStockFromSystem = () => {
        return axiosInstance.post(`/api/Stocks/GetListStockName?quantity=${desiredQuantity}`)
    }
    //method Round to four decimal places
    const parseValuesTo4Decimal = (value) => {
        return Number(value.toFixed(4))
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
        setLoadingOptimizePortofolioView(true)
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
                        value: parseValuesTo4Decimal(stock.xValue * 100),
                    }
                    data = [...data, obj]
                    if (stock.xValue > 0) {
                        labels = [...labels, `${stock.nameStock} (${parseValuesTo4Decimal(stock.xValue * 100)} %)`]
                        series = [...series, parseValuesTo4Decimal(stock.xValue * 100)]
                    }
                })

                if (response.data.sum < 1) {
                    labels = [...labels, "Not investing"]
                    series = [...series, parseValuesTo4Decimal(1 - response.data.sum)]
                }
                setLabelsPieChart(labels)
                setSeriesPieChart(series)
                setlistDataPortofolioView(sortNumberDescending(data, "value"))
                setLoadingOptimizePortofolioView(false)
                // console.log(seriesPieChart)
            })
            .catch((error) => {
                console.log(error)
            })
        setShowPortofolio(!showPortofolio)
    }

    const validateNumber = (input) => {
        if (input === null || input === undefined || input.trim() === '') {
            return false;
        }
        if (isNaN(input)) {
            return false;
        }
        return true;
    }
    //handle submit suggestion
    const handleSuggestions = () => {
        if (desiredQuantity === null || desiredQuantity === undefined || desiredQuantity === '') {
            setMessageError('Please input desired quantity stock')
        } else {
            if (validateNumber(desiredQuantity)) {
                if (desiredQuantity < 1) {
                    setMessageError('Please input desired quantity > 0')
                } else if (desiredQuantity > 25) {
                    setMessageError('Please input desired quantity <= 25')
                } else {
                    setLoadingStockInvestmentPortofolio(true)
                    getStockFromSystem()
                        .then((response) => {
                            setLoadingStockInvestmentPortofolio(false)
                            setListStockPortofolio(response.data)
                        }).catch(error => console.log(error))
                    setMessageError('')
                }
            } else {
                setMessageError('Please input number')
            }
        }
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
                // setCurrentItems(dataToSearching.slice(0, itemsPerPage));
                setSearching(false)
                setPageCurrent(0)
            } else {
                let dataSearch = dataToSearching.filter((stock) => {
                    return stock.ticker.includes(stockIdSeach.toUpperCase())
                })
                console.log(dataSearch.slice(0, ITEMS_PER_PAGE))
                setListStocksView(dataSearch)
                // setCurrentItems(dataSearch.slice(0, itemsPerPage));
                setPageCurrent(0)
            }
        }

    }
    const isNotFound = !currentItems?.length
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
                        <div className='col-xxl-8 col-xl-9'>
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
                                                    type="text" className="form-control mb-xl-0 mb-3 input-field" id="exampleFormControlInput1" placeholder="Search STOCK CODE" />
                                            </div>

                                        </Card.Header >
                                        <Card.Body className='portofolio-body'>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Link><strong onClick={() => {
                                                                handleSortStockId();
                                                                setSortDailyProfit(null)
                                                            }}>STOCK CODE
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
                                                            <strong >SHARPE RATIO</strong>
                                                        </th>

                                                        <th>
                                                            <strong>DATE</strong>
                                                        </th>

                                                        <th>
                                                            <strong>ACTION</strong>
                                                        </th>

                                                        <th>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {loading ?
                                                    <h5 className='loading'>Loading...</h5>
                                                    :
                                                    <tbody>
                                                        {!isNotFound && (
                                                            currentItems.map((stock, index) => {
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
                                                                        <td>{stock.dtyyyymmdd}</td>

                                                                        <td>
                                                                            <span className="d-flex justify-content-end">
                                                                                <Link className="me-2 shadow btn-xs sharp"
                                                                                    onClick={() => {
                                                                                        setShowChart(!showChart);
                                                                                        setStockNameDraw(stock.ticker)
                                                                                    }}
                                                                                ><i class="bi bi-bar-chart-fill"></i></Link>
                                                                                {listStockPortofolio.length < 25 ?
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
                                                                        {listStockNameFavorite.includes(stock.ticker) ?
                                                                            <td className='td-favorite'>
                                                                                <i onClick={() => handleDeleteFavorite(stock.ticker)} class="bi bi-heart-fill" title='Delete from favorites'></i>
                                                                            </td>
                                                                            :
                                                                            <td >
                                                                                <i onClick={() => handleAddFavorite(stock.ticker)} class="bi bi-heart-fill" title='Add to favorites'></i>
                                                                            </td>
                                                                        }
                                                                    </tr>
                                                                )
                                                            })
                                                        )}
                                                        {isNotFound && (
                                                            <tr style={{ cursor: 'default', pointerEvents: 'none' }}>
                                                                <td colSpan={6}>
                                                                    <div className='d-flex flex-column py-2 align-items-center justify-content-center'>
                                                                        <h4>No Result Found</h4>
                                                                        <span>Please try again with another keywords</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                }
                                            </Table>
                                        </Card.Body>
                                        <ReactPaginate
                                            nextLabel=">"
                                            onPageChange={(e) => { handlePageClick(e) }
                                            }
                                            pageRangeDisplayed={5}
                                            marginPagesDisplayed={3}
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
                        <div className='col-xxl-4 col-xl-3'>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card messages ">
                                        <div className="card-header border-0 p-4 pb-0 ">
                                            <div>
                                                <h3 className="heading">Stock Investment Portofolio</h3>
                                            </div>

                                        </div>

                                        <div className="card-body loadmore-content  recent-activity-wrapper p-4" id="RecentActivityContent">
                                            {/* <Dropdown className='suggestion-system'>
                                                <Dropdown.Toggle variant="primary">
                                                    Suggestion of system
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => { handleSuggestions(true) }}>Daily</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { handleSuggestions(false) }}>Month</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                            <input className="form-control mb-xl-0 mb-3 input-field" type='text' placeholder='Desired quantity' value={desiredQuantity} onChange={(e) => setDesiredQuantity(e.target.value)}></input>
                                            {messageError && <div className='messageError'>{messageError}</div>}
                                            <Link className="btn btn-block btn-primary dlab-load-more btn-portofolio" onClick={(e) => { handleSuggestions(); console.log(messageError) }}>Suggestion stock of systems</Link>

                                            {
                                                loadingStockInvestmentPortofolio ?
                                                    <h5 style={{ padding: '4px 0' }}>Please wait...</h5>
                                                    :
                                                    listStockPortofolio.map((stock, ind) => (


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

                                                    ))
                                            }

                                        </div>
                                        <div className="card-footer text-center border-0 pt-0">

                                            {listStockPortofolio.length < 1 ?
                                                <>
                                                    <div>Or</div>
                                                    <div>Please add 2 to 25 stock from left table</div>
                                                </>
                                                :
                                                listStockPortofolio.length < 2 ?
                                                    <Link className="btn btn-block btn-danger dlab-load-more btn-portofolio" onClick={(e) => { setListStockPortofolio([]) }}>Clear All</Link>
                                                    :
                                                    <>
                                                        <Link className="btn btn-block btn-primary dlab-load-more btn-portofolio" onClick={(e) => { handleSubmitOptimization(); console.log(messageError) }}>Start</Link>
                                                        <Link className="btn btn-block btn-danger dlab-load-more btn-portofolio" onClick={(e) => { setListStockPortofolio([]); console.log(messageError) }}>Clear All</Link>
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
                        <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowPortofolio(!showPortofolio); setLabelsPieChart([]); setSeriesPieChart([]); setlistDataPortofolioView([]); setLoadingOptimizePortofolioView(false) }//dispatch({ type: 'addNewAdmin' })
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
                                                        {loadingOptimizePortofolioView ?
                                                            <h4>Optimizing...</h4>
                                                            :
                                                            <>
                                                                {dataPortofolio.rr > 0 && <h6>Estimated profit: {dataPortofolio.rr.toFixed(4)}%</h6>}
                                                                {dataPortofolio.sum > 0 && <h6>Sum of rate: {parseValuesTo4Decimal(dataPortofolio.sum) * 100}%</h6>}
                                                                <Table responsive>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                <strong>STOCK CODE</strong>
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
                                                            </>
                                                        }
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
            <Modal className="modal container-fluid modal-portofolio" show={showChart}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{`Stock code: ${stockNameDraw}`}</h4>
                        <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowChart(!showChart) }
                        }>
                        </Button>
                    </div>
                    <div className="modal-body portofolio">
                        <DrawChart stockName={stockNameDraw} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PortofolioComponent;