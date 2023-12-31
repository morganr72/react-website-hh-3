import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Legend
);

// Chart.defaults.color = "#0033cc";

const LineChart = () => {
  var baseUrl =
    "https://zb93ovvqp4.execute-api.us-east-1.amazonaws.com/default/TempDataForWeb?device=100102";
  var apiKey = "UqiatVkvjX6aYJn9Syzyx1kxY2yplhvW7iXTqhdM";

  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchTemps = async () => {
      await fetch(`${baseUrl}`, {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${apiKey}`,
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
          // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log(json);
            setChart(json.content);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchTemps();
  }, [baseUrl, apiKey]);
  console.log("chart", chart);

  var data = {
    labels: chart?.map((x) => x.Time),
    datasets: [
      {
        label: `Internal Temp`,
        data: chart?.map((x) => x.Temperature),
        borderWidth: 1,
        borderColor: "#0033cc",
        backgroundColor: "#0033cc",
        yAxisID: "y",
      },
      {
        label: `External Temp`,
        data: chart?.map((x) => x.ExternalTemp),
        borderWidth: 1,
        borderColor: "#cc00000",
        backgroundColor: "#cc00000",
        yAxisID: "y",
      },
      {
        label: `Solar Rad`,
        data: chart?.map((x) => x.SolarRadiation),
        borderWidth: 1,
        borderColor: "#33cc00",
        backgroundColor: "#33cc00",
        yAxisID: "y1",
        pointStyle: "triangle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: true,
        text: "Weather and Temperature",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
      },
    },
  };

  return (
    <div>
      <Line height={400} data={data} options={options} />
    </div>
  );
};

export default LineChart;
