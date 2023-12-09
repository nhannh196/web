import DatePicker from "react-datepicker";
import {
    TabContainer,
    TabContent,
    TabPane,
    Nav
} from 'react-bootstrap';
import { useMemo, useState, useEffect } from "react";
import { axiosInstance } from "../../../services/AxiosConfig";
import './chart.css';
import ReactApexChart from "react-apexcharts";
import { isEmpty } from "lodash";
import { isDate } from "lodash";

const DrawChart = (props) => {
    //month of stock to draw chart
    const [monthNeedDraw, setMonthNeedDraw] = useState(new Date());
    //data to draw chart
    const [dataToDraw, setDataToDraw] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(monthNeedDraw)
        if (monthNeedDraw) {
            handleGetDetail(parseDateToYYYYMM(monthNeedDraw));
        }
    }, [monthNeedDraw])

    const parseDateToYYYYMM = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDate = `${year}-${formattedMonth}`;
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
        dataToDraw.map((data) => {
            dataDailyProfit = [...dataDailyProfit, data.dailyProfit];
            date = [...date, data.dtyyyymmdd]
        })

        let obj = {
            series: [
                {
                    name: "Daily Profit",
                    data: dataDailyProfit,
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "area",
                    group: "social",
                    background: '#fff',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,

                },
                stroke: {
                    width: [2, 2],
                    colors: ["#1c9ef9", "#709fba"],
                    curve: "straight",
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
                    size: 6,
                    border: 0,
                    //strokeColor: "#fff",
                    colors: ["#1c9ef9", "#709fba"],
                    hover: {
                        size: 6,
                    },
                },

                xaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    categories: date,
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: "#3e4954",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                            fontWeight: 100,
                        },
                    },
                },
                fill: {
                    colors: ["#1c9ef9", "#709fba"],
                    type: "solid",
                    opacity: 0.07,
                },
                grid: {
                    borderColor: '#ffffff1a',
                },
            },

        }
        return obj
    }, [monthNeedDraw, dataToDraw])

    //obj char
    const objTodrawChart = useMemo(() => {
        let dataDraw = []
        let dataX = ''
        let dataY = []
        dataToDraw.map((data) => {
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
                data: dataDraw
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
    }, [dataToDraw])

    //api get detail
    const getDetailOnMonth = (date) => {
        return axiosInstance.post(`/api/Stocks/GetStockChart?ticker=${props.stockName}&date=${date}`)
    }

    //get detail
    const handleGetDetail = (date) => {
        setIsLoading(true)
        getDetailOnMonth(date)
            .then(respone => {
                setDataToDraw(respone.data)
                console.log(respone.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    console.log({ dataToDraw })
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className='row'>
                    <div className="col-xl-4">
                        <DatePicker
                            className="form-control mb-xxl-0 mb-3"
                            dateFormat="yyyy/MM"
                            selected={monthNeedDraw || null}
                            onChange={(date) => {
                                setMonthNeedDraw(date);
                                // handleGetDetail(parseDateToYYYYMM(date)) 
                            }}
                            placeholderText='Choose a date'
                            showMonthYearPicker
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <TabContainer defaultActiveKey="DailyProfitChart">
                            <Nav className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                <Nav.Link className="nav-link nav-portofolio" eventKey="DailyProfitChart" onClick={() => { }}>DailyProfit Chart</Nav.Link>
                                <Nav.Link className="nav-link nav-portofolio" eventKey="Chart" onClick={() => { }}>Chart</Nav.Link>
                            </Nav>
                            <TabContent>
                                <TabPane eventKey="DailyProfitChart">
                                    {isLoading && (
                                        <div class="spinner-border" role="status"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50% -50%)',
                                                zIndex: 100
                                            }}
                                        >
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    )}
                                    <div id="chart" className="line-chart-style bar-chart">
                                        {dataToDraw?.length ?
                                            <ReactApexChart
                                                options={objToDrawDailyProfit.options}
                                                series={objToDrawDailyProfit.series}
                                                type="area"
                                                height={350}
                                            /> : <h4>No data</h4>
                                        }
                                    </div>
                                </TabPane>
                                <TabPane eventKey="Chart" style={{ position: 'relative' }}>
                                    {isLoading && (
                                        <div class="spinner-border" role="status"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50% -50%)',
                                                zIndex: 100
                                            }}
                                        >
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    )}
                                    <div>
                                        {dataToDraw?.length ?
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