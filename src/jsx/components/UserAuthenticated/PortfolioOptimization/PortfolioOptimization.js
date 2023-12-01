import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    TabContainer,
    TabContent,
    TabPane,
    Nav
} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import DatePicker from "react-datepicker";
import '../../../../css/datepicker.css';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import "./optimization.css"
import ReactApexChart from "react-apexcharts";
import PortofolioComponent from './PortofolioComponent';

const PortofolioOptimization = () => {

    // console.log(formatDateToYYYYMMDD(startDate))
    return (
        <>
            <div className="row">
            <div className="col-xl-12">
                <TabContainer defaultActiveKey="PortofolioComponent">
                    <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                        <Nav.Link className="nav-link nav-portofolio" eventKey="PortofolioComponent" onClick={() => { }}>Portofolio optimization</Nav.Link>
                        <Nav.Link className="nav-link nav-portofolio" eventKey="Chart" onClick={() => { }}>My Favorite</Nav.Link>
                    </Nav>
                    <TabContent>
                        <TabPane eventKey="PortofolioComponent">
                            <PortofolioComponent />
                        </TabPane>
                        <TabPane eventKey="Chart">
                            
                        </TabPane>
                    </TabContent>
                </TabContainer>
                </div>
            </div>

        </>
    )
}

export default PortofolioOptimization;