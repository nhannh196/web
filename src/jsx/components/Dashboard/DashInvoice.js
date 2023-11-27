import React,{useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

import InvoiceSlider from './InvoiceSlider';
import QuestionIcon from './Ticketing/QuestionIcon';

const RightIcon = () =>{
    return(
        <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">
                <path d="M5.50912 14.5C5.25012 14.5 4.99413 14.4005 4.80013 14.2065L1.79362 11.2C1.40213 10.809 1.40213 10.174 1.79362 9.78302C2.18512 9.39152 2.81913 9.39152 3.21063 9.78302L5.62812 12.2005L12.9306 7.18802C13.3866 6.87502 14.0106 6.99102 14.3236 7.44702C14.6371 7.90352 14.5211 8.52702 14.0646 8.84052L6.07613 14.324C5.90363 14.442 5.70612 14.5 5.50912 14.5Z" fill="#1EBA62"/>
                <path d="M5.50912 8.98807C5.25012 8.98807 4.99413 8.88857 4.80013 8.69457L1.79362 5.68807C1.40213 5.29657 1.40213 4.66207 1.79362 4.27107C2.18512 3.87957 2.81913 3.87957 3.21063 4.27107L5.62812 6.68857L12.9306 1.67607C13.3866 1.36307 14.0106 1.47907 14.3236 1.93507C14.6371 2.39157 14.5211 3.01507 14.0646 3.32857L6.07613 8.81257C5.90363 8.93057 5.70612 8.98807 5.50912 8.98807Z" fill="#1EBA62"/>
            </svg>
        </>
    )
}

const tableBlog = [
    {  title:'Talan Siphron',  mail:'ahmad@mail.com', icon:'#1EBA62', iconClass:'btn-success', icon2: <RightIcon />, icontext:'Complete'},
    {  title:'Thomas Khun',  mail:'soap@mail.com', icon:'#FF4646', iconClass:'btn-primary', icon2: <QuestionIcon colorchange="#01A3FF" />, icontext:'Pending'  },
    {  title:'Marilyn Workman',  mail:'mantha@mail.com',icon:'#FF4646', iconClass:'btn-pink', icon2: <QuestionIcon colorchange="#EB62D0" />, icontext:'Unpaid'  },
    {  title:'Thomas Khun',  mail:'hope@mail.com', icon:'#FF4646', iconClass:'btn-primary', icon2: <QuestionIcon colorchange="#01A3FF" />, icontext:'Pending'   },
    {  title:'Talan Siphron',  mail:'jordan@mail.com' , icon:'#1EBA62', iconClass:'btn-success', icon2: <RightIcon />, icontext:'Complete' },
    {  title:'Marilyn Workman',  mail:'adja@mail.com',icon:'#FF4646', iconClass:'btn-pink', icon2: <QuestionIcon colorchange="#EB62D0" />, icontext:'Unpaid'  },
    {  title:'Thomas Khun',  mail:'soap@mail.com', icon:'#FF4646', iconClass:'btn-primary', icon2: <QuestionIcon colorchange="#01A3FF" />, icontext:'Pending'   },
    {  title:'Talan Siphron',  mail:'kevin@mail.com',icon:'#FF4646', iconClass:'btn-pink', icon2: <QuestionIcon colorchange="#EB62D0" />, icontext:'Unpaid'  },
    {  title:'Marilyn Workman',  mail:'vita@mail.com' , icon:'#1EBA62', iconClass:'btn-success', icon2: <RightIcon />, icontext:'Complete' },
];

const Invoice = () =>{

    const [data, setData] = useState(
		document.querySelectorAll("#example2_wrapper tbody tr")
	);
	const sort = 8;
	const activePag = useRef(0);	
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   // use effect
   useEffect(() => {
      setData(document.querySelectorAll("#example2_wrapper tbody tr"));
      //chackboxFun();
	}, []);

  
   // Active pagginarion
   activePag.current === 0 && chageData(0, sort);
   // paggination
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		//settest(i);
	};

   
	const chackbox = document.querySelectorAll(".sorting_1 input");
	const motherChackBox = document.querySelector(".sorting_asc input");
	const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
         const element = chackbox[i];
         if (type === "all") {
            if (motherChackBox.checked) {
               element.checked = true;
            } else {
               element.checked = false;
            }
         } else {
            if (!element.checked) {
               motherChackBox.checked = false;
               break;
            } else {
               motherChackBox.checked = true;
            }
         }
      }
    };
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-titles">
                                <div className="d-flex align-items-center">
                                    <h2 className="heading">Invoice</h2>
                                   
                                </div>
                                <div className="d-flex flex-wrap my-2 my-sm-0">
                                    <div className="input-group search-area">
                                        <input type="text" className="form-control" placeholder="Search here..." />
                                        <span className="input-group-text">
                                            <Link to={"#"}>
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.3" d="M16.6751 19.4916C16.2194 19.036 16.2194 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9916 22.5084C23.4473 22.964 23.4473 23.7027 22.9916 24.1583C22.536 24.6139 21.7973 24.6139 21.3417 24.1583L16.6751 19.4916Z" fill="white"/>
                                                    <path d="M12.8333 18.6667C16.055 18.6667 18.6667 16.055 18.6667 12.8334C18.6667 9.61169 16.055 7.00002 12.8333 7.00002C9.61166 7.00002 6.99999 9.61169 6.99999 12.8334C6.99999 16.055 9.61166 18.6667 12.8333 18.6667ZM12.8333 21C8.323 21 4.66666 17.3437 4.66666 12.8334C4.66666 8.32303 8.323 4.66669 12.8333 4.66669C17.3436 4.66669 21 8.32303 21 12.8334C21 17.3437 17.3436 21 12.8333 21Z" fill="white"/>
                                                </svg>
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="invoice-btn">
                                        <button className="btn btn-primary">New Invoice <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="#FCFCFC"/>
                                            <path d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z" fill="#FCFCFC"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* swiper */}
                        <InvoiceSlider />
                    {/* swiper end */}

                    <div className="row">
                        <div className="col-xl-12" >                            
                            <div className="table-responsive  full-data dataTables_wrapper" id="example2_wrapper">
                                <table className="table-responsive-lg table display mb-4 dataTablesCard  text-black dataTable no-footer" id="example2">
                                    <thead>
                                        <tr>
                                            <th className="sorting_asc ">
                                                <input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
                                            </th>
                                            <th>ID Invoice</th>
                                            <th>Due Date</th>
                                            <th>Client</th>
                                            <th>Contact</th>
                                            <th className="text-end">Amount</th>
                                            <th className="text-end">Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableBlog.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td className="sorting_1">
                                                    <div className="checkbox me-0 align-self-center">
                                                        <div className="custom-control custom-checkbox ">
                                                            <input type="checkbox" className="form-check-input" id={"customCheckBox2"+ ind} required="" 
                                                                onClick={() => chackboxFun()} 
                                                            />
                                                            <label className="custom-control-label" htmlFor={"customCheckBox2"+ ind} ></label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{"#INV-0001200" + ind}</td>
                                                <td className="whitesp-no fs-14 font-w400">June 1, 2022, 08:22 AM</td>
                                                <td className="whitesp-no p-0">
                                                    <div className="py-sm-3 py-1">
                                                        <div >
                                                            <h6 className="font-w500 fs-15 mb-0">Marilyn Workman</h6>
                                                            <span className="fs-14 font-w400"><Link to={"app-profile"}>@thomaskhuncoro</Link></span>
                                                        </div>												
                                                    </div>
                                                </td>
                                                <td className="whitesp-no">
                                                    <Link to={"#"} className="tb-mail">
                                                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M18 0.889911C18.0057 0.823365 18.0057 0.756458 18 0.689911L17.91 0.499911C17.91 0.499911 17.91 0.429911 17.86 0.399911L17.81 0.349911L17.65 0.219911C17.6062 0.175413 17.5556 0.138269 17.5 0.109911L17.33 0.0499115H17.13H0.93H0.73L0.56 0.119911C0.504246 0.143681 0.453385 0.177588 0.41 0.219911L0.25 0.349911C0.25 0.349911 0.25 0.349911 0.25 0.399911C0.25 0.449911 0.25 0.469911 0.2 0.499911L0.11 0.689911C0.10434 0.756458 0.10434 0.823365 0.11 0.889911L0 0.999911V12.9999C0 13.2651 0.105357 13.5195 0.292893 13.707C0.48043 13.8946 0.734784 13.9999 1 13.9999H10C10.2652 13.9999 10.5196 13.8946 10.7071 13.707C10.8946 13.5195 11 13.2651 11 12.9999C11 12.7347 10.8946 12.4803 10.7071 12.2928C10.5196 12.1053 10.2652 11.9999 10 11.9999H2V2.99991L8.4 7.79991C8.5731 7.92973 8.78363 7.99991 9 7.99991C9.21637 7.99991 9.4269 7.92973 9.6 7.79991L16 2.99991V11.9999H14C13.7348 11.9999 13.4804 12.1053 13.2929 12.2928C13.1054 12.4803 13 12.7347 13 12.9999C13 13.2651 13.1054 13.5195 13.2929 13.707C13.4804 13.8946 13.7348 13.9999 14 13.9999H17C17.2652 13.9999 17.5196 13.8946 17.7071 13.707C17.8946 13.5195 18 13.2651 18 12.9999V0.999911C18 0.999911 18 0.929911 18 0.889911ZM9 5.74991L4 1.99991H14L9 5.74991Z" fill="#01A3FF"/>
                                                        </svg>
                                                        vita@mail.com	
                                                    </Link>	
                                                </td>
                                                <td className= "doller">$ 650,036.34 </td>
                                                <td className="text-end">
                                                    <span className={`btn light  btn-sm ${item.iconClass}`}>
                                                        {item.icon2}
                                                        {" "}
                                                        {item.icontext}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="div" className="i-false btn-link btn sharp tp-btn btn-primary pill" >
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8.33319 9.99985C8.33319 10.9203 9.07938 11.6665 9.99986 11.6665C10.9203 11.6665 11.6665 10.9203 11.6665 9.99986C11.6665 9.07938 10.9203 8.33319 9.99986 8.33319C9.07938 8.33319 8.33319 9.07938 8.33319 9.99985Z" fill="#ffffff"/>
                                                                <path d="M8.33319 3.33329C8.33319 4.25376 9.07938 4.99995 9.99986 4.99995C10.9203 4.99995 11.6665 4.25376 11.6665 3.33329C11.6665 2.41282 10.9203 1.66663 9.99986 1.66663C9.07938 1.66663 8.33319 2.41282 8.33319 3.33329Z" fill="#ffffff"/>
                                                                <path d="M8.33319 16.6667C8.33319 17.5871 9.07938 18.3333 9.99986 18.3333C10.9203 18.3333 11.6665 17.5871 11.6665 16.6667C11.6665 15.7462 10.9203 15 9.99986 15C9.07938 15 8.33319 15.7462 8.33319 16.6667Z" fill="#ffffff"/>
                                                            </svg>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end">
                                                            <Dropdown.Item>Delete</Dropdown.Item>
                                                            <Dropdown.Item>Edit</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                                    <div className="dataTables_info">
                                        Showing {activePag.current * sort + 1} to{" "}
                                        {data.length > (activePag.current + 1) * sort
                                            ? (activePag.current + 1) * sort
                                            : data.length}{" "}
                                        of {data.length} entries
                                    </div>
                                    <div
                                        className="dataTables_paginate paging_simple_numbers mb-0"
                                        id="example2_paginate"
                                    >
                                        <Link
                                            className="paginate_button previous disabled"
                                            to="/invoice"
                                            onClick={() =>
                                                activePag.current > 0 &&
                                                onClick(activePag.current - 1)
                                            }
                                            >
                                            <i className="fa-solid fa-angle-left"></i>
                                            
                                        </Link>
                                        <span>
                                            {paggination.map((number, i) => (
                                                <Link
                                                    key={i}
                                                    to="/invoice"
                                                    className={`paginate_button  ${
                                                        activePag.current === i ? "current" : ""
                                                    } `}
                                                    onClick={() => onClick(i)}
                                                >
                                                    {number}
                                                </Link>
                                            ))}
                                        </span>

                                        <Link
                                            className="paginate_button next"
                                            to="/invoice"
                                            onClick={() =>
                                                activePag.current + 1 < paggination.length &&
                                                onClick(activePag.current + 1)
                                            }
                                        >
                                            <i className="fa-solid fa-angle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>                
                        </div>
                    </div>

                </div>       
            </div>    
        </>
    )
}
export default Invoice;