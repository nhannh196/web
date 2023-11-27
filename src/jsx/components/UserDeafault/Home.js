import React, { useState, useContext, useEffect, useReducer } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApexCharts from 'apexcharts';
import { isLogin } from '../../../services/AuthService';
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


//import DonutChart from './Dashboard/DonutChart';
//import DonutChart2 from './Dashboard/DonutChart2';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import axios from 'axios';

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
	const [listStocks, setListStocks] = useState([])

	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(listStocks);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	let roleID = false;

	if (isLogin()) {
		roleID = JSON.parse(localStorage.getItem('userDetails')).roleId
	}

	useEffect(() => {
		getListStock().then((stock) => { setListStocks(stock.data) });
	}, [])

	const getListStock = () => {
		const data = {
			nameStock: "",
			dateRelease: "2023-10-18"
		}
		return axios.post(
			`https://localhost:7053/api/Stocks/ViewPost`, data
		)
	}


	let itemsPerPage = 6
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(listStocks.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(listStocks.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, listStocks]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = event.selected * itemsPerPage % listStocks.length;
		// console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};

	// const [stockDraw, setStockDraw] = useState({})
	// console.log(stockDraw)
	const handleDrawChartClick = (stockID) => {

		let stockFind = listStocks.find((stock) => {
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
										<input type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="STOCK ID" />
									</div>

									<div className="col-xl-3 col-xxl-6">
										<DatePicker
											className="form-control mb-xxl-0 mb-3"
											selected={startDate}
											onChange={(date) => setStartDate(date)}
											dateFormat={"yyyy-MM-dd"}
										/>
									</div>
									<div className="col-xl-3 col-xxl-6">
										<button className="btn btn-primary me-2" title="Click here to Search" type="button"><i className="fa fa-search me-1"></i>Filter</button>
										<button className="btn btn-danger light" title="Click here to remove filter" type="button">Clear</button>
									</div>
								</div>

							</div>
						</div>
					</Collapse>
				</div>


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
													<th>
														<strong>ACTION</strong>
													</th>}
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
								<tbody>
									{currentItems.map((stock, index) => {
										return (
											<tr key={index}>
												<td>
													<strong>{stock.ticker}</strong>
												</td>
												<td>{stock.dailyProfit}</td>
												<td>{stock.standardDeviation}</td>
												<td>{stock.close}</td>
												<td>{stock.volume}</td>
												<td>{stock.dtyyyymmdd}</td>

												{isLogin() ?
													<>
														{roleID === 2 &&
															<td>
																<Dropdown>
																	<Dropdown.Toggle
																		variant="success"
																		className="light sharp i-false"
																	>
																		{svg1}
																	</Dropdown.Toggle>
																	<Dropdown.Menu>
																		<Dropdown.Item onClick={(e) => handleDrawChartClick(stock.ticker)}>
																			<Link to="/chart-apexchart" >Draw Chart</Link>
																		</Dropdown.Item>
																		<Dropdown.Item>Add Favorite</Dropdown.Item>

																	</Dropdown.Menu>
																</Dropdown>
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