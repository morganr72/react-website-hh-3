import React, { useState, useEffect, useId, useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Legend,
  BarController,
  BarElement,
  Tooltip,
  Colors,
  LineElement,
  PointElement,
  LinearScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  Colors
);

function Commands() {
  const [val, setValue] = React.useState("48A2A459");
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
  console.log(range);
  var fmDate = format(range[0].startDate, "MM-dd-yyyy");
  var toDate = format(range[0].endDate, "MM-dd-yyyy");
  console.log(fmDate);
  console.log(toDate);
  var baseUrl =
    "https://goyh62l73j.execute-api.us-east-1.amazonaws.com/default/MasterTransactionAPI?controller=" +
    val +
    "&fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  var apiKey = "vbeLPuegOeCdlx7bouy95nsege1farX5TTbrvL60";
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
        label: `Gas Heating`,
        type: "bar",
        data: chart?.map((x) => x.GasHeat),
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
      {
        label: `Gas Water`,
        type: "bar",
        data: chart?.map((x) => x.GasWater),
        borderColor: "#2613cc",
        backgroundColor: "#2613cc",
        yAxisID: "y",
      },
      {
        label: `HP Heating`,
        type: "bar",
        data: chart?.map((x) => x.HPHeat),
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y",
      },
      {
        label: `HP Water`,
        type: "bar",
        data: chart?.map((x) => x.HPWater),
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y",
      },
      {
        label: `Water Demand`,
        type: "bar",
        data: chart?.map((x) => x.WaterDemand),
        borderColor: "#6adced",
        backgroundColor: "#6adced",
        yAxisID: "y",
      },
      {
        label: `Desired Temp`,
        type: "line",
        data: chart?.map((x) => x.TempDemand),
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
      {
        label: `Expected Temp`,
        type: "line",
        data: chart?.map((x) => x.CalcInTemp),
        borderColor: "#0b0a0a",
        backgroundColor: "#0b0a0a",
        yAxisID: "y1",
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
      x: {},
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "kWh",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Degress C",
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
              <option value="48A2A459">48A2A459</option>
              <option value="66E32E1B">66E32E1B</option>
              <option value="988A301F">988A301F</option>
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
