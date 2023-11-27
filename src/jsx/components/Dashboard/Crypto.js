import React,{useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//Component
import DropDownBlog from './DropDownBlog';
import { IconFirst, IconSecond,
    IconThird,IconFourth
} 
from './Crypto/Icon';
import CryptoSlider from './Crypto/CryptoSlider';

const MarketAreaChart = loadable(() =>
	pMinDelay(import("./Crypto/MarketAreaChart"), 1000)
);

const MarketData = [
    {headClass:'green', title: 'LTC', IconBlog: IconFirst , month:'March', price:'120.45', },
    {headClass:'yellow', title: 'BTC', IconBlog: IconSecond, month:'May', price:'220.50', },
    {headClass:'blue', title: 'ETH', IconBlog: IconThird, month:'June', price:'320.10', },
    {headClass:'pink', title: 'RIPPLE', IconBlog: IconFourth, month:'August', price:'190.30', },
];

const sellingData = [
    { title:'Sell' },
    { title:'Buy' },
];

const Crypto = () =>{
    const [selectBtn, setSelectBtn] = useState("This Month");
    const [selectBtn2, setSelectBtn2] = useState("Year");
    return(
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-titles">
                                <div className="d-flex align-items-center">
                                    <h2 className="heading">Crypto</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row wow fadeInUp main-card" data-wow-delay="0.7s">
                        <div className="col-xxl-8 col-xl-9">
                            {/* <swiper></swiper> */}
                            <CryptoSlider />
                            <div className="row">
                                <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
                                    <div className="card market_chart">
                                        <div className="card-header border-0 align-items-start flex-wrap pb-0">
                                            <div>
                                                <h2 className="heading">Market Chart</h2>
                                                <div className="market-data">
                                                    <div className="income data">
                                                        <span>This Month</span>
                                                        <h4>$29.999.00</h4>
                                                    </div>
                                                    <div className="price data">
                                                        <span>Price</span>
                                                        <h4>480 <sub>- 0,5%</sub></h4>
                                                    </div>
                                                    <div className="rate data">
                                                        <span>Rate</span>
                                                        <h4>-0.0662%/hr</h4>
                                                    </div>
                                                    <div className="volume data">
                                                        <span>volume</span>
                                                        <h4>175k</h4>
                                                    </div>

                                                </div>		
                                            </div>
                                            <div className="d-flex align-items-center">
                                                 <Dropdown className="me-4 drop-select">
                                                    <Dropdown.Toggle as="div" className="i-false drop-select-btn">{selectBtn} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=>setSelectBtn("This Month")}>This Month</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>setSelectBtn("This Weeks")}>This Weeks</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>setSelectBtn("Today")}>Today</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <DropDownBlog />
                                            </div>
                                        </div>
                                        <div className="card-body custome-tooltip pt-0"> 
                                            <MarketAreaChart />
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-3">
                            <div className="row">                                
                                <div className="col-xl-12 col-lg-6">
                                    <div className="card market-previews">
                                        <div className="card-header border-0 pb-0">
                                            <div>
                                                <h2 className="heading">Market Previews</h2>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0 px-0">
                                            { MarketData.map((data, index)=>(
                                                <div className={`previews-info ${data.headClass}`} key={index}>
                                                    <div className="pre-icon">
                                                        <span className="icon">
                                                            {data.IconBlog}
                                                        </span>
                                                        <div>
                                                            <h6>{data.title}/Year</h6>
                                                            <span>{data.month}</span>
                                                        </div>
                                                    </div>
                                                    <div className="count">
                                                        <h6>{data.price}</h6>
                                                        <span>1,24%</span>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                </div>                                
                                <div className="col-xl-12 col-lg-6">
                                    <div className="card exchange">
                                        <div className="card-header d-block border-0">
                                            <h2 className="heading">Exchange</h2>
                                            <div className="balance">
                                                <div className="header-content">
                                                    <h6> Balance</h6>
                                                    <span>12/24</span>
                                                </div>
                                                <h4 className="count">$ 12.568,60</h4>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0">
                                            {sellingData.map((item , ind)=>(
                                                <div className="selling" key={ind}>
                                                    <h4>{item.title}</h4>
                                                    <div className="form_exchange" >
                                                        <div className="input_exchange">
                                                            <input type="text" className="input-select" placeholder={item.title} />
                                                        </div>
                                                        <div className="crypto-select">
                                                            <Dropdown className="drop-select">
                                                                <Dropdown.Toggle as="div" className="i-false drop-select-btn style-2">{selectBtn2} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={()=>setSelectBtn2("Year")}>Year</Dropdown.Item>
                                                                    <Dropdown.Item onClick={()=>setSelectBtn2("Weeks")}>Weeks</Dropdown.Item>
                                                                    <Dropdown.Item onClick={()=>setSelectBtn2("Day")}>Day</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <button className="btn btn-primary w-100 mt-3">Confirm</button>
                                        </div>
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
export default Crypto;