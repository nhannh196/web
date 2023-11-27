import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine5 extends React.Component {
  constructor(props) {
    super(props);
    let stockDraw=JSON.parse(localStorage.getItem('stockDraw'))
    // localStorage.removeItem('stockDraw');  

    // console.log(stockDraw.listChart)
    let stockDrawXisDate=[]
    let stockDrawYisDailyProfit=[]
    stockDraw.listChart.forEach(stock => {
      stockDrawXisDate=[...stockDrawXisDate,stock.dtyyyymmdd]
      stockDrawYisDailyProfit=[...stockDrawYisDailyProfit,stock.dailyProfit]
    });
  

    this.state = {
      series: [
        {
          name: "Daily Profit",
          data: stockDrawYisDailyProfit,
        },
        // {
        //   name: "Standard Deviation",
        //   data: [1],
        // },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          group: "social",
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
			categories:stockDrawXisDate,
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
        grid:{
			borderColor: '#ffffff1a',
		},
      },
    };
  }

  render() {
    return (
      <div id="chart" className="line-chart-style bar-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}

export default ApexLine5;
