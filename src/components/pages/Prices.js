import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { user } = useAuth0();
  const [val, setValue] = React.useState("P100001");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // date state
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -2),
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

  console.log(range);
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
  useEffect(() => fetchTemps(), []);
  // console.log("chart", chart);

  var data = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Elec Price`,
        data: chart?.map((x) => x.ElecUnitPrice),
        borderWidth: 2,
        borderColor: "#ce1b1e",
        pointRadius: 3,
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
      {
        label: `COP Adjusted Price`,
        data: chart?.map((x) => x.copprice),
        borderWidth: 2,
        pointRadius: 3,
        borderColor: "#2613cc",
        backgroundColor: "#2613cc",
        yAxisID: "y",
      },
      {
        label: `Gas Price`,
        data: chart?.map((x) => x.GasEffUnitPrice),
        borderWidth: 2,
        pointRadius: 3,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y",
      },
      {
        label: `Elec Fixed Price`,
        data: chart?.map((x) => x.ElecFixedPrice),
        borderWidth: 2,
        pointRadius: 3,
        borderColor: "#0b0a0a",
        backgroundColor: "#0b0a0a",
        yAxisID: "y",
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
        text: "Prices",
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
          <label className="CboxLab">
            {"UserID "}
            <select value={val} onChange={handleChange}>
              <option value="P100001">Office</option>
              <option value="P100002">Home 1</option>
              <option value="P100003">Home 2</option>
            </select>
          </label>
        </div>
        <div>
          <button className="CboxLab" type="button" onClick={fetchTemps}>
            Refresh
          </button>
        </div>
      </div>
      <body>
        <canvas id="chartJSContainer" width="600" height="400"></canvas>
        <button id="myBtn">Hide dataset</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.js"></script>
      </body>
    </>
  );
}

export default Prices;
