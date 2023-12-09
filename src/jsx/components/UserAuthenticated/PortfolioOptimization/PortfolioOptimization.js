import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    TabContainer,
    TabContent,
    TabPane,
    Nav
} from 'react-bootstrap';
import '../../../../css/datepicker.css';
import "./optimization.css"
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
                            <TabPane eventKey="MyFavorite">

                            </TabPane>
                        </TabContent>
                    </TabContainer>
                </div>
            </div>

        </>
    )
}

export default PortofolioOptimization;