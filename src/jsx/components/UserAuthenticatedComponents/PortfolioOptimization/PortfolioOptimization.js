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
import PortfolioComponent from './PortfolioComponent';

const PortfolioOptimization = () => {

    // console.log(formatDateToYYYYMMDD(startDate))
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    {/* <TabContainer defaultActiveKey="PortfolioComponent">
                        <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                            <Nav.Link className="nav-link nav-portfolio" eventKey="PortfolioComponent" onClick={() => { }}>Portfolio optimization</Nav.Link>
                            <Nav.Link className="nav-link nav-portfolio" eventKey="Chart" onClick={() => { }}>My Favorite</Nav.Link>
                        </Nav>
                        <TabContent>
                            <TabPane eventKey="PortfolioComponent">
                                <PortfolioComponent />
                            </TabPane>
                            <TabPane eventKey="MyFavorite">

                            </TabPane>
                        </TabContent>
                    </TabContainer> */}
                    <PortfolioComponent />
                </div>
            </div>

        </>
    )
}

export default PortfolioOptimization;