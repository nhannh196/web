import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./Columns";
import { GlobalFilter } from "./GlobalFilter";
import {
  Dropdown,
  Button,
  Modal,
  TabContent,
  TabPane,
  Nav,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import './table.css';
import "./filtering.css";
import axios from "axios";

const init = false;
const initialState = false;
const reducer = (stateAction, active) => {
  switch (active.type) {
    case "changeStatusAccount":
      return {
        ...stateAction,
        changeStatusAccount: !stateAction.changeStatusAccount,
      };
    case "editProfile":
      return { ...stateAction, editProfile: !stateAction.editProfile };
    case "addNewAdmin":
      return { ...stateAction, addNewAdmin: !stateAction.addNewAdmin };
    case "addNewManager":
      return { ...stateAction, addNewManager: !stateAction.addNewManager };
    default:
      return stateAction;
  }
};
// const [inputMessage, setInputMessage] = useState({})
const ListManagers = () => {
  const userDefault = {
    username: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    registrationDate: "",
    roleId: "",
    email: "",
    baned: "",
  };
  // const inputMessageDefault = {
  // 	userNameError: "",
  // 	passwordError: "",
  // 	fullNameError: "",
  // 	dateOfBirthError: "",
  // 	emailError: ""
  // }
  const [listUsers, setListUsers] = useState([]);
  const [listManagers, setListManagers] = useState([]);
  const [listAdmins, setListAdmins] = useState([]);
  const [inputMessage, setInputMessage] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [stateAction, dispatch] = useReducer(reducer, initialState);
  const columns = useMemo(() => COLUMNS, []);

  const [user, setUser] = useState(userDefault);
  const [clickSave, setClickSave] = useState(true);
  const [tabKey, setTabKey] = useState("Managers");

  useEffect(() => {
    getListUser();
  }, [user]);

  const onChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const getListUser = () => {
    return axios
      .get("https://6618-1-53-195-148.ngrok-free.app/api/UsersAdmin")
      .then((response) => {
        const listManagers = response.data.filter((user) => {
          return user.roleId === 3;
        });
        const listAdmins = response.data.filter((user) => {
          return user.roleId === 1;
        });
        setListManagers(listManagers);
        setListAdmins(listAdmins);
        const listDefault = [...listManagers];
      });
  };
  const changeStatusClickSave = () => {
    updateUser();
    // setClickSave(!clickSave)
  };

  // const [userNameError, setUserNameError] = useState(false)

  const updateUser = () => {
    const data = {
      username: user.username,
      password: user.password,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      registrationDate: user.registrationDate,
      roleId: user.roleId,
      email: user.email,
      baned: user.baned,
    };
    const response = axios
      .put(
        `https://6618-1-53-195-148.ngrok-free.app/api/UsersAdmin/${user.userId}`,
        data
      )
      .then((response) => {
        setUser({});
      });
  };

  const checkInput = (input) => {
    let message = {};
    if (input.username === undefined || input.username.trim() === "") {
      message = { ...message, userNameError: "Please enter a username!" };
    }
    if (input.password === undefined || input.password.trim() === "") {
      message = { ...message, passwordError: "Please enter a password!" };
    }
    if (input.fullName === undefined || input.fullName.trim() === "") {
      message = { ...message, fullNameError: "Please enter a fullname!" };
    }
    if (input.dateOfBirth === undefined || input.dateOfBirth.trim() === "") {
      message = {
        ...message,
        dateOfBirthError: "Please enter a date of birth!",
      };
    }
    if (input.email === undefined || input.email.trim() === "") {
      message = { ...message, emailError: "Please enter a email" };
    }
    return message;
  };

  const createUserManager = () => {
    const data = {
      username: user.username,
      password: user.password,
      email: user.email,
      fullName: user.fullName,
    };
    const { userNameError, passwordError } = checkInput(data);
    if (!userNameError && !passwordError) {
      const response = axios
        .post(
          `https://6618-1-53-195-148.ngrok-free.app/api/UsersAdmin/create-manager-account`,
          data
        )
        .then((response) => {
          setUser(userDefault);
          dispatch({ type: "addNewManager" });
        })
        .catch((err) => {
          setInputMessage({ userNameError: err.response.data.message });
        });
    } else {
      console.log("tao ko dc do trong");
      setInputMessage({ userNameError, passwordError });
      // console.log(userNameError,passwordError);
    }
  };

  const createNewAdmin = () => {
    const data = {
      username: user.username,
      password: user.password,
      email: user.email,
      fullName: user.fullName,
    };
    const { userNameError, passwordError } = checkInput(data);
    if (!userNameError && !passwordError) {
      const response = axios
        .post(
          `https://6618-1-53-195-148.ngrok-free.app/api/UsersAdmin/create-admin-account`,
          data
        )
        .then((response) => {
          setUser(userDefault);
          dispatch({ type: "addNewAdmin" });
        })
        .catch((err) => {
          setInputMessage({ userNameError: err.response.data.message });
        });
    } else {
      console.log("tao ko dc do trong");
      setInputMessage({ userNameError, passwordError });
      // console.log(userNameError,passwordError);
    }
  };

  const changeStatusAccount = () => {
    const data = {
      username: user.username,
      password: user.password,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      registrationDate: user.registrationDate,
      roleId: user.roleId,
      email: user.email,
      baned: !user.baned,
    };
    const response = axios
      .put(
        `https://6618-1-53-195-148.ngrok-free.app/api/UsersAdmin/${user.userId}`,
        data
      )
      .then((response) => {
        setUser({});
      });
  };

  const getManage = () => {
    setTabKey("Managers");
    setListUsers(listManagers);
  };
  const getAdmin = () => {
    setTabKey("Admins");
    setListUsers(listAdmins);
  };

  const [userUpdate, setUserUpdate] = useState({});

  const data = useMemo(() => {
    // getListUser()
    if (tabKey === "Managers") {
      return listManagers;
    } else if (tabKey === "Admins") {
      return listAdmins;
    }
  }, [listManagers, listAdmins, user, tabKey]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

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
  } = tableInstance;

  const { globalFilter, pageIndex } = state;
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

  const userIdOfAdmin = JSON.parse(localStorage.getItem("userDetails")).userId;

  return (
    <>
      {/* <PageTitle activeMenu="Filtering" motherMenu="Table" />	 */}
      <div className="card">
        <Tab.Container defaultActiveKey={tabKey}>
          <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
            <Nav.Link
              className="nav-link"
              eventKey="Managers"
              onClick={() => {
                getManage();
              }}
            >
              List Managers
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              eventKey="Admins"
              onClick={() => {
                getAdmin();
              }}
            >
              List Admins
            </Nav.Link>
          </Nav>
          <TabContent>
            <TabPane eventKey="Managers">
              <div className="card-header">
                <h4 className="card-title">List Managers</h4>
                <div className="">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setInputMessage({});
                      setUser(userDefault);
                      dispatch({ type: "addNewManager" });
                    }}
                  >
                    Add new manager
                    <svg
                      width="24"
                      height="24"
                      className="ms-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z"
                        fill="#FCFCFC"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                  <table
                    {...getTableProps()}
                    className="table dataTable display table-bordered"
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.canFilter ? (
                                column.render("Filter")
                              ) : (
                                <div></div>
                              )}
                              {column.render("Header")}
                            </th>
                          ))}
                          <th>Action</th>
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="">
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return cell.column.Header === "Status" ? (
                                <>
                                  {cell.value === true ? (
                                    <td>
                                      <span className="light badge-danger badge">
                                        Baned
                                      </span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span className="light badge-success badge">
                                        Active
                                      </span>
                                    </td>
                                  )}
                                </>
                              ) : (
                                <td>{cell.value}</td>
                              );
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
                                    <div
                                      to={"#"}
                                      onClick={() => {
                                        dispatch({ type: "editProfile" });
                                        setUser(row.original);
                                      }}
                                    >
                                      Edit
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div
                                      variant="primary"
                                      type="button"
                                      className="mb-2 me-1"
                                      onClick={() => {
                                        dispatch({
                                          type: "changeStatusAccount",
                                        });
                                        setUser(row.original);
                                      }}
                                    >
                                      {row.original.baned ? "UnBan" : "Ban"}
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between">
                    <span>
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>
                      {""}
                    </span>
                    <span className="table-index">
                      Go to page :{" "}
                      <input
                        type="number"
                        className="ml-2"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                          const pageNumber = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(pageNumber);
                        }}
                      />
                    </span>
                  </div>
                  <div className="text-center mb-3">
                    <div className="filter-pagination  mt-3">
                      <button
                        className=" previous-button"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                      >
                        {"<<"}
                      </button>

                      <button
                        className="previous-button"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                      >
                        Previous
                      </button>
                      <button
                        className="next-button"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      >
                        Next
                      </button>
                      <button
                        className=" next-button"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      >
                        {">>"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane eventKey="Admins">
              <div className="card-header">
                <h4 className="card-title">List Admins</h4>
                <div className="">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setInputMessage({});
                      setUser(userDefault);
                      dispatch({ type: "addNewAdmin" });
                    }}
                  >
                    Add new admin
                    <svg
                      width="24"
                      height="24"
                      className="ms-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z"
                        fill="#FCFCFC"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                  <table
                    {...getTableProps()}
                    className="table dataTable display table-bordered"
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.canFilter ? (
                                column.render("Filter")
                              ) : (
                                <div></div>
                              )}
                              {column.render("Header")}
                            </th>
                          ))}
                          <th>Action</th>
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="">
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return cell.column.Header === "Status" ? (
                                <>
                                  {cell.value === true ? (
                                    <td>
                                      <span className="light badge-danger badge">
                                        Baned
                                      </span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span className="light badge-success badge">
                                        Active
                                      </span>
                                    </td>
                                  )}
                                </>
                              ) : (
                                <td>{cell.value}</td>
                              );
                            })}
                            {row.original.userId === userIdOfAdmin ? (
                              <td></td>
                            ) : (
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
                                      <div
                                        to={"#"}
                                        onClick={() => {
                                          dispatch({ type: "editProfile" });
                                          setUser(row.original);
                                        }}
                                      >
                                        Edit
                                      </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                      <div
                                        variant="primary"
                                        type="button"
                                        className="mb-2 me-1"
                                        onClick={() => {
                                          dispatch({
                                            type: "changeStatusAccount",
                                          });
                                          setUser(row.original);
                                        }}
                                      >
                                        {row.original.baned ? "UnBan" : "Ban"}
                                      </div>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between">
                    <span>
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>
                      {""}
                    </span>
                    <span className="table-index">
                      Go to page :{" "}
                      <input
                        type="number"
                        className="ml-2"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                          const pageNumber = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(pageNumber);
                        }}
                      />
                    </span>
                  </div>
                  <div className="text-center mb-3">
                    <div className="filter-pagination  mt-3">
                      <button
                        className=" previous-button"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                      >
                        {"<<"}
                      </button>

                      <button
                        className="previous-button"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                      >
                        Previous
                      </button>
                      <button
                        className="next-button"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      >
                        Next
                      </button>
                      <button
                        className=" next-button"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      >
                        {">>"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </Tab.Container>
      </div>
      <Modal
        className="modal fade"
        show={stateAction.addNewAdmin}
        onHide={() => dispatch({ type: "addNewAdmin" })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Admin</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "addNewAdmin" })}
            ></Button>
          </div>
          {
            <div className="modal-body">
              <form
                className="comment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="author" className="text-black font-w600">
                        {" "}
                        Username
                        <span class="required">*</span>
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        name="username"
                        placeholder="Username"
                      />
                      {inputMessage.userNameError && (
                        <p style={{ color: "red" }}>
                          {inputMessage.userNameError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Password
                        <span class="required">*</span>
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="password"
                        className="form-control"
                        defaultValue=""
                        placeholder="Password"
                        name="password"
                      />
                      {inputMessage.passwordError && (
                        <p style={{ color: "red" }}>
                          {inputMessage.passwordError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Full name{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        placeholder="Full name"
                        name="fullName"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Email{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="email"
                        className="form-control"
                        defaultValue=""
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Date of birth{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        placeholder="Date of birth"
                        name="dateOfBirth"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        type="submit"
                        value="Save"
                        className="submit btn btn-primary"
                        name="submit"
                        onClick={() => {
                          createNewAdmin();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          }
        </div>
      </Modal>
      <Modal
        className="modal fade"
        show={stateAction.addNewManager}
        onHide={() => dispatch({ type: "addNewManager" })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Managers</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "addNewManager" })}
            ></Button>
          </div>
          {
            <div className="modal-body">
              <form
                className="comment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="author" className="text-black font-w600">
                        {" "}
                        Username
                        <span class="required">*</span>
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        name="username"
                        placeholder="Username"
                      />
                      {inputMessage.userNameError && (
                        <p style={{ color: "red" }}>
                          {inputMessage.userNameError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Password
                        <span class="required">*</span>
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="password"
                        className="form-control"
                        defaultValue=""
                        placeholder="Password"
                        name="password"
                      />
                      {inputMessage.passwordError && (
                        <p style={{ color: "red" }}>
                          {inputMessage.passwordError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Full name{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        placeholder="Full name"
                        name="fullName"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Email{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Date of birth{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue=""
                        placeholder="Date of birth"
                        name="dateOfBirth"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        type="submit"
                        value="Save"
                        className="submit btn btn-primary"
                        name="submit"
                        onClick={() => {
                          createUserManager();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          }
        </div>
      </Modal>
      <Modal
        className="fade"
        show={stateAction.changeStatusAccount}
        onHide={() => dispatch({ type: "changeStatusAccount" })}
        centered
      >
        <Modal.Header>
          <Modal.Title>Warning</Modal.Title>
          <Button
            onClick={() => dispatch({ type: "changeStatusAccount" })}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want {user.baned ? "Unban" : "Ban"} this account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => dispatch({ type: "changeStatusAccount" })}
            variant="danger light"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "changeStatusAccount" });
              changeStatusAccount();
            }}
            variant="primary"
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade"
        show={stateAction.editProfile}
        onHide={() => dispatch({ type: "editProfile" })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Profile</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "editProfile" })}
            ></Button>
          </div>
          {user && (
            <div className="modal-body">
              <form
                className="comment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch({ type: "editProfile" });
                }}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="author" className="text-black font-w600">
                        {" "}
                        Username{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue={user.username}
                        name="username"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Full name{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue={user.fullName}
                        placeholder="Full name"
                        name="fullName"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Email{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="email"
                        className="form-control"
                        defaultValue={user.email}
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-black font-w600">
                        {" "}
                        Date of birth{" "}
                      </label>
                      <input
                        onChange={(e) => onChangeInput(e)}
                        type="text"
                        className="form-control"
                        defaultValue={user.dateOfBirth}
                        placeholder="Date of birth"
                        name="dateOfBirth"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        type="submit"
                        value="Save"
                        className="submit btn btn-primary"
                        name="submit"
                        onClick={() => changeStatusClickSave()}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ListManagers;
