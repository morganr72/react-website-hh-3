import React, { useState, useEffect } from "react";
import "../Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Legend,
  BarController,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  Tooltip,
  Title,
  Legend
);

function Commands() {
  const [val, setValue] = React.useState("66E32E1B");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  var baseUrl =
    "https://ivnh6r4741.execute-api.us-east-1.amazonaws.com/default/CommandsForWeb?device=" +
    val;
  var apiKey = "daZz3dVkIVhxLOi6AwLm55lGopH2Gnq5xwAdOFUi";

  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
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
    fetchCommands();
  }, [baseUrl, apiKey]);
  console.log("chart", chart);

  var data = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Gas Heating`,
        data: chart?.map((x) => x.GasHeat),
        backgroundColor: "#0033cc",
      },
      {
        label: `Gas Water`,
        data: chart?.map((x) => x.GasWater),
        backgroundColor: "#08051b",
      },
      {
        label: `HP Heating`,
        data: chart?.map((x) => x.HPHeat),
        backgroundColor: "#33cc00",
      },
      {
        label: `HP Water`,
        data: chart?.map((x) => x.HPWater),
        backgroundColor: "#de0b4a",
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
        text: "Commands To Be Issued",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        stacked: true,
        title: {
          display: true,
          text: "kWh",
        },
      },
      //   y1: {
      //     type: "linear",
      //     display: true,
      //     position: "right",
      //     title: {
      //       display: true,
      //       text: "Solar Rad",
      //     },
      //   },
    },
  };

  return (
    <>
      <div>
        <Bar height={400} data={data} options={options} />
      </div>
      <div className="Entry">
        {/* <input onChange={change} value={val} /> */}
        <div>
          <label>
            DeviceID
            <select value={val} onChange={handleChange}>
              <option value="48A2A459">48A2A459</option>
              <option value="66E32E1B">66E32E1B</option>
              <option value="988A301F">988A301F</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default Commands;