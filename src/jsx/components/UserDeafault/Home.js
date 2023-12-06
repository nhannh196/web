import React, { useState, useContext, useEffect, useReducer } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApexCharts from 'apexcharts';
import { getUserDetails, isLogin } from '../../../services/AuthService';
// import { getListStock } from '../../../services/GetService'
import '../../../css/datepicker.css';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';
import {
	Row,
	Col,
	Card,
	Table,
	Badge,
	Dropdown,
	ProgressBar,
} from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import "../UserAuthenticated/PortfolioOptimization/optimization.css"
import "./home.css"
import "../../../css/number-ratio.css"


//import DonutChart from './Dashboard/DonutChart';
//import DonutChart2 from './Dashboard/DonutChart2';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import axios from 'axios';
import { axiosInstance } from '../../../services/AxiosConfig';

//images
//import small1 from './../../../images/profile/small/pic1.jpg';

const ProjectAreaChart = loadable(() =>
	pMinDelay(import("../Dashboard/Banking/ProjectAreaChart"), 1000)
);
const EmailPieChart = loadable(() =>
	pMinDelay(import("../Dashboard/Dashboard/EmailPieChart"), 1000)
);
const StatisticBarChart = loadable(() =>
	pMinDelay(import("../Dashboard/Dashboard/StatisticBarChart"), 1000)
);
const RedialChart = loadable(() =>
	pMinDelay(import("../Dashboard/Dashboard/RedialChart"), 1000)
);


const CharacterData = [
	{ svgColor: '#FFD125', changeClass: 'up', title: 'Income' },
	{ svgColor: '#FCFCFC', title: 'Expense' },
];


const Home = () => {
	//list my stockname favorite
	const [listStockNameFavorite, setListStockNameFavorite] = useState([])
	//list my favorite
	const [listMyFavorite, setListMyFavorite] = useState([])
	const [listStocksView, setListStocksView] = useState([])
	//Sort with StockId
	const [sortStockId, setSortStockId] = useState(null);
	//Sort with Daily Profit
	const [sortDailyProfit, setSortDailyProfit] = useState(null);
	//Date to filter
	const [dateFilter, setDateFilter] = useState('');
	//Stock id to dilter
	const [stockIdFilter, setStockIdFilter] = useState('')
	//Loaing
	const [loading, setLoading] = useState(false);

	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(listStocksView);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	let roleID = '';
	const dataStocksDefault = JSON.parse(sessionStorage.getItem('dataStocksDefault'));

	if (isLogin()) {
		roleID = JSON.parse(localStorage.getItem('userDetails')).roleId
	}


	useEffect(() => {
		// getListStock().then((stock) => { setListStocksView(stock.data) });
		if (dataStocksDefault === null || dataStocksDefault === undefined) {
			setLoading(true)
			getListStock()
				.then((response) => {
					setListStocksView(response.data)
					setLoading(false)
				})
		} else {
			setListStocksView(dataStocksDefault)
		}
	}, [])

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

	//api get list stock
	const getListStock = () => {
		const data = {
			nameStock: "",
			dateRelease: ""
		}
		return axiosInstance.post(
			`/api/Stocks/ViewPost`, data
		)
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



	let itemsPerPage = 10
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(listStocksView.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(listStocksView.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, listStocksView, sortStockId, sortDailyProfit]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = event.selected * itemsPerPage % listStocksView.length;
		// console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};

	// const [stockDraw, setStockDraw] = useState({})
	// console.log(stockDraw)
	const handleDrawChartClick = (stockID) => {

		let stockFind = listStocksView.find((stock) => {
			return stock.ticker === stockID
		})

		let result = {
			ticker: stockID,
			standardDeviation: stockFind.standardDeviation,
			listChart: stockFind.listChart.reverse()
		}
		localStorage.setItem('stockDraw', JSON.stringify(result))
		// sessionStorage.setItem('stockDraw', JSON.stringify(result))

		// setStockDraw(result)
	}

	const { changeBackground } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);
	const [open, setOpen] = useState(false);

	const [startDate, setStartDate] = useState(new Date());
	const [selectBtn, setSelectBtn] = useState("This Month");
	const [selectBtn2, setSelectBtn2] = useState("This Month");


	const handleSeries = (value) => {
		//alert('dd');
		ApexCharts.exec('assetDistribution', 'toggleSeries', value)
	}


	const projectSeries = (value) => {
		//alert('dd');
		ApexCharts.exec('assetDistribution2', 'toggleSeries', value)
	}

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

	const formatDateToYYYYMMDD = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	//filter data
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
		return axiosInstance.post(
			`/api/Stocks/ViewPost`, data
		)
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
	}

	//method Round to four decimal places
	const parseValuesTo4Decimal = (value) => {
		return Number(value.toFixed(4))
	}

	//
	return (
		<div className='row'>
			<div className="col-xl-12">
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
										<Button className="me-2" variant="warning" title="Click here to Search" onClick={() => { handleSubmitFilter() }}><i className="fa fa-search me-1"></i>
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
				<Col lg={12}>
					<Card>
						<Card.Header className='home'>
							<Card.Title>STOCK</Card.Title>
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
											<strong title='dsadasdasdasd'>SHARPE RATIO</strong>
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
										{isLogin() ?
											<>
												{roleID === 2 &&
													<>
														<th>
															<strong>ACTION</strong>
														</th>
														<th></th>
													</>
												}
											</>
											:
											<>
												{console.log("chua dang nhap")}
												<th>
													<strong>ACTION</strong>
												</th>
											</>
										}
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
													{isLogin() ?

														roleID === 2 &&
														<>
															<td className='td-action'>
																<Link><i class="bi bi-bar-chart-fill"></i></Link>
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
														</>
														:
														<td>
															<Dropdown>
																<Dropdown.Toggle
																	variant="success"
																	className="light sharp i-false"
																>
																	{svg1}
																</Dropdown.Toggle>
																<DropdownMenu>
																	<Button className="me-2" variant="primary" style={{ width: '100%', height: '100%' }}>
																		<Link to="/login">Login to use</Link>
																	</Button>
																</DropdownMenu>
															</Dropdown>
														</td>
													}
												</tr>
											)
										})}
									</tbody>
								}
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
	)
}
export default Home;