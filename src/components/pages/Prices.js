import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Charts.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Legend,
  Colors
);

function Prices() {
  const [val, setValue] = React.useState("48A2A459");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // date state
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

  const fetchTemps = function () {
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
          // console.log(json);
          setChart(json.content);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log("chart", chart);

  var data = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Price Per kWh`,
        data: chart?.map((x) => x.ElecUnitPrice),
        borderWidth: 1,
        // borderColor: "#0033cc",
        // backgroundColor: "#0033cc",
        yAxisID: "y",
      },
      {
        label: `COP Adjusted Price`,
        data: chart?.map((x) => x.copprice),
        borderWidth: 1,
        // borderColor: "#cc00000",
        // backgroundColor: "#cc00000",
        yAxisID: "y",
      },
      {
        label: `Gas Price`,
        data: chart?.map((x) => x.GasUnitPrice),
        borderWidth: 1,
        // borderColor: "#cc00000",
        // backgroundColor: "#cc00000",
        yAxisID: "y",
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
        text: "Prices",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Pence",
        },
      },
    },
  };

  return (
    <>
      <div>
        <Line height={400} data={data} options={options} />
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
            {"UserID "}
            <select value={val} onChange={handleChange}>
              <option value="988A301F">988A301F</option>
              <option value="66E32E1B">66E32E1B</option>
              <option value="48A2A459">48A2A459</option>
            </select>
          </label>
        </div>
        <div>
          <button className="button-1" type="button" onClick={fetchTemps}>
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default Prices;
