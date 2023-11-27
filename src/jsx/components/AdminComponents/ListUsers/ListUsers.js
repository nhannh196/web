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

const init = false;
const initialState = false;
const reducer = (stateAction, active) => {
	switch (active.type) {

		case 'changeStatusAccount':
			return { ...stateAction, changeStatusAccount: !stateAction.changeStatusAccount }
		case 'editProfile':
			return { ...stateAction, editProfile: !stateAction.editProfile }
		default:
			return stateAction
	}
}

export const ListUsers = () => {
	const [listUsers, setListUsers] = useState([])
	const [stateAction, dispatch] = useReducer(reducer, initialState);
	const columns = useMemo(() => COLUMNS, [])
	const [user, setUser] = useState({})
	const [clickSave, setClickSave] = useState(true)

	useEffect(() => {
		getListUser()
	}, [user])

	const onChangeInput = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const getListUser = () => {
		return axios.get('https://localhost:7053/api/UsersAdmin')
			.then((response) => {
				const listNeed = response.data.filter((user) => {
					return user.roleId === null || user.roleId === 2
				})

				setListUsers(listNeed)
			});
	}
	const changeStatusClickSave = () => {
		updateUser()
		setClickSave(!clickSave)
	}

	const updateUser = () => {
		const data = {
			username: user.username,
			password: user.password,
			fullName: user.fullName,
			dateOfBirth: user.dateOfBirth,
			registrationDate:user.registrationDate,
			roleId:user.roleId,
			email: user.email,
			baned: user.baned
		}
		const response = axios.put(`https://localhost:7053/api/UsersAdmin/${user.userId}`, data)
			.then((response) => {
				setUser({});
			})
	}

	const changeStatusAccount = () => {
		const data = {
			username: user.username,
			password: user.password,
			fullName: user.fullName,
			dateOfBirth: user.dateOfBirth,
			registrationDate:user.registrationDate,
			roleId:user.roleId,
			email: user.email,
			baned: !user.baned
		}
		const response = axios.put(`https://localhost:7053/api/UsersAdmin/${user.userId}`, data)
			.then((response) => {
				setUser({});
			})
	}


	const [userUpdate, setUserUpdate] = useState({})

	const data = useMemo(() => {
		// getListUser()
		return listUsers
	}, [listUsers])
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
															<div to={"#"} onClick={() => { dispatch({ type: 'editProfile' }); setUser(row.original) }}>Edit</div>
														</Dropdown.Item>
														<Dropdown.Item>
															<div variant="primary" type="button" className="mb-2 me-1" onClick={() => { dispatch({ type: 'changeStatusAccount' }); setUser(row.original)}}>
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
			<Modal className="modal fade" show={stateAction.editProfile} onHide={() => dispatch({ type: 'editProfile' })} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Profile</h5>
						<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({ type: 'editProfile' })}>

						</Button>
					</div>
					{user &&
						<div className="modal-body">
							<form className="comment-form" onSubmit={(e) => { e.preventDefault(); dispatch({ type: 'editProfile' }); }}>
								<div className="row">
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="author" className="text-black font-w600">  Username  </label>
											<input onChange={(e) => onChangeInput(e)} type="text" className="form-control" defaultValue={user.username} name="username" placeholder="Username" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="email" className="text-black font-w600"> Full name </label>
											<input onChange={(e) => onChangeInput(e)} type="text" className="form-control" defaultValue={user.fullName} placeholder="Full name" name="fullName" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="email" className="text-black font-w600"> Email </label>
											<input onChange={(e) => onChangeInput(e)} type="email" className="form-control" defaultValue={user.email} placeholder="Email" name="email" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<label htmlFor="email" className="text-black font-w600"> Date of birth </label>
											<input onChange={(e) => onChangeInput(e)} type="text" className="form-control" defaultValue={user.dateOfBirth} placeholder="Date of birth" name="dateOfBirth" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-3">
											<input type="submit" value="Save" className="submit btn btn-primary" name="submit" onClick={() => changeStatusClickSave()} />
										</div>
									</div>
								</div>
							</form>
						</div>
					}
				</div>
			</Modal>
			<Modal className="fade" show={stateAction.changeStatusAccount} onHide={() => dispatch({ type: 'changeStatusAccount' })} centered>
				<Modal.Header>
					<Modal.Title>Warning</Modal.Title>
					<Button onClick={() => dispatch({ type: 'changeStatusAccount' })} variant="" className="btn-close"></Button>
				</Modal.Header>
				<Modal.Body>
					<p>
						Do you want {user.baned ? "Unban" : "Ban"} this account?
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => dispatch({ type: 'changeStatusAccount' })}
						variant="danger light"
					>
						Close
					</Button>
					<Button onClick={() => { dispatch({ type: 'changeStatusAccount' }); changeStatusAccount() }} variant="primary">Accept</Button>
				</Modal.Footer>
			</Modal>
		</>
	)

}
export default ListUsers;