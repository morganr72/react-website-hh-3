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
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Legend,
  Colors
);

function ElecData() {
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
    "https://i5kbcm6m4j.execute-api.us-east-1.amazonaws.com/default/ElecIndData?fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  var apiKey = "AxKV7WxL523i9WL0EQLRZ3d7tjHeJAjD6eeqZyAN";

  var baseUrl1 =
    "https://goyh62l73j.execute-api.us-east-1.amazonaws.com/default/MasterTransactionAPI?premid=P100001" +
    "&userid= rmorganml@gmail.com" +
    "&fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  var apiKey1 = "vbeLPuegOeCdlx7bouy95nsege1farX5TTbrvL60";

  const [chart, setChart] = useState([]);
  const [chart1, setChart1] = useState([]);

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
    fetch(`${baseUrl1}`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey1}`,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      },
    })
      .then((response) => {
        response.json().then((json) => {
          // console.log(json);
          setChart1(json.content);
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
      //   {
      //     label: `Demand`,
      //     data: chart?.map((x) => x.DEMAND),
      //     borderWidth: 2,
      //     borderColor: "#ce1b1e",
      //     pointRadius: 3,
      //     backgroundColor: "#ce1b1e",
      //     yAxisID: "y",
      //   },
      {
        label: `Gas`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.CCGT, 10)),
        backgroundColor: "#33cde5",
        stack: "Stack 1",
      },
      {
        label: `Offshore Wind`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.OFFSHORE_WIND, 10)),
        backgroundColor: "#ce1b1e",
        stack: "Stack 1",
      },
      {
        label: `Onshore Wind`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.ONSHORE_WIND, 10)),
        backgroundColor: "#04570f",
        stack: "Stack 1",
      },
      {
        label: `Solar`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.SOLAR, 10)),
        backgroundColor: "#e0ef08",
        stack: "Stack 1",
      },
      {
        label: `Nuclear`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.NUCLEAR, 10)),
        backgroundColor: "#a1ac02",
        stack: "Stack 1",
      },
      {
        label: `Coal`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.COAL, 10)),
        backgroundColor: "#68015a",
        stack: "Stack 1",
      },
      {
        label: `Biomass`,
        type: "bar",
        data: chart?.map((x) => parseInt(x.BIOMASS, 10)),
        backgroundColor: "#f6ca83",
        stack: "Stack 1",
      },

      {
        label: `Other`,
        type: "bar",
        data: chart?.map(
          (x) =>
            parseInt(x.PS, 10) + parseInt(x.OTHER, 10) + parseInt(x.OIL, 10)
        ),
        backgroundColor: "#b3b0b0",
        stack: "Stack 1",
      },
      {
        label: `Net Imports/Exports`,
        type: "bar",
        data: chart?.map(
          (x) =>
            parseInt(x.INTFR, 10) +
            parseInt(x.INTIRL, 10) +
            parseInt(x.INTNED, 10) +
            parseInt(x.INTEW, 10) +
            parseInt(x.INTNEM, 10) +
            parseInt(x.INTELEC, 10) +
            parseInt(x.INTIFA2, 10) +
            parseInt(x.INTNSL, 10)
        ),
        backgroundColor: "#0b0a0a",
        stack: "Stack 1",
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
        text: "Elec Industry Data",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          min: fmDate,
          max: toDate,
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
          text: "MWh",
        },
      },
    },
  };

  var data1 = {
    labels: chart1?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Elec Price`,
        type: "bar",
        data: chart1?.map((x) => x.ElecUnitPrice),
        borderWidth: 2,
        borderColor: "#ce1b1e",
        pointRadius: 3,
        backgroundColor: "#ce1b1e",
        // yAxisID: "y",
      },
    ],
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
        text: "Elec Industry Data",
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
        ticks: {
          padding: 18,
        },
        type: "linear",
        display: true,
        position: "left",

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
          <button className="CboxLab" type="button" onClick={fetchTemps}>
            Refresh
          </button>
        </div>
      </div>
      <div>
        <Line height={400} data={data} options={options} />
      </div>
      <div>
        <Line height={400} data={data1} options={options1} />
      </div>
      {/* <body>
        <canvas id="chartJSContainer" width="600" height="400"></canvas>
        <button id="myBtn">Hide dataset</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.js"></script>
      </body> */}
    </>
  );
}

export default ElecData;
