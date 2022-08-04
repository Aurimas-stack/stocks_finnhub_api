import Chart from "react-apexcharts";

const VolumeChart = (props) => {
    console.log(props.data)
    const series = [
        {
            data: props.data.map(({_, volume}) => volume),
        },
    ];
    
    console.log(props.data.map(({dates, _}) => dates.toISOString().slice(0, 10)))

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
      align: "left",
    },
    labels: props.data.map(({dates, _}) => dates.toISOString().slice(0, 10)),
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default VolumeChart;
