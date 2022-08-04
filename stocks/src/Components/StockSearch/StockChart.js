import Chart from "react-apexcharts";

const StockChart = (props) => {
  const series = [{
    data: props.data
  }];
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      zoom: {
        enabled: true
      }
    },
    title: {
      text: props.symbol,
      align: "left",
    },
    xaxis: {
      type: "datetime",
      categories: []
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="container">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        width="95%"
      />
    </div>
  );
};

export default StockChart;
