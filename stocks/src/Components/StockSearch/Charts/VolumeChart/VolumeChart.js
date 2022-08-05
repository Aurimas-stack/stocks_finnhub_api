import Chart from "react-apexcharts";

const VolumeChart = (props) => {
  const series = [
    {
      data: props.data.map(({ _, volume }) => volume),
    },
  ];
  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: `${props.symbol} Stocks`,
      align: "left",
    },
    subtitle: {
      text: "Volume",
      align: "right",
    },
    labels: props.data.map(({ dates, _ }) => dates.toISOString()),
    xaxis: {
      type: "datetime",
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default VolumeChart;
