import React, { useState, useContext, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApexCharts from 'apexcharts';
import { getUserDetails, isLogin } from '../../../../services/AuthService';
// import { getListStock } from '../../../services/GetService'
import '../../../../css/datepicker.css';
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
	Modal
} from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import "../../UserAuthenticatedComponents/PortfolioOptimization/optimization.css"
import "./home.css"
import "../../../../css/number-ratio.css"
import DrawChart from '../../DrawChart/DrawChart';
import "../../../../css/page-load.css"


//import DonutChart from './Dashboard/DonutChart';
//import DonutChart2 from './Dashboard/DonutChart2';

//Import Components
import { ThemeContext } from "../../../../context/ThemeContext";
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import axios from 'axios';
import { axiosInstance } from '../../../../services/AxiosConfig';
// import { getUserDetails } from '../../../../services/AuthService';

//Paging
let ITEMS_PER_PAGE = 10

const Home = () => {
	const [dateDraw, setDateDraw] = useState('')
	//stockName to draw
	const [stockNameDraw, setStockNameDraw] = useState('');
	//show chart
	const [showChart, setShowChart] = useState(false);
	//list my stockname favorite
	const [listStockNameFavorite, setListStockNameFavorite] = useState([])
	//list my favorite
	const [listMyFavorite, setListMyFavorite] = useState([])
	//Date to filter
	const [dateFilter, setDateFilter] = useState('');
	//Stock id to dilter
	const [stockIdFilter, setStockIdFilter] = useState('')
	//Loaing
	const [loading, setLoading] = useState(false);
	const [pageCurrent, setPageCurrent] = useState(0);
	// We start with an empty list of items.
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

	const [roleID, setRoleID] = useState('')
	// get role
	useEffect(() => {
		const getRole = async () => {
			try {
				let respone = await getUserDetails();
				setRoleID(respone.data.roleId)
			} catch (error) {
				console.log(error)
			}
		}
		getRole()
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
			}).catch(error => {
				console.log("loi o day")
				console.log(error)
				setListMyFavorite([])
				setListStockNameFavorite([])
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
					}).catch(error => { console.log(error) })
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
		// const newOffset = event.selected * itemsPerPage % listStocksView.length;
		// // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		// setItemOffset(newOffset);
		setPageCurrent(event.selected)
	};

	// const [stockDraw, setStockDraw] = useState({})
	// console.log(stockDraw)

	const { changeBackground } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);
	const [open, setOpen] = useState(false);

	const [startDate, setStartDate] = useState(new Date());
	const [selectBtn, setSelectBtn] = useState("This Month");
	const [selectBtn2, setSelectBtn2] = useState("This Month");



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

	//hande sort stock id
	const handleSortStockId = () => {
		// setSortStockId(!sortStockId)
		setSortColumn('StockName')
		setSortDirection(!sortDirection)
	}
	//handle sort daily profits
	const handleSortDailyProfit = () => {
		setSortColumn('DailyProfit')
		setSortDirection(!sortDirection)
	}
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
		// setListStocksView(dataStocksDefault)
		// setSortStockId("")
		// setSortDailyProfit("")
		setNameStock("")
		setDateRelease("")
	}

	//method Round to four decimal places
	const parseValuesTo4Decimal = (value) => {
		return Number(value.toFixed(4))
	}

	let stockDraw = { stockName: stockNameDraw, date: dateDraw }
	return (
		<>
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
												}}>DAILY PROFIT
													{(sortColumn === 'DailyProfit' && sortDirection === true) && <i class="bi bi-arrow-up"></i>}
													{(sortColumn === 'DailyProfit' && sortDirection === false) && <i class="bi bi-arrow-down"></i>}
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

									<tbody >
										{
											loading ?
												<div class="spinner-border" role="status"
												>
													<span class="sr-only">Loading...</span>
												</div>
												:
												currentItems?.map((stock, index) => {
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
																		<Link className='me-2 shadow btn-xs sharp'
																			onClick={() => {
																				setShowChart(!showChart);
																				setStockNameDraw(stock.ticker)
																				setDateDraw(stock.dtyyyymmdd)
																			}}
																		><i class="bi bi-bar-chart-fill"></i></Link>
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
																	<Dropdown >
																		<Dropdown.Toggle
																			variant="success"
																			className="light sharp i-false"
																		>
																			{svg1}
																		</Dropdown.Toggle>
																		<DropdownMenu className='home-action'>
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
export default Home;