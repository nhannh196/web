import React, { useMemo, useReducer, useEffect, useState } from 'react';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
// import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import {
	Dropdown,
	Button,
	Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import './table.css';
import './filtering.css';
import axios from 'axios';
import { axiosInstance, baseURL } from '../../../../services/AxiosConfig';
import { isInvalidEmail, isInvalidFullname, isInvalidPassword, isInvalidUsername } from '../../../../services/ValidateInput';
import { ToastContainer, toast } from "react-toastify";

const init = false;
const initialState = false;


export const ListUsers = () => {
	const [listUsers, setListUsers] = useState([])
	// const [stateAction, dispatch] = useReducer(reducer, initialState);
	const columns = useMemo(() => COLUMNS, [])
	const [user, setUser] = useState({})
	const [clickSave, setClickSave] = useState(false)
	const [message, setMessage] = useState({});
	const [showEdit, setShowEdit] = useState(false)
	const [showChangeStatus, setShowChangeStatus] = useState(false)
	useEffect(() => {
		getListUser()
	}, [user])

	const onChangeInput = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const getListUser = () => {
		return axiosInstance.get('/api/UsersAdmin')
			.then((response) => {
				const listNeed = response.data.filter((user) => {
					return user.roleId === null || user.roleId === 2
				})
				setListUsers(listNeed)
			}).catch(err => console.log(err));
	}




	// check input in fields
	const checkInput = (input) => {
		let message = {}

		if (isInvalidFullname(input.fullName)) {
			message = { ...message, fullNameError: isInvalidFullname(input.fullName) }
		}
		if (isInvalidEmail(input.email)) {
			message = { ...message, emailError: isInvalidEmail(input.email) }
		}
		return message
	}
	// console.log(user)
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
	//handle save edit
	const handleClickSaveEdit = () => {
		const data = {
			userId: user.userId,
			username: user.username,
			password: user.password,
			fullName: user.fullName,
			// dateOfBirth: user.dateOfBirth,
			registrationDate: user.registrationDate,
			roleId: user.roleId,
			email: user.email,
			baned: user.baned
		}
		const message = checkInput(user)
		console.log("check user:", checkInput(user))
		if (JSON.stringify(message) === "{}") {
			console.log("save")
			apiUpdateUser(data)
				.then(() => {
					getListUser()
					notifySusscess("Edit successfully", 3000)
					setUser({});
					setMessage(message)
					setShowEdit(!showEdit)
				})
				.catch(err => console.log(err))
		} else {
			console.log("chua save")
			setMessage(message)

		}

	}

	//api udate user
	const apiUpdateUser = (data) => {
		return axiosInstance.put(`/api/UsersAdmin/${user.userId}`, data)
	}

	const changeStatusAccount = () => {
		const data = {
			userId: user.userId,
			username: user.username,
			password: user.password,
			fullName: user.fullName,
			dateOfBirth: user.dateOfBirth,
			registrationDate: user.registrationDate,
			roleId: user.roleId,
			email: user.email,
			baned: !user.baned
		}
		const response = axiosInstance.put(`/api/UsersAdmin/${user.userId}`, data)
			.then((response) => {
				notifySusscess(`${data.baned ? 'Baned successfully' : 'Unbaned successfully'}`, 3000)
				setUser({});
			}).catch(err => console.log(err))
	}


	const [userUpdate, setUserUpdate] = useState({})

	const data = listUsers
	const tableInstance = useTable({
		columns,
		data,
		initialState: { pageIndex: 0 }
	}, useFilters, useGlobalFilter, usePagination)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance


	const { globalFilter, pageIndex } = state
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

		<>
			{/* <PageTitle activeMenu="Filtering" motherMenu="Table" />	 */}
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">List Users</h4>
				</div>
				<div className="card-body">
					<div className="table-responsive">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
						<table {...getTableProps()} className="table dataTable display table-bordered">
							<thead>
								{headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps()}>
												{column.canFilter ? column.render('Filter') : <div></div>}
												{column.render('Header')}

											</th>
										))}
										<th>Action</th>
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()} className="" >

								{page.map((row) => {
									prepareRow(row)
									return (
										<tr {...row.getRowProps()}>

											{row.cells.map((cell) => {
												return (

													cell.column.Header === 'Status' ?
														<>
															{cell.value === true ?
																<td ><span className="light badge-danger badge">Baned</span></td>
																:
																<td ><span className="light badge-success badge">Active</span></td>
															}
														</>
														:
														<td>{cell.value}</td>

												)
												// {
												// 	cell.column.Header==='Status' ?

												// 		<td {...cell.getCellProps()}> {cell.value} </td>

												// 	:

												// 		<td {...cell.getCellProps()}> {cell.value} </td>
												// }

											})}
											<td>
												<Dropdown>
													<Dropdown.Toggle
														variant="success"
														className="light sharp i-false"
													>
														{svg1}
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<Dropdown.Item>
															<div to={"#"} onClick={() => { setShowEdit(!showEdit); setUser(row.original) }}>Edit</div>
														</Dropdown.Item>
														<Dropdown.Item>
															<div variant="primary" type="button" className="mb-2 me-1" onClick={() => { setShowChangeStatus(!showChangeStatus); setUser(row.original) }}>
																{row.original.baned ? "UnBan" : "Ban"}
															</div>
														</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</td>
										</tr>

									)
								})}
							</tbody>
						</table>
						<div className="d-flex justify-content-between">
							<span>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{''}
							</span>
							<span className="table-index">
								Go to page : {' '}
								<input type="number"
									className="ml-2"
									defaultValue={pageIndex + 1}
									onChange={e => {
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
										gotoPage(pageNumber)
									}}
								/>
							</span>
						</div>
						<div className="text-center mb-3">
							<div className="filter-pagination  mt-3">
								<button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>

								<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
									Previous
								</button>
								<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
								<button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal className="modal fade" show={showEdit} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Profile</h5>
						<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => { setShowEdit(!showEdit); setMessage({}) }}>
						</Button>
					</div>

					<div className="modal-body">
						<div className="row">
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<label htmlFor="author" className="text-black font-w600">  Username  </label>
									<input readOnly onChange={(e) => onChangeInput(e)} type="text" className="form-control" defaultValue={user.username} name="username" placeholder="Username" />
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<label htmlFor="email" className="text-black font-w600"> Full name </label>
									<input onChange={(e) => onChangeInput(e)} type="text" className="form-control" defaultValue={user.fullName} placeholder="Full name" name="fullName" />
									{message.fullNameError && <p style={{ color: 'red' }}>{message.fullNameError}</p>}
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<label htmlFor="email" className="text-black font-w600"> Email </label>
									<input onChange={(e) => onChangeInput(e)} type="email" className="form-control" defaultValue={user.email} placeholder="Email" name="email" />
									{message.emailError && <p style={{ color: 'red' }}>{message.emailError}</p>}
								</div>
							</div>
							{/* <div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="email" className="text-black font-w600"> Date of birth </label>
											<input onChange={(e) => onChangeInput(e)} type="text" className="form-control" defaultValue={user.dateOfBirth} placeholder="Date of birth" name="dateOfBirth" />
										</div>
									</div> */}
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<button className="submit btn btn-primary" onClick={() => handleClickSaveEdit()} >Save</button>
								</div>
							</div>
						</div>

					</div>

				</div>
			</Modal>
			<Modal className="fade" show={showChangeStatus} centered>
				<Modal.Header>
					<Modal.Title>Warning</Modal.Title>
					<Button onClick={() => setShowChangeStatus(!showChangeStatus)} variant="" className="btn-close"></Button>
				</Modal.Header>
				<Modal.Body>
					<p>
						Do you want {user.baned ? "Unban" : "Ban"} this account?
					</p>
				</Modal.Body>
				<Modal.Footer >
					<Button onClick={() => { setShowChangeStatus(!showChangeStatus); changeStatusAccount() }} variant="primary">Accept</Button>

					<Button
						onClick={() => setShowChangeStatus(!showChangeStatus)}
						variant="danger light"
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<ToastContainer />
		</>
	)

}
export default ListUsers;