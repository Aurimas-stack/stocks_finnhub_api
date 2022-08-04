import Chart from "react-apexcharts";
import Button from "../UI/Button/Button";
import VolumeChart from "./Charts/VolumeChart/VolumeChart";

const StockChart = (props) => {
  console.log(props.data)
  const series = [
    {
      data: props.data[0].candle,
    },
  ];
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    title: {
      text: props.symbol,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="container">
      <Button className="char-btn" onClick={props.onChartSwitch}>
        {props.showCandles ? "Show Volume" : "Show Candles"}
      </Button>
      {!props.showCandles && <VolumeChart symbol={props.symbol} data={props.data[0].volume} />}
      {props.showCandles && (
        <Chart
          options={options}
          series={series}
          type="candlestick"
          width="95%"
        />
      )}
    </div>
  );
};

export default StockChart;
