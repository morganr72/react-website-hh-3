import React, { useState, useEffect, useId, useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "chartjs-adapter-moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth0 } from "@auth0/auth0-react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import "../Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Legend,
  BarController,
  BarElement,
  Tooltip,
  TimeScale,
  Colors,
  LineElement,
  PointElement,
  LinearScale,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  Legend,
  Colors,
  ChartDataLabels
);

function Commands() {
  const { user } = useAuth0();
  const [val, setValue] = React.useState("P100001");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  var fmDate = format(range[0].startDate, "MM-dd-yyyy");
  var toDate = format(range[0].endDate, "MM-dd-yyyy");
  console.log(fmDate);
  console.log(toDate);
  var baseUrl =
    "https://w6mxmc7f66.execute-api.us-east-1.amazonaws.com/default/CumulativeAPI?premid=" +
    val +
    "&userid= " +
    user.name +
    "&fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  console.log(baseUrl);
  var apiKey = "aEcyGu7cHfUvD9d3Iy0oakXes38PlTTGz0hgaN70";
  const [chart, setChart] = useState([]);

  const fetchCommands = function () {
    fetch(`${baseUrl}`, {
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

  console.log("chart", chart);

  var data = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Gas Cost`,
        type: "bar",
        data: chart?.map((x) => x.cGasCost),
        backgroundColor: "#33cde5",
        stack: "Stack 0",
        datalabels: {
          color: "#0b0a0a",
          textAlign: "center",
          font: {
            weight: "bold",
            size: 14,
          },
          formatter: function (value, context) {
            if (value === 0) {
              return "";
            } else {
              return (
                "..and Gas cost £" + Number.parseFloat(value).toFixed(2) + ".."
              );
            }
          },
        },
      },
      {
        label: `HP Cost`,
        type: "bar",
        data: chart?.map((x) => x.cHPCost),
        backgroundColor: "#f4d4a0",
        stack: "Stack 0",
        datalabels: {
          color: "#0b0a0a",
          textAlign: "center",
          font: {
            weight: "bold",
            size: 14,
          },
          formatter: function (value, context) {
            return (
              "In this period Heat Pump Cost\n£" +
              Number.parseFloat(value).toFixed(2) +
              ".."
            );
          },
        },
        // borderWidth: 2,
        // borderColor: "#2613cc",
        // pointRadius: 3,
        // backgroundColor: "#2613cc",
      },
      {
        label: `Total Cost`,
        type: "bar",
        data: chart?.map((x) => x.cTotalCost),
        backgroundColor: "#f48183",
        stack: "Stack 1",
        datalabels: {
          color: "#0b0a0a",
          font: {
            weight: "bold",
            size: 14,
          },
          textAlign: "center",
          formatter: function (value, context) {
            return (
              ".. so Total cost was\n£" + Number.parseFloat(value).toFixed(2)
            );
          },
        },
        // borderWidth: 2,
        // borderColor: "#14d214",
        // pointRadius: 3,
        // backgroundColor: "#14d214",
      },

      {
        label: `Full HP Cost`,
        type: "bar",
        data: chart?.map((x) => x.cEFPCost),
        backgroundColor: "#f4d4a0",
        stack: "Stack 3",
        datalabels: {
          color: "#0b0a0a",
          font: {
            weight: "bold",
            size: 14,
          },
          textAlign: "center",
          formatter: function (value, context) {
            return (
              "HP only cost would have been\n£" +
              Number.parseFloat(value).toFixed(2)
            );
          },
        },
        // borderWidth: 2,
        // borderColor: "#6adced",
        // pointRadius: 3,
        // backgroundColor: "#6adced",
      },
      {
        label: `HP Gas Equivalent`,
        type: "bar",
        data: chart?.map((x) => x.cHPGasEquiv + x.cGasCost),
        backgroundColor: "#33cde5",
        stack: "Stack 2",
        datalabels: {
          color: "#0b0a0a",
          font: {
            weight: "bold",
            size: 14,
          },
          textAlign: "center",
          formatter: function (value, context) {
            return (
              "Gas only cost would have been\n£" +
              Number.parseFloat(value).toFixed(2)
            );
          },
        },
        // borderWidth: 2,
        // borderColor: "#68015a",
        // pointRadius: 3,
        // backgroundColor: "#68015a",
      },
      {
        label: ``,
        type: "bar",
        data: chart?.map((x) => x.cTotalCost),
        backgroundColor: "rgba(0,0,0,0.0)",
        datalabels: {
          color: "rgba(0,0,0,0.0)",
          textAlign: "center",
        },
        stack: "Stack 5",
        // borderWidth: 2,
        // borderColor: "#6adced",
        // pointRadius: 3,
        // backgroundColor: "#6adced",
      },
      {
        label: `HP Savings`,
        type: "bar",
        backgroundColor: "#14d214",
        stack: "Stack 5",
        data: chart?.map((x) => 0 - (x.cTotalCost - x.cEFPCost)),
        datalabels: {
          color: "#0b0a0a",
          font: {
            weight: "bold",
            size: 14,
          },
          textAlign: "center",
          formatter: function (value, context) {
            return (
              "Savings against HP Only\n £" +
              Number.parseFloat(value).toFixed(2)
            );
          },
        },
        // borderWidth: 2,
        // borderColor: "#6adced",
        // pointRadius: 3,
        // backgroundColor: "#6adced",
      },
      {
        label: ``,
        type: "bar",
        data: chart?.map((x) => x.cTotalCost),
        backgroundColor: "rgba(0,0,0,0.0)",
        datalabels: {
          color: "rgba(0,0,0,0.0)",
          textAlign: "center",
        },
        stack: "Stack 4",
        // borderWidth: 2,
        // borderColor: "#6adced",
        // pointRadius: 3,
        // backgroundColor: "#6adced",
      },
      {
        label: `Gas Savings`,
        type: "bar",
        backgroundColor: "#14d214",
        stack: "Stack 4",
        data: chart?.map((x) => 0 - x.cSaving),
        datalabels: {
          color: "#0b0a0a",
          font: {
            weight: "bold",
            size: 14,
          },
          textAlign: "center",
          formatter: function (value, context) {
            return (
              "Savings against Gas Only\n£" +
              Number.parseFloat(value).toFixed(2)
            );
          },
        },
        // borderWidth: 2,
        // borderColor: "#6adced",
        // pointRadius: 3,
        // backgroundColor: "#6adced",
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    tooltips: { enabled: false },
    events: [],
    interaction: {
      mode: "index",
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: false,
        text: "Costs Compared",
      },
    },
    scales: {
      x: {
        type: "time",
        stacked: true,
        display: false,
        time: {
          unit: "hour",
          displayFormats: {
            hour: "dd MMM D HH:mm",
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        stacked: true,
        ticks: {
          callback: function (value, context) {
            return "£" + Number.parseFloat(value).toFixed(2);
          },
        },
        position: "left",
        // stacked: true,
        title: {
          display: false,
          text: "£",
          minRotation: 90,
        },
      },
    },
  };

  return (
    <>
      <div>
        <Bar height={400} data={data} options={options} />
      </div>
      <div id="block_container">
        <div className="calendarWrap">
          <label class="CboxLab">
            {"Select Dates "}
            <input
              value={`${format(range[0].startDate, "MM/dd/yyyy")}-${format(
                range[0].endDate,
                "MM/dd/yyyy"
              )}`}
              readOnly
              className="inputBox"
              onClick={() => setOpen((open) => !open)}
            />
            <div ref={refOne}>
              {open && (
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                  className="calendarElement"
                />
              )}
            </div>
          </label>
        </div>
        <div>
          <label class="CboxLab">
            {"Device Id "}
            <select value={val} onChange={handleChange}>
              <option value="P100001">Office</option>
              <option value="P100002">Home 1</option>
              <option value="P100003">Home 2</option>
            </select>
          </label>
        </div>
        <div>
          <button className="button-1" type="button" onClick={fetchCommands}>
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default Commands;
