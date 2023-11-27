import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexBar3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Income",
          data: [420, 550, 850, 220, 650],
        },
        {
          name: "Expenses",
          data: [170, 850, 101, 90, 250],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: true,
          fontSize: "12px",
          fontWeight: 300,

          labels: {
            colors: "#787878",
          },
          position: "bottom",
          horizontalAlign: "center",
          markers: {
            width: 19,
            height: 19,
            strokeWidth: 0,
            radius: 19,
            strokeColor: "#fff",
            fillColors: ["#1c9ef9", "#709fba"],
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
		grid:{
			 borderColor: '#ffffff1a',
		},
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["06", "07", "08", "09", "10"],
			axisBorder: {
			   show: false,
			},
		    axisTicks: {
				show: false,
			},
        },
        fill: {
          colors: ["#1c9ef9", "#709fba"],
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
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
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default ApexBar3;
