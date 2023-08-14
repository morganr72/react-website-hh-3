import React, { useState, useEffect, useId, useRef } from "react";
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
import { Line } from "react-chartjs-2";

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
  Colors
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
    "https://goyh62l73j.execute-api.us-east-1.amazonaws.com/default/MasterTransactionAPI?premid=" +
    val +
    "&userid= " +
    user.name +
    "&fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  console.log(baseUrl);
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
        label: `Gas Cost`,
        type: "line",
        data: chart?.map((x) => x.cGasCost),
        borderWidth: 2,
        borderColor: "#ce1b1e",
        pointRadius: 3,
        backgroundColor: "#ce1b1e",
      },
      {
        label: `HP Cost`,
        type: "line",
        data: chart?.map((x) => x.cHPCost),
        borderWidth: 2,
        borderColor: "#2613cc",
        pointRadius: 3,
        backgroundColor: "#2613cc",
      },
      {
        label: `Total Cost`,
        type: "line",
        data: chart?.map((x) => x.cTotalCost),
        borderWidth: 2,
        borderColor: "#14d214",
        pointRadius: 3,
        backgroundColor: "#14d214",
      },
      {
        label: `HP Gas Equivalent`,
        type: "line",
        data: chart?.map((x) => x.cHPGasEquiv),
        borderWidth: 2,
        borderColor: "#68015a",
        pointRadius: 3,
        backgroundColor: "#68015a",
      },
      {
        label: `Savings`,
        type: "line",
        data: chart?.map((x) => x.cSaving),
        borderWidth: 2,
        borderColor: "#6adced",
        pointRadius: 3,
        backgroundColor: "#6adced",
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
      legend: {
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: true,
        text: "Costs Compared",
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
        // stacked: true,
        title: {
          display: true,
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
