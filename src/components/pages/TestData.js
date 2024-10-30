import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "chartjs-adapter-moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth0 } from "@auth0/auth0-react";
import "../Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
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

import { Bar } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LineElement,
  PointElement,
  Filler,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  Legend,
  Colors
);

function TestData() {
  const { user } = useAuth0();

  const [val, setValue] = React.useState("P100004");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), 0),
      endDate: new Date(),
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

  console.log("user id:", user.name);
  var fmDate = format(range[0].startDate, "MM-dd-yyyy");
  var toDate = format(range[0].endDate, "MM-dd-yyyy");
  //   console.log(fmDate);
  //   console.log(toDate);
  var baseUrl =
    "https://dqn8wn69ml.execute-api.us-east-1.amazonaws.com/default/TestMasterTransactionAPI?premid=" +
    val +
    "&userid= " +
    user.name +
    "&fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  console.log(baseUrl);
  var apiKey = "fWw8WmDpLI6Klq3v0wixMaXT0sGzzRNFi0qKZ5Sd";

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
  useEffect(() => fetchCommands(), []);
  // const legi = (value) => x.CmdOverride = 'L' ? value : undefined;
  // const boostWater = (value) => x.CmdOverride = 'W' ? value : undefined;
  // const boostHeat = (value) => x.CmdOverride = 'H' ? value : undefined;

  var data = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [


      {
        label: `External Temp`,
        type: "line",
        data: chart?.map((x) => x.ForecastTemp),
        pointRadius: 3,
        borderColor: "#2613cc",
        backgroundColor: "#2613cc",
        yAxisID: "y1",
      },
      {
        label: `Expected Temp`,
        type: "line",
        data: chart?.map((x) => x.CalcInTemp),
        pointRadius: 3,
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y1",
      },
      // {
      //   label: `PredStart Temp`,
      //   data: chart?.map((x) => x.PredTempStart),
      //   type: "line",
      //   borderWidth: 2,
      //   pointRadius: 3,
      //   spanGaps: true,
      //   borderColor: "#ce1b1e",
      //   backgroundColor: "#ce1b1e",
      //   yAxisID: "y1",
      // },

      // {
      //   label: `UnmetTempDemand`,
      //   type: "line",
      //   data: chart?.map((x) => x.UnmetTempDemand),
      //   pointRadius: 3,
      //   borderColor: "#b3b0b0",
      //   backgroundColor: "#b3b0b0",
      //   yAxisID: "y",
      // },
      {
        label: `Desired Temp Low`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.DesTempLow),
        pointRadius: 1,
        fill: "+1",
        borderColor: "#f6ca83",
        backgroundColor: "#f6ca83",
        yAxisID: "y1",
      },

      {
        label: `Desired Temp High`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.DesTempHigh),
        pointRadius: 1,
        fill: false,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y1",
      },
      {
        label: `Water Demand`,
        type: "bar",
        data: chart?.map((x) => x.WaterDemand),
        borderColor: "#6adced",
        barThickness: "flex",
        backgroundColor: "#6adced",
        yAxisID: "y",
      },



    ],
  };

  var data1 = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Elec Price`,
        type: "line",
        data: chart?.map((x) => x.ElecUnitPrice),
        borderWidth: 2,
        borderColor: "#ce1b1e",
        pointRadius: 3,
        backgroundColor: "#ce1b1e",
        yAxisID: "y1",
      },
      {
        label: `COP Adjusted Price`,
        type: "line",
        data: chart?.map((x) => x.copprice),
        borderWidth: 2,
        pointRadius: 3,
        borderColor: "#2613cc",
        backgroundColor: "#2613cc",
        yAxisID: "y1",
      },
      {
        label: `Gas Price`,
        data: chart?.map((x) => x.GasEffUnitPrice),
        type: "line",
        borderWidth: 2,
        pointRadius: 1,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y1",
      },
      {
        label: `Elec Consumption`,
        data: chart?.map((x) => x.ActElecCons),
        type: "line",
        borderWidth: 2,
        pointRadius: 1,
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y",
      },
      {
        label: `Gas Heating`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.GasHeat),
        barThickness: "flex",
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y",
      },
      {
        label: `Gas Water`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.GasWater),
        barThickness: "flex",
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y",
      },
      {
        label: `HP Heating High`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.COPHPHeatH),
        barThickness: "flex",
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y",
      },
      {
        label: `HP Heating Low`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.COPHPHeatL),
        barThickness: "flex",
        borderColor: "#79aef7",
        backgroundColor: "#79aef7",
        yAxisID: "y",
      },
      {
        label: `HP Water`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.COPHPWater),
        barThickness: "flex",
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y",
      },
      {
        label: `Legionella`,
        type: "bar",
        data: chart?.map((x) => x.Legionella),
        barThickness: "flex",
        borderColor: "#b3b0b0",
        backgroundColor: "#b3b0b0",
        yAxisID: "y",
        stack: 'bar-stacked' 
      },
      {
        label: `Boost Heat`,
        type: "bar",
        data: chart?.map((x) => x.BoostHeat),
        barThickness: "flex",
        borderColor: "#6adced",
        backgroundColor: "#6adced",
        yAxisID: "y",
        stack: 'bar-stacked' 
      },
      {
        label: `Boost Water`,
        type: "bar",
        data: chart?.map((x) => x.BoostWater),
        barThickness: "flex",
        borderColor: "#f6ca83",
        backgroundColor: "#f6ca83",
        yAxisID: "y",
        stack: 'bar-stacked' 
      },

    ],
  };

  var options = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
    },
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: true,
        text: "Temperatures and Water",
      },
    },
    scales: {
      x: {
        type: "time",
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
        position: "left",
        ticks: {
          count:6
        },
        title: {
          display: true,
          text: "KWh",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          count:6
        },
        title: {
          display: true,
          text: "Degress C",
        },
      },
      
    },
  };

  var options1 = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
    },
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: true,
        text: "Prices and Commands",
      },
    },
    scales: {
      x: {
        type: "time",
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
        position: "left",
        ticks: {
          count:6
        },

        title: {
          display: true,
          text: "kWh",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          count:6
        },

        title: {
          display: true,
          text: "pence",
        },
      },
    },
  };

  return (
    <>
      <div id="block_container">
        {/* <label>{user.name}</label> */}
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
          <label className="CboxLab">
            {"Device Id "}
            <select value={val} onChange={handleChange}>
              <option value="P100004">Office</option>
              <option value="P100005">Farm</option>
              <option value="P100003">Sim</option>

            </select>
          </label>
        </div>
        <div>
          <button className="CboxLab" type="button" onClick={fetchCommands}>
            Refresh
          </button>
        </div>
      </div>
      <div>
        <Bar height={400} data={data} options={options} />
      </div>
      <div>
        <Bar height={400} data={data1} options={options1} />
      </div>
    </>
  );
}

export default TestData;
