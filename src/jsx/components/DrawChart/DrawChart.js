import DatePicker from "react-datepicker";
import {
    TabContainer,
    TabContent,
    TabPane,
    Nav,
    Dropdown,
} from 'react-bootstrap';
import Select from "react-select";
import '../../../css/page-load.css'

import { useMemo, useState, useEffect } from "react";
import { axiosInstance } from "../../../services/AxiosConfig";
import './chart.css';
import ReactApexChart from "react-apexcharts";
import { isEmpty } from "lodash";
import { isDate } from "lodash";

const DrawChart = (props) => {
    //month of stock to draw chart
    // console.log(props)
    const [dateNeedDraw, setDateNeedDraw] = useState(new Date(props.stock.date));
    //data to draw chart
    const [dataToDraw, setDataToDraw] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        "value": "1",
        "label": "1 month"
    })

    useEffect(() => {
        // console.log(dateNeedDraw)
        if (dateNeedDraw) {
            handleGetDetail(parseDateToYYYYMM(dateNeedDraw));
        }
    }, [dateNeedDraw, selectedOption])

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

    const convertDateStringToMilliseconds = (dateString) => {
        const milliseconds = new Date(dateString).getTime();
        return milliseconds;
    }

    //obj dailyprofit chart
    const objToDrawDailyProfit = useMemo(() => {
        let dataDailyProfit = []
        let date = []
        dataToDraw?.listChart?.map((data) => {
            dataDailyProfit = [...dataDailyProfit, data.dailyProfit];
            date = [...date, data.dtyyyymmdd]
        })

        let obj = {
            series: [
                {
                    name: "Daily Profit",
                    data: dataDailyProfit.reverse(),
                },
            ],
            options: {

                chart: {
                    height: 350,
                    type: "area",
                    group: "social",
                    background: '#fff',
                    toolbar: {
                        show: true,
                    },
                    zoom: {
                        enabled: true,
                    },
                },
                tooltip: {
                    // enabled: false,
                    marker: {
                        show: true,
                        fillColors: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [2, 2],
                    // colors: ["#1c9ef9", "#709fba"],
                    curve: "smooth",
                },
                legend: {
                    tooltipHoverFormatter: function (val, opts) {
                        return (
                            val +
                            " - " +
                            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                            ""
                        );
                    },
                    labels: {
                        colors: "#787878",
                    },
                },
                markers: {
                    size: 2,
                    border: 0,
                    //strokeColor: "#fff",
                    // colors: ["#1c9ef9", "#709fba"],

                    hover: {
                        size: 4,
                    },
                },

                xaxis: {
                    // labels:{
                    //     show: false,
                    // },

                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: true,
                    },
                    categories: date.reverse(),
                },
                yaxis: {

                    labels: {
                        style: {
                            colors: "#3e4954",
                            fontSize: "12px",
                            fontFamily: "Poppins",
                            fontWeight: 80,
                        },



                    },
                },
                fill: {
                    // colors: ["#1c9ef9", "#709fba"],
                    // type: "solid",
                    // opacity: 0.08,
                    // type: 'gradient',


                },
                grid: {
                    borderColor: '#ffffff1a',
                },
            },

        }
        return obj
    }, [dateNeedDraw, dataToDraw, selectedOption])

    //obj chart cadlestick
    const objTodrawChart = useMemo(() => {
        let dataDraw = []
        let dataX = ''
        let dataY = []
        dataToDraw?.listChart?.map((data) => {
            dataX = data.dtyyyymmdd
            dataY = [data.openPrice, data.high, data.low, data.closePrice]
            dataDraw = [...dataDraw, {
                x: dataX,
                y: dataY
            }]
        })
        let obj = {
            series: [{
                name: 'candle',
                data: dataDraw.reverse()
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'candlestick',
                    background: '#fff'
                },
                // title: {
                //     text: 'CandleStick Chart - Category X-axis',
                //     align: 'left'
                // },
                annotations: {
                    xaxis: [
                        {
                            x: 'Oct 06 14:00',
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                style: {
                                    fontSize: '12px',
                                    color: '#fff',
                                    background: '#00E396'
                                },
                                orientation: 'horizontal',
                                offsetY: 7,
                                text: 'Annotation Test'
                            }
                        }
                    ]
                },
                tooltip: {
                    enabled: true,
                },
                xaxis: {
                    type: 'category',

                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            },


        };
        return obj
    }, [dateNeedDraw, dataToDraw, selectedOption])

    //api get detail
    const getDetailtoDraw = (date) => {
        return axiosInstance.post(`/api/Stocks/GetStockChart?ticker=${props.stock.stockName}&date=${date}&option=${selectedOption.value}`)
    }

    //get detail
    const handleGetDetail = (date) => {
        setIsLoading(true)
        getDetailtoDraw(date)
            .then(respone => {
                setDataToDraw(respone.data)

            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    //option to draw
    const options = [
        { value: 1, label: "1 month" },
        { value: 3, label: "3 months" },
        { value: 6, label: "6 months" },
        { value: 9, label: "9 months" },
        { value: 12, label: "12 months" },
    ];

    // console.log(dataToDraw)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className='detail-chart'>
                    <div className="col-xl-2 draw-chart">
                        <DatePicker
                            className="form-control mb-xxl-0 mb-3"
                            dateFormat="dd/MM/yyyy"
                            selected={dateNeedDraw || null}
                            onChange={(date) => {
                                setDateNeedDraw(date);
                                // handleGetDetail(parseDateToYYYYMM(date)) 
                            }}
                            placeholderText='Choose a date'

                        />
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                            }}
                        />
                    </div>
                    <div className="detail-chart_view">
                        <div><strong>Profit average:</strong>{` ${Number(dataToDraw?.profitAverage).toFixed(4)}`}</div>
                        <div><strong>Standard deviation:</strong>{` ${Number(dataToDraw?.standardDeviation).toFixed(4)}`}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <TabContainer defaultActiveKey="DailyProfitChart">
                            <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                <Nav.Link className="nav-link nav-portfolio" eventKey="DailyProfitChart" onClick={() => { }}>Daily Profit Chart</Nav.Link>
                                <Nav.Link className="nav-link nav-portfolio" eventKey="Chart" onClick={() => { }}>Candlestick Chart</Nav.Link>
                            </Nav>
                            <TabContent>
                                <TabPane eventKey="DailyProfitChart">
                                    {isLoading && (
                                        <div class="spinner-border" role="status"
                                        >
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    )}
                                    <div id="chart" className="line-chart-style bar-chart">
                                        {dataToDraw?.listChart?.length ?
                                            <ReactApexChart
                                                options={objToDrawDailyProfit.options}
                                                series={objToDrawDailyProfit.series}
                                                type="area"
                                                height={400}
                                            // width={200}
                                            /> : <h4>No data</h4>
                                        }
                                    </div>
                                </TabPane>
                                <TabPane eventKey="Chart" style={{ position: 'relative' }}>
                                    {isLoading && (
                                        <div class="spinner-border" role="status"
                                            style={{ top: "50%" }}>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    )}
                                    <div>
                                        {dataToDraw?.listChart?.length ?
                                            <ReactApexChart
                                                options={objTodrawChart.options}
                                                series={objTodrawChart.series}
                                                type="candlestick"
                                                // width={600}
                                                height={350}

                                            /> : <h4>No data</h4>
                                        }
                                    </div>
                                </TabPane>
                            </TabContent>
                        </TabContainer>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DrawChart