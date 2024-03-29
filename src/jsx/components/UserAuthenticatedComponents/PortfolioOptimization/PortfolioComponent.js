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
import "../../../../css/number-ratio.css";
import ReactApexChart from "react-apexcharts";
import { axiosInstance } from '../../../../services/AxiosConfig';
import DrawChart from '../../DrawChart/DrawChart';
import { baseURL } from '../../../../services/AxiosConfig';
import "./optimization.css"

//Paging
let ITEMS_PER_PAGE = 13


const PortfolioComponent = () => {
    const [open, setOpen] = useState(false);
    //date to draw
    const [dateDraw, setDateDraw] = useState('')
    //stockName to draw
    const [stockNameDraw, setStockNameDraw] = useState('');
    //show chart
    const [showChart, setShowChart] = useState(false);
    //list my stockname favorite
    const [listStockNameFavorite, setListStockNameFavorite] = useState([])
    //list my favorite
    const [listMyFavorite, setListMyFavorite] = useState([])
    //loading Optimize portfolio view
    const [loadingOptimizeportfolioView, setLoadingOptimizeportfolioView] = useState(false)
    //loading Stock Investment portfolio
    const [loadingStockInvestmentportfolio, setLoadingStockInvestmentportfolio] = useState(false);
    //Desired quantity
    const [desiredQuantity, setDesiredQuantity] = useState()
    //page current
    const [pageCurrent, setPageCurrent] = useState(0);
    //check search
    const [searching, setSearching] = useState(false);
    //search stock id in table
    const [stockIdSeach, setStockIdSearch] = useState('');
    //data to search
    // const [dataToSearching, setDataToSearching] = useState('');
    //list data portfolio view
    const [listDataportfolioView, setlistDataportfolioView] = useState([])
    //labels for pieChart
    const [labelsPieChart, setLabelsPieChart] = useState([])
    //series for pieChart
    const [seriesPieChart, setSeriesPieChart] = useState([])
    //data after portfolio
    const [dataportfolio, setDataportfolio] = useState({})
    //show portfolio
    const [showportfolio, setShowportfolio] = useState(false)
    //Loaing
    const [loading, setLoading] = useState(false);
    //Profit margin
    // const [profitMargin, setProfitMargin] = useState(null);
    //message error
    const [messageError, setMessageError] = useState(null);
    //Sort with StockId
    // const [sortStockId, setSortStockId] = useState(null);
    //Sort with Daily Profit
    // const [sortDailyProfit, setSortDailyProfit] = useState(null);
    //Date to filter
    const [dateFilter, setDateFilter] = useState('');
    //Stock id to dilter
    const [stockIdFilter, setStockIdFilter] = useState('')
    //List Stock portfolio
    const [listStockportfolio, setListStockportfolio] = useState(() => {
        const result = JSON.parse(sessionStorage.getItem('listStockportfolio'))
        return result || []
    });

    //List stock view
    // const [listStocksView, setListStocksView] = useState([])
    //Page load
    // const [currentItems, setCurrentItems] = useState(listStocksView);
    const [pageCount, setPageCount] = useState(0);

    // sortDirection
    const [sortDirection, setSortDirection] = useState(true);
    //sort colum
    const [sortColumn, setSortColumn] = useState('StockName');
    // name stock
    const [nameStock, setNameStock] = useState('');
    //date
    const [dateRelease, setDateRelease] = useState('')
    // item in a view page
    const [currentItems, setCurrentItems] = useState([])
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const dataStocksDefault = useMemo(() => JSON.parse(sessionStorage.getItem('dataStocksDefault')), []);
    useEffect(() => {
        if (window.innerHeight >= 900) {
            ITEMS_PER_PAGE = 13
        } else if (window.innerHeight >= 750 && window.innerHeight < 900) {
            ITEMS_PER_PAGE = 11
        } else {
            ITEMS_PER_PAGE = 7
        }
    }, [])
    //api load stock
    const loadData = () => {
        setLoading(true)
        let data = {
            nameStock: nameStock,
            dateRelease: dateRelease
        }
        axiosInstance.post(`/api/Stocks/ViewStock?page=${pageCurrent + 1}&pageSize=${ITEMS_PER_PAGE}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`, data)
            .then(respone => {
                setCurrentItems(respone.data.data)
                setPageCount(respone.data.totalPages)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        loadData()
    }, [pageCurrent, nameStock, dateRelease, sortDirection, sortColumn])

    //load list favorite
    useEffect(() => {
        getListMyFavorite()
            .then((respone) => {
                let stocksName = respone.data.map((stock) => stock.stockName)
                setListMyFavorite(respone.data)
                setListStockNameFavorite(stocksName)
            })
            .catch(error => console.log(error))
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
                    }).catch((error) => {
                        console.log('Error add favorite', error)
                        // setListMyFavorite([])
                        // setListStockNameFavorite([])
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
                    .catch(error => console.log(error))
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



    //
    const checkStockTiker = (stockId) => {
        let result = false
        if (listStockportfolio !== null || listStockportfolio !== undefined) {
            result = listStockportfolio.some((stock) => {
                return stock.ticker === stockId
            })
        }
        return result
    }

    //Add Stock portfolio
    const addStockportfolio = (stock) => {
        setListStockportfolio([...listStockportfolio, stock])
    }
    //Delete Stock portfolio
    const deleteStockportfolio = (stock) => {
        let result = listStockportfolio.filter((s) => {
            return s.ticker !== stock;
        })
        setListStockportfolio([...result])
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
        setSortColumn('StockName')
        setSortDirection(!sortDirection)
    }


    //handle sort daily profits
    const handleSortDailyProfit = () => {
        setSortColumn('DailyProfit')
        setSortDirection(!sortDirection)
    }

    useEffect(() => {
        if (listStockportfolio.length < 2) {
            setMessageError(null)
        }
    }, [listStockportfolio])



    //handle submit filter
    const handleSubmitFilter = () => {
        setNameStock(stockIdFilter)
        if (dateFilter === "") {
            setDateRelease(dateFilter)
        } else {
            setDateRelease(formatDateToYYYYMMDD(dateFilter));
        }
    }
    //handle clear filter
    const handleClearFilter = () => {
        setStockIdFilter("")
        setDateFilter("")

    }
    //handle reset filter
    const handleResetStockData = () => {
        setNameStock("")
        setDateRelease("")
    }

    //api portfolio for select stock
    const portfolioOfUsers = () => {
        const data = listStockportfolio.map((stock) => stock.ticker)
        return axiosInstance.post(`/api/Stocks/QuadraticForSelectStock?mathWithDailyOrMonth=${false}`, data);
    }

    //api get stock from system
    const getStockFromSystem = () => {
        return axiosInstance.post(`/api/Stocks/GetListStockName?quantity=${25}`)
    }
    //method Round to four decimal places
    const parseValuesTo4Decimal = (value) => {
        return Number(value.toFixed(4))
    }
    const findDailyProfit = (stockId) => {
        let result = null;
        listStockportfolio.map((stock) => {
            if (stock.ticker === stockId) {
                result = stock.dailyProfit
            }
        })
        return result
    }
    const [listDataToDrawDailyProfit, setListDataToDrawDailyProfit] = useState([])
    //api get stock chart
    const getChart = (stockName) => {
        return axiosInstance.post(`/api/Stocks/GetStockChart?ticker=${stockName}&option=1`)
    }

    useEffect(() => {
        // setListDataToDrawDailyProfit([])
        let dataStock = []
        Promise.all(
            listStockportfolio.map(async (stock) => {
                let stockData = await getChart(stock.ticker)
                let dailyProfitChart = []
                let dateChart = []
                stockData.data.listChart.map((data) => {
                    dailyProfitChart = [...dailyProfitChart, data.dailyProfit]
                    dateChart = [...dateChart, data.dtyyyymmdd]
                })
                let obj = {
                    stockName: stock.ticker,
                    profitAverage: stockData.data.profitAverage,
                    standardDeviation: stockData.data.standardDeviation,
                    dailyProfitChart: dailyProfitChart.reverse(),
                    dateChart: dateChart.reverse()
                }
                dataStock = [...dataStock, obj]
                //    setListDataToDrawDailyProfit([...listDataToDrawDailyProfit,stockData.data])
            })
        ).then(() => setListDataToDrawDailyProfit(dataStock))
            .catch(error => console.log(error))
    }, [listStockportfolio])
    // console.log(listDataToDrawDailyProfit)

    const [showZoom, setShowZoom] = useState('')
    //handle show zoom
    const handleShowZoom = (stockName) => {
        if (showZoom === stockName) {
            setShowZoom('')
        } else {
            setShowZoom(stockName)
        }
    }
    // chart default
    const chartDefault = (stockName) => {
        let dataDailyProfit = []
        let date = []
        const dataToDraw = listDataToDrawDailyProfit.find((stock) => {
            return stock.stockName === stockName
        })

        let obj = {
            series: [
                {
                    name: "Daily Profit",
                    data: dataToDraw.dailyProfitChart,
                },
            ],
            options: {

                chart: {
                    type: "area",
                    group: "social",
                    background: '#fff',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                tooltip: {
                    enabled: false,
                    marker: {
                        show: true,
                        fillColors: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [2, 2],
                    // colors: ["#1c9ef9", "#709fba"],
                    curve: "smooth",
                },
                // legend: {
                //     tooltipHoverFormatter: function (val, opts) {
                //         return (
                //             val +
                //             " - " +
                //             opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                //             ""
                //         );
                //     },
                //     labels: {
                //         colors: "#787878",
                //     },
                // },
                // markers: {
                //     size: 2,
                //     border: 0,
                //     //strokeColor: "#fff",
                //     // colors: ["#1c9ef9", "#709fba"],

                //     hover: {
                //         size: 4,
                //     },
                // },

                xaxis: {
                    labels: {
                        show: false,
                    },

                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: true,
                    },
                    categories: dataToDraw.dateChart,
                },
                yaxis: {

                    labels: {
                        show: false,
                        style: {
                            colors: "#3e4954",
                            fontSize: "12px",
                            fontFamily: "Poppins",
                            fontWeight: 80,
                        },



                    },
                },
                fill: {
                    // colors: ["#1c9ef9", "#709fba"],
                    // type: "solid",
                    // opacity: 0.08,
                    // type: 'gradient',
                },
                grid: {
                    borderColor: '#ffffff1a',
                },
            },

        }
        return obj
    }

    const chartZoom = (stockName) => {
        let dataDailyProfit = []
        let date = []
        const dataToDraw = listDataToDrawDailyProfit.find((stock) => {
            return stock.stockName === stockName
        })

        let obj = {
            series: [
                {
                    name: "Daily Profit",
                    data: dataToDraw.dailyProfitChart,
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "area",
                    group: "social",
                    background: '#fff',
                    toolbar: {
                        show: true,
                    },
                    zoom: {
                        enabled: true,
                    },
                },
                tooltip: {
                    // enabled: false,
                    marker: {
                        show: true,
                        fillColors: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [2, 2],
                    // colors: ["#1c9ef9", "#709fba"],
                    curve: "smooth",
                },

                markers: {
                    size: 4,
                    border: 0,
                    //strokeColor: "#fff",
                    // colors: ["#1c9ef9", "#709fba"],

                    hover: {
                        size: 5,
                    },
                },

                xaxis: {
                    // labels:{
                    //     show: false,
                    // },

                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: true,
                    },
                    categories: dataToDraw.dateChart,
                },
                yaxis: {

                    labels: {
                        style: {
                            colors: "#3e4954",
                            fontSize: "12px",
                            fontFamily: "Poppins",
                            fontWeight: 80,
                        },



                    },
                },
                fill: {
                    // colors: ["#1c9ef9", "#709fba"],
                    // type: "solid",
                    // opacity: 0.08,
                    // type: 'gradient',
                },
                grid: {
                    borderColor: '#ffffff1a',
                },
            },
            profitAverage: dataToDraw.profitAverage,
            standardDeviation: dataToDraw.standardDeviation,
        }
        return obj
    }



    //hande submit optimization
    const handleSubmitOptimization = () => {
        setLoadingOptimizeportfolioView(true)
        portfolioOfUsers()
            .then((response) => {
                setDataportfolio(response.data)
                let labels = []
                let series = []
                let data = []
                // let total = 0
                let responseStockResults = sortNumberDescending(response.data.stockResults, "xValue")
                // console.log(responseStockResults)
                responseStockResults.map((stock) => {
                    let obj = {}

                    obj = {
                        ticker: stock.nameStock,
                        // dailyProfit: findDailyProfit(stock.nameStock),
                        value: Number((parseValuesTo4Decimal((stock.xValue / response.data.sum)) * 100).toFixed(2)),
                        expectedReturn: parseValuesTo4Decimal(stock.expectedReturn),
                        standardDeviation: parseValuesTo4Decimal(stock.standardDeviation)

                    }
                    console.log(obj.value)
                    console.log(0.3702 * 100)
                    data = [...data, obj]

                })
                // response.data.stockResults.map((stock) => {
                //     let obj = {
                //         ticker: stock.nameStock,
                //         dailyProfit: findDailyProfit(stock.nameStock),
                //         value: parseValuesTo4Decimal(stock.xValue * 100),
                //     }
                //     data = [...data, obj]
                //     if (stock.xValue > 0) {
                //         labels = [...labels, `${stock.nameStock} (${parseValuesTo4Decimal(stock.xValue * 100)} %)`]
                //         series = [...series, parseValuesTo4Decimal(stock.xValue * 100)]
                //         total += parseValuesTo4Decimal(stock.xValue * 100)
                //     }
                // })

                // if (total < 100) {
                //     labels = [...labels, "Not investing"]
                //     series = [...series, 100 - total]
                // }

                // setLabelsPieChart(labels)
                // setSeriesPieChart(series)
                setlistDataportfolioView(data)

                // console.log(seriesPieChart)
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setTimeout(() => { setLoadingOptimizeportfolioView(false) }, 3000)
            })
        setShowportfolio(!showportfolio)
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
    const checkStockInList = (stockFind, listStock) => {
        return listStock.some((stock) => {
            return stock.ticker === stockFind
        })
    }
    //handle submit suggestion
    const handleSuggestions = () => {
        if (desiredQuantity === null || desiredQuantity === undefined || desiredQuantity === '') {
            setMessageError('Please input desired quantity stock')
        } else {
            if (validateNumber(desiredQuantity)) {
                if (Number(desiredQuantity) < 1) {
                    setMessageError('Please input desired quantity > 0')
                } else if (Number(desiredQuantity) > 25) {
                    setMessageError('Please input desired quantity <= 25')
                } else if ((Number(desiredQuantity) + listStockportfolio.length) > 25) {
                    console.log(desiredQuantity)
                    setMessageError(`Please input desired quantity <= ${25 - listStockportfolio.length}, system we only optimize max 25 stocks`)
                } else {
                    setLoadingStockInvestmentportfolio(true)
                    getStockFromSystem()
                        .then((response) => {
                            console.log(response.data)
                            let quantity = Number(desiredQuantity)
                            let listSystem = []
                            response.data.map((stock) => {
                                if (quantity > 0) {
                                    if (!checkStockInList(stock.ticker, listStockportfolio)) {
                                        listSystem = [...listSystem, { ...stock, system: true }]
                                        quantity -= 1
                                    }
                                }
                            })
                            setListStockportfolio([...listStockportfolio, ...listSystem])
                            // console.log(listStockportfolio)
                        }).catch(error => console.log(error))
                        .finally(() => { setLoadingStockInvestmentportfolio(false) })
                    setMessageError('')
                }
            } else {
                setMessageError('Please input number')
            }
        }
    }
    //handle search
    const handleSearch = () => {
        setNameStock(stockIdSeach)
        setPageCurrent(0)
    }

    const isNotFound = !currentItems?.length
    let stockDraw = { stockName: stockNameDraw, date: dateDraw }

    const sizeChart = () => {
        let result = {};
        if (window.innerHeight >= 900) {
            result = { width: 1000, height: 690 }
        } else if (window.innerHeight >= 750 && window.innerHeight < 900) {
            result = { width: 860, height: 502 }
        } else {
            result = { width: 800, height: 360 }
        }
        return result
    }

    useEffect(() => {
        sessionStorage.setItem('listStockportfolio', JSON.stringify(listStockportfolio))
    }, [listStockportfolio])
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
                                            <div className="row filter-form">
                                                <div className='filter-form_input'>
                                                    <div >
                                                        <input value={stockIdFilter} onChange={(e) => { setStockIdFilter(e.target.value) }} type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="STOCK ID" />
                                                    </div>
                                                    <div >
                                                        <DatePicker
                                                            className="form-control mb-xxl-0 mb-3"
                                                            dateFormat="yyyy-MM-dd"
                                                            selected={dateFilter}
                                                            onChange={(date) => setDateFilter(date)}
                                                            placeholderText='Choose a date'
                                                        />
                                                    </div>
                                                </div>
                                                <div>
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
                                        <Card.Header className='portfolio'>
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
                                        <Card.Body className='portfolio-body'>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Link><strong onClick={() => {
                                                                handleSortStockId();
                                                                // setSortDailyProfit(null)
                                                            }}>STOCK CODE
                                                                {(sortColumn === 'StockName' && sortDirection === true) && <i class="bi bi-arrow-up"></i>}
                                                                {(sortColumn === 'StockName' && sortDirection === false) && <i class="bi bi-arrow-down"></i>}
                                                            </strong></Link>
                                                        </th>
                                                        <th>
                                                            <Link><strong onClick={() => {
                                                                handleSortDailyProfit();
                                                                // setSortStockId(null)
                                                            }}>DAILY RETURN
                                                                {(sortColumn === 'DailyProfit' && sortDirection === true) && <i class="bi bi-arrow-up"></i>}
                                                                {(sortColumn === 'DailyProfit' && sortDirection === false) && <i class="bi bi-arrow-down"></i>}
                                                            </strong></Link>
                                                        </th>
                                                        <th>
                                                            <strong >RISK</strong>
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

                                                <tbody>
                                                    {loading ?
                                                        <div class="spinner-border" role="status"
                                                        >
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        :
                                                        <>
                                                            {!isNotFound && (
                                                                currentItems.map((stock, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td title={
                                                                                `Stock: ${stock.ticker}\nDate: ${stock.dtyyyymmdd}\nOpen: ${stock.open}\nHigh: ${stock.high}\nLow: ${stock.low}\nClose: ${stock.close}\nVolume: ${stock.volume} 
                                                                        `
                                                                            }>
                                                                                <Link><strong>{stock.ticker}</strong></Link>
                                                                            </td>
                                                                            {stock.dailyProfit >= 0 ?
                                                                                <td className='positive-numbers'>{stock.dailyProfit}</td>
                                                                                :
                                                                                <td className='negative-numbers'>{stock.dailyProfit}</td>
                                                                            }
                                                                            <td className='risk-numbers'>{parseValuesTo4Decimal(stock.standardDeviation)}</td>
                                                                            <td>{stock.dtyyyymmdd}</td>

                                                                            <td>
                                                                                <div className="action-table">
                                                                                    <Link className="me-2 shadow btn-xs sharp"
                                                                                        onClick={() => {
                                                                                            setShowChart(!showChart);
                                                                                            setStockNameDraw(stock.ticker)
                                                                                            setDateDraw(stock.dtyyyymmdd)
                                                                                        }}
                                                                                    ><i class="bi bi-bar-chart-fill"></i></Link>
                                                                                    {listStockportfolio.length < 25 ?
                                                                                        checkStockTiker(stock.ticker) ?
                                                                                            <Link title="Delete" className="me-2 btn btn-danger shadow btn-xs sharp" onClick={() => { deleteStockportfolio(stock.ticker) }}>
                                                                                                <i className="fa fa-close color-danger"></i>
                                                                                            </Link>
                                                                                            :
                                                                                            <Link
                                                                                                className="me-2 btn btn-primary shadow btn-xs sharp"
                                                                                                title="Add to Stock Investment portfolio"
                                                                                                onClick={() => { addStockportfolio(stock) }}
                                                                                            >
                                                                                                {/* <i className="fas fa-pencil-alt color-muted"></i> */}
                                                                                                {/* <i class="bi bi-plus-circle"></i> */}
                                                                                                <i class="bi bi-plus"></i>
                                                                                            </Link>
                                                                                        :
                                                                                        checkStockTiker(stock.ticker) ?
                                                                                            <Link title="Delete" className="me-2 btn btn-danger shadow btn-xs sharp" onClick={() => { deleteStockportfolio(stock.ticker) }}>
                                                                                                <i className="fa fa-close color-danger"></i>
                                                                                            </Link>
                                                                                            :
                                                                                            <div></div>
                                                                                    }
                                                                                </div>
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
                                                        </>
                                                    }
                                                </tbody>

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
                                                <h3 className="heading">Stock Investment portfolio</h3>
                                            </div>

                                        </div>

                                        <div id='stock-investment-portfolio-body' className="card-body loadmore-content  recent-activity-wrapper p-4" >

                                            <input className="form-control mb-xl-0 mb-3 input-field" type='text' placeholder='Desired quantity' value={desiredQuantity} onChange={(e) => setDesiredQuantity(e.target.value)}></input>
                                            {messageError && <div className='messageError'>{messageError}</div>}
                                            <Link className="btn btn-block btn-primary dlab-load-more btn-portfolio" onClick={(e) => { handleSuggestions(); console.log(messageError) }}>Suggestion systems</Link>

                                            {
                                                loadingStockInvestmentportfolio ?
                                                    <h5 style={{ padding: '4px 0' }}>Please wait...</h5>
                                                    :
                                                    listStockportfolio.map((stock, ind) => (
                                                        <div className="align-items-center student" key={ind}>
                                                            <div className='d-flex justify-content-space-between'>
                                                                <div className="d-flex">
                                                                    <span className="me-3 me-lg-2">
                                                                        {ind + 1}
                                                                    </span>
                                                                    {stock.system ?
                                                                        <div className="user-info">
                                                                            <h6 className="name">{stock.ticker}*</h6>
                                                                        </div>
                                                                        :
                                                                        <div className="user-info">
                                                                            <h6 className="name">{stock.ticker}</h6>
                                                                        </div>}
                                                                </div>
                                                                <div className="justify-content-end">

                                                                    <div className="form-btn-portfolio">
                                                                        <Link className="btn btn-danger shadow btn-xs sharp" title="Delete"
                                                                            onClick={() => { deleteStockportfolio(stock.ticker) }}
                                                                        >
                                                                            <i className="fa fa-close color-danger"></i>
                                                                        </Link>
                                                                        {listStockNameFavorite.includes(stock.ticker) ?
                                                                            <div className='td-favorite'>
                                                                                <i onClick={() => handleDeleteFavorite(stock.ticker)} class="bi bi-heart-fill" title='Delete from favorites'></i>
                                                                            </div>
                                                                            :
                                                                            <div >
                                                                                <i onClick={() => handleAddFavorite(stock.ticker)} class="bi bi-heart-fill" title='Add to favorites'></i>
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                        <div className="card-footer text-center border-0 pt-0">
                                            {listStockportfolio.length < 1 ?
                                                <>
                                                    <div>Or</div>
                                                    <div>Please add 2 to 25 stock from left table</div>
                                                </>
                                                :
                                                listStockportfolio.length < 2 ?
                                                    <>
                                                        <div>Total: {listStockportfolio.length}</div>
                                                        <Link className="btn btn-block btn-danger dlab-load-more btn-portfolio" onClick={(e) => { setListStockportfolio([]); setDesiredQuantity('') }}>Clear All</Link>

                                                    </>
                                                    :
                                                    <>
                                                        <div>Total: {listStockportfolio.length}</div>
                                                        <Link className="btn btn-block btn-primary dlab-load-more btn-portfolio" onClick={(e) => { handleSubmitOptimization(); console.log(messageError) }}>Start</Link>
                                                        <Link className="btn btn-block btn-danger dlab-load-more btn-portfolio" onClick={(e) => { setListStockportfolio([]); setDesiredQuantity('') }}>Clear All</Link>
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
            <Modal className="modal container-fluid modal-portfolio" show={showportfolio} >
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h6 className="modal-title">View</h6> */}
                        <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowportfolio(!showportfolio); setShowZoom(''); setLabelsPieChart([]); setSeriesPieChart([]); setlistDataportfolioView([]); setLoadingOptimizeportfolioView(false) }//dispatch({ type: 'addNewAdmin' })
                        }>
                        </Button>
                    </div>
                    <div id='show-portfolio-modal-body' className="modal-body portfolio">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className='row main-card'>
                                    <div className='col-xxl-12 col-xl-12'>
                                        <div className='row>'>
                                            <Col lg={12}>
                                                <Card>
                                                    <Card.Header className='portfolio'>
                                                        <Card.Title>STOCK</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body id='show-portfolio-body'>
                                                        {loadingOptimizeportfolioView ?
                                                            <>
                                                                <h4>Optimizing...</h4>
                                                                <div class="spinner-border" role="status"
                                                                >
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                {dataportfolio?.risk && <h6>Risk: {dataportfolio.risk?.toFixed(4)}%</h6>}
                                                                {dataportfolio?.rr && <h6>Estimated profit: {dataportfolio.rr?.toFixed(4)}%</h6>}
                                                                {dataportfolio?.sum && <h6>Sum of rate: 100%</h6>}
                                                                <Table responsive>
                                                                    <thead >
                                                                        <tr >
                                                                            <th>
                                                                                <strong>STOCK CODE</strong>
                                                                            </th>
                                                                            <th>
                                                                                <strong>RETURN</strong>
                                                                            </th>
                                                                            <th>
                                                                                <strong >RISK</strong>
                                                                            </th>
                                                                            <th>
                                                                                <strong>ALLOCATION RATIO</strong>
                                                                            </th>
                                                                            <th>
                                                                                <strong>DAILY RETURN</strong>
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    {loading ?
                                                                        <h5 className='loading'>Loading...</h5>
                                                                        :
                                                                        <tbody>
                                                                            {listDataportfolioView.map((stock, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <strong>{stock.ticker}</strong>
                                                                                        </td>
                                                                                        <td className={stock.expectedReturn >= 0 ? 'positive-numbers' : 'negative-numbers'}>{stock.expectedReturn}</td>
                                                                                        <td className='risk-numbers'>{stock.standardDeviation}</td>

                                                                                        <td>{stock.value} %</td>
                                                                                        {/* {dataportfolio?.stockResults.map((s, index) => {
                                                                                    stock.ticker === s.nameStock &&
                                                                                        <td>
                                                                                            <strong>{parseValuesTo4Decimal(s.xValue)}</strong>
                                                                                        </td>
                                                                                })} */}
                                                                                        <td className='chart'>
                                                                                            <div className={showZoom === stock.ticker ? "chart-default zoom" : "chart-default"} onClick={() => handleShowZoom(stock.ticker)}>
                                                                                                <ReactApexChart
                                                                                                    options={chartDefault(stock.ticker).options}
                                                                                                    series={chartDefault(stock.ticker).series}
                                                                                                    type="area"
                                                                                                    width={200}
                                                                                                    height={100}

                                                                                                />
                                                                                            </div>
                                                                                            {showZoom === stock.ticker &&
                                                                                                <div className='chart-zoom'>
                                                                                                    <div className='chart-title'>
                                                                                                        <div className='name-chart'>{stock.ticker}</div>
                                                                                                        <div className='close' onClick={e => {
                                                                                                            handleShowZoom(stock.ticker)
                                                                                                        }}>x</div>
                                                                                                    </div>
                                                                                                    <div className='chart-body'>
                                                                                                        <div className='chart-body_detail'>
                                                                                                            <div><strong>Return average:</strong>{` ${Number(chartZoom(stock.ticker).profitAverage).toFixed(4)}`}</div>
                                                                                                            <div><strong>Risk average:</strong>{` ${Number(chartZoom(stock.ticker).standardDeviation).toFixed(4)}`}</div>
                                                                                                        </div>
                                                                                                        <ReactApexChart
                                                                                                            options={chartZoom(stock.ticker).options}
                                                                                                            series={chartZoom(stock.ticker).series}
                                                                                                            type="area"
                                                                                                            width={sizeChart()?.width}
                                                                                                            height={sizeChart()?.height}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            }
                                                                                        </td>
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
                                    {/* <div className='col-xxl-5 col-xl-3 wow fadeInUp' data-wow-delay="1s">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal className="modal container-fluid modal-portfolio" show={showChart}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{`Stock code: ${stockNameDraw}`}</h4>
                        <Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowChart(!showChart) }
                        }>
                        </Button>
                    </div>
                    <div className="modal-body portfolio">
                        <DrawChart stock={stockDraw} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PortfolioComponent;