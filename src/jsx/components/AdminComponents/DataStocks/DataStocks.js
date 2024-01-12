import { useEffect, useMemo, useState } from "react"
import { axiosInstance } from "../../../../services/AxiosConfig"
import {
    Col,
    Card,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import "./data-stocks.css"
import { trim } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const ITEM_PER_PAGE = 10
const DataStocks = () => {
    // const [fileName, setFileName] = useState('')
    const [file, setFile] = useState()
    // const [fileNew, setFileNew] = useState()
    const [fileData, setFileData] = useState([])
    const [loadFile, setLoadFile] = useState(false)
    const [messageSystem, setMessageSystem] = useState('')
    const [loading, setLoading] = useState(false)
    const [startItem, setStartItem] = useState(0)
    const [endItem, setEndItem] = useState(0)
    // const [pageTotal, setPageTotal] = useState(0)
    const [showEdit, setShowEdit] = useState(false)
    const [stockEdit, setStockEdit] = useState()
    const [messageError, setMessageError] = useState('')
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState('')
    const [dataToSearching, setDataToSearching] = useState([])
    const [pageCurrent, setPageCurrent] = useState(0)
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


    //api load file
    const apiLoadFile = () => {
        const headers = {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        };
        const formData = new FormData();
        formData.append('file', file);
        return axiosInstance.post(`/api/Stocks/LoadFile`, formData, { headers })
    }
    useEffect(() => {
        if (file) {
            apiLoadFile()
                .then((result) => {
                    setFileData(result.data)
                    setMessageSystem('')
                }).catch((err) => {
                    console.log(err)
                    notifyFailure('Load file failed!', 5000)
                    setMessageSystem('File invalid, please check file!')
                    setFileData([])
                })
        } else {
            return;
        }
    }, [file])
    // useEffect(() => {
    //     setPageTotal(Math.ceil(fileData.length / ITEM_PER_PAGE))
    // }, [fileData])

    const pageTotal = useMemo(() => {
        return Math.ceil(fileData.length / ITEM_PER_PAGE)
    }, [fileData])

    useEffect(() => {
        if (fileData.length > 0 && (((startItem / ITEM_PER_PAGE) + 1) > pageTotal)) {
            console.log('start item lon hon pagetotal')
            setStartItem(startItem - ITEM_PER_PAGE)
        }
    }, [fileData])

    //page view current
    const currentItems = useMemo(() => {
        return fileData.slice(startItem, startItem + ITEM_PER_PAGE)
    }, [fileData, startItem, dataToSearching])
    // handle page click
    const handlePageClick = (e) => {
        setStartItem(e.selected * ITEM_PER_PAGE)
        setPageCurrent(e.selected)
    }

    const parseDate = (date) => {
        const dateSplit = date.split('T')[0]
        const dateReverse = dateSplit.split('-').reverse()
        return dateReverse.join('-')
    }
    const parseTime = (date) => {
        return `T${date.split('T')[1]}`
    }
    const parseDateToYYYYMM = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        return formattedDate;
    }
    const checkInput = () => {
        let messageError = ''

        if (typeof stockEdit.volume !== "number") {
            if (stockEdit.volume?.trim() === '' || stockEdit.volume?.trim() === null) {
                messageError = { ...messageError, volumeError: "Please enter volume!" }
            } else if (isNaN(Number(stockEdit.volume))) {
                messageError = { ...messageError, volumeError: 'Volume invalid, please enter number!' }
            }
        }

        if (typeof stockEdit.openPrice !== "number") {
            if (stockEdit.openPrice?.trim() === '' || stockEdit.openPrice?.trim() === null) {
                messageError = { ...messageError, openPriceError: "Please enter open price!" }
            } else if (isNaN(Number(stockEdit.openPrice))) {
                messageError = { ...messageError, openPriceError: 'Open price invalid, please enter number!' }
            }
        }

        if (typeof stockEdit.high !== "number") {
            if (stockEdit.high?.trim() === '' || stockEdit.high?.trim() === null) {
                messageError = { ...messageError, highError: "Please enter high!" }
            } else if (isNaN(Number(stockEdit.high))) {
                messageError = { ...messageError, highError: 'High invalid, please enter number!' }
            }
        }

        if (typeof stockEdit.low !== "number") {
            if (stockEdit.low?.trim() === '' || stockEdit.low?.trim() === null) {
                messageError = { ...messageError, lowError: "Please enter low!" }
            } else if (isNaN(Number(stockEdit.low))) {
                messageError = { ...messageError, lowError: 'Low invalid, please enter number!' }
            }

        }

        if (typeof stockEdit.closePrice !== "number") {
            if (stockEdit.closePrice?.trim() === '' || stockEdit.closePrice?.trim() === null) {
                messageError = { ...messageError, closePriceError: "Please enter close price!" }
            } else if (isNaN(Number(stockEdit.closePrice))) {
                messageError = { ...messageError, closePriceError: 'Close price invalid, please enter number!' }
            }
        }
        return messageError
    }

    //save edit
    const saveEdit = (dataEdit, data) => {
        const newData = data.map((stock) => {
            if (stock.stockName === dataEdit.stockName) {
                return dataEdit
            } else {
                return stock
            }
        })
        return newData
    }
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

    const notifyFailure = (message, timeClose) => {
        toast.error(`❌ ${message} !`, {
            position: "top-center",
            autoClose: timeClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    //handle save edit
    const handleSaveEdit = () => {
        const message = checkInput()
        if (message === '') {
            if (searching) {
                setDataToSearching(saveEdit(stockEdit, dataToSearching))
                setFileData(saveEdit(stockEdit, fileData))
            }
            else {
                setFileData(saveEdit(stockEdit, fileData))
            }
            setShowEdit(false)
            setStockEdit(null)
            setMessageError('')
            notifySusscess("Edited success", 1500)
        } else {
            setMessageError(message)
        }
        console.log(message)
    }

    //delete stock
    const deleteStock = (stockCode, data) => {
        const newData = data.filter((stock) => {
            return stock.stockCode !== stockCode
        })
        return newData
    }

    //hande delete
    const handleDelete = (stockCode) => {
        if (searching) {
            setDataToSearching(deleteStock(stockCode, dataToSearching))
            setFileData(deleteStock(stockCode, fileData))
        } else {
            setFileData(deleteStock(stockCode, fileData))
        }
    }

    //date check
    const dateCheck = (data) => {
        const listdate = []
        data.map((stock) => {
            if (!listdate.includes(parseDate(stock.date))) {
                listdate.push(parseDate(stock.date))
            }
        })
        return listdate.length > 1 ? `We found date ${listdate.join(', ')}, please select a date for all stocks` : ""
    }

    //searh
    const searchData = (dataSearch, data) => {
        let result = []
        data.map((stock) => {
            if (String(stock.stockName).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            } else if (String(parseDate(stock.date)).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            } else if (String(stock.volume).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            } else if (String(stock.openPrice).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            } else if (String(stock.high).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            } else if (String(stock.low).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            } else if (String(stock.closePrice).toLowerCase().includes(dataSearch.toLowerCase())) {
                return result = [...result, stock]
            }
        })
        return result
    }

    //handle search
    const handleSearch = () => {
        // console.log(searchData(search,fileData))
        setPageCurrent(0)
        setStartItem(0)
        if (!searching) {
            setSearching(true)
            setDataToSearching(fileData)
            setFileData(searchData(search, fileData))
        } else {
            if (search.trim() === '') {
                setSearching(false)
                setFileData(dataToSearching)
            } else {
                setFileData(searchData(search, dataToSearching))
            }
        }
    }

    //api update
    const apiSaveStocks = () => {
        let data = []
        if (searching) {
            data = dataToSearching
        } else {
            data = fileData
        }
        return axiosInstance.post(`/api/Stocks/SaveStocks`, data)
    }

    //handle upload
    const handleUpload = () => {
        const message = dateCheck(fileData)
        if (message === '') {
            swal({
                // title: response.data.message,
                text:
                    "Do you want to save data stocks ?",
                // icon: "success",
                buttons:
                {
                    Yes: {
                        text: 'Yes',
                        value: true // Giá trị tương ứng với nút này
                    },
                    No: {
                        text: 'No',
                        value: false // Giá trị tương ứng với nút này
                    },
                }
            }).then((res) => {
                if (res) {
                    setLoading(true)
                    apiSaveStocks()
                        .then((result) => {
                            console.log(result)
                            setFileData(result.data)
                            setMessageSystem('Saved successfully, this is your data saved successfully')
                            setFile(null)

                        })
                        .catch((err) => {
                            console.log(err.message)
                            if (err.message === 'Request failed with status code 500') {
                                notifyFailure("Save Failured!", 8000)
                                setMessageSystem('System had data with this date, please check your file!')
                            }
                        }).finally(() => { setLoading(false) })
                } else {
                    console.log("ko save")
                    return;
                }
            })
        } else {
            setMessageSystem(message)
        }
    }


    console.log(fileData)
    const isNotFound = !(currentItems.length > 0) && (fileData || dataToSearching)
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="layout-upload">
                        <div className="choose-file">
                            <input type="file"
                                onChange={(e) => {
                                    // setFileName(e.target.files[0]?.name); 
                                    setFile(e.target.files[0])
                                    setSearch('')
                                    setSearching(false)
                                }}
                            // onClick={() => { setLoadFile(true)}}
                            ></input>
                        </div>
                        {file &&
                            <div>
                                <button className="btn-upload-file" onClick={e => handleUpload()}>Save stocks</button>
                            </div>
                        }
                    </div>
                    <Col lg={12}>
                        <Card>
                            <Card.Header className='header-data-stocks'>
                                {/* <i class="bi bi-search"></i>  */}
                                <input value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    onKeyUp={(e) => {
                                        handleSearch()
                                    }}
                                    type="text" className="
                                        search-data-stocks " placeholder="Search" />
                                <div className="message-system"><i class="bi bi-megaphone"></i>  {messageSystem}</div>


                            </Card.Header >
                            <Card.Body className=''>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                {/* <Link> */}
                                                <strong onClick={() => {
                                                }}>STOCK NAME
                                                </strong>
                                                {/* </Link> */}
                                            </th>
                                            <th>
                                                {/* <Link> */}
                                                <strong onClick={() => {
                                                }}>DATE
                                                </strong>
                                                {/* </Link> */}
                                            </th>
                                            <th>
                                                <strong >VOLUME</strong>
                                            </th>

                                            <th>
                                                <strong>OPEN PRICE</strong>
                                            </th>
                                            <th>
                                                <strong>HIGH</strong>
                                            </th>
                                            <th>
                                                <strong>LOW</strong>
                                            </th>
                                            <th>
                                                <strong>CLOSE PRICE</strong>
                                            </th>
                                            <th>
                                                <strong>ACTION</strong>
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
                                            !isNotFound && (
                                                currentItems.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="stock-name">
                                                                {data.stockName}
                                                            </td>
                                                            <td>
                                                                {(parseDate(data.date))}
                                                            </td>
                                                            <td>
                                                                {data.volume}
                                                            </td>
                                                            <td>
                                                                {data.openPrice}
                                                            </td>
                                                            <td>
                                                                {data.high}
                                                            </td>
                                                            <td>
                                                                {data.low}
                                                            </td>
                                                            <td>
                                                                {data.closePrice}
                                                            </td>
                                                            <td className="action-table">
                                                                <Link className="me-2 shadow btn-xs sharp edit-stock" title="Edit" onClick={() => { setShowEdit(!showEdit); setStockEdit(data) }}><i class="bi bi-pencil-fill"></i></Link>
                                                                <Link className="me-2 shadow btn-xs sharp delete-stock" title="Delete" onClick={() => { handleDelete(data.stockCode) }}><i className="fa fa-close color-danger"></i></Link>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            isNotFound && (
                                                <tr style={{ cursor: 'default', pointerEvents: 'none' }}>
                                                    <td colSpan={8}>
                                                        <div className='d-flex flex-column py-2 align-items-center justify-content-center'>
                                                            <h4>No Result Found</h4>
                                                            <span>Please try again with another keywords</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                    
                                </Table>
                            </Card.Body>
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={(e) => { handlePageClick(e) }
                                }
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={5}
                                pageCount={pageTotal}
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
            <Modal show={showEdit} className="fade " centered>
                <ModalHeader>
                    <Modal.Title>Detail</Modal.Title>
                    <Button onClick={() => { setShowEdit(!showEdit); setMessageError('') }} variant="" className="btn-close"></Button>
                </ModalHeader>
                <ModalBody>
                    {stockEdit &&
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Stock name:</label>
                                    <input type="text" className="form-control" value={stockEdit.stockName} readOnly />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Date:</label>
                                    {/* <input type="text" className="form-control" value={parseDate(stockEdit.date)} onChange={e => {
                                        setStockEdit({ ...stockEdit, date: `${e.target.value}${parseTime(stockEdit.date)}` })
                                    }} /> */}
                                    <DatePicker
                                        className="form-control mb-xxl-0 mb-3"
                                        dateFormat="dd-MM-yyyy"
                                        selected={new Date(stockEdit.date) || null}
                                        onChange={(date) => {
                                            console.log(date)
                                            setStockEdit({ ...stockEdit, date: `${parseDateToYYYYMM(date)}${parseTime(stockEdit.date)}` })
                                            // setDateNeedDraw(date);
                                            // handleGetDetail(parseDateToYYYYMM(date)) 
                                        }}
                                    // placeholderText='Choose a date'

                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Volume:</label>
                                    <input type="text" className="form-control" value={stockEdit.volume} onChange={e => setStockEdit({ ...stockEdit, volume: e.target.value })} />
                                    {messageError.volumeError && <p className="message-error">{messageError.volumeError}</p>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Open price:</label>
                                    <input type="text" className="form-control" value={stockEdit.openPrice} onChange={e => setStockEdit({ ...stockEdit, openPrice: e.target.value })} />
                                    {messageError.openPriceError && <p className="message-error">{messageError.openPriceError}</p>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">High:</label>
                                    <input type="text" className="form-control" value={stockEdit.high} onChange={e => setStockEdit({ ...stockEdit, high: e.target.value })} />
                                    {messageError.highError && <p className="message-error">{messageError.highError}</p>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Low:</label>
                                    <input type="text" className="form-control" value={stockEdit.low} onChange={e => setStockEdit({ ...stockEdit, low: e.target.value })} />
                                    {messageError.lowError && <p className="message-error">{messageError.lowError}</p>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mb-3">
                                    <label className="text-black font-w600">Close price:</label>
                                    <input type="text" className="form-control" value={stockEdit.closePrice} onChange={e => setStockEdit({ ...stockEdit, closePrice: e.target.value })} />
                                    {messageError.closePriceError && <p className="message-error">{messageError.closePriceError}</p>}
                                </div>
                            </div>
                        </div>}
                </ModalBody>
                <ModalFooter>
                    <button className='btn-save' onClick={() => { handleSaveEdit() }}>Save<i class="bi bi-floppy"></i></button>

                </ModalFooter>
            </Modal>
            <ToastContainer />
        </>
    )
}
export default DataStocks