import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "chartjs-adapter-moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth0 } from "@auth0/auth0-react";
import 'chartjs-adapter-luxon' ;
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

function AllData() {
  const { user } = useAuth0();

  const [val, setValue] = React.useState("P100003");
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
    "https://atgyjsolhf.execute-api.us-east-1.amazonaws.com/default/BatterySimAPI?premid=P100003"+
    "&fmdate=" +
    fmDate +
    "&todate=" +
    toDate;
  console.log(baseUrl);


  const [chart, setChart] = useState([]);

  const fetchCommands = function () {
    fetch(`${baseUrl}`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",

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

  console.log("Dates", chart?.map((x) => x.DateTimeIX))
  useEffect(() => fetchCommands(), []);


  var data = {
    labels: chart?.map((x) => x.DateTimeIX),
    datasets: [

      {
        label: `AgilePrice`,
        type: "line",
        data: chart?.map((x) => x.agileprice),
        pointRadius: 3,
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y",
      },
      {
        label: `Battery Charge`,
        type: "line",
        data: chart?.map((x) => x.batterycharge),
        pointRadius: 3,
        borderColor: "#f49f16",
        // spanGaps: false,
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
      // {
      //   label: `Battery Charge Cost`,
      //   type: "line",
      //   data: chart?.map((x) => x.BatteryChargeCost),
      //   pointRadius: 3,
      //   borderColor: "#a1ac02",
      //   backgroundColor: "#a1ac02",
      //   yAxisID: "y",
      // },
      {
        label: `Battery Running`,
        type: "line",
        data: chart?.map((x) => x.BatteryRunning),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y1",
      },
      {
        label: `Battery Usage`,
        type: "line",
        data: chart?.map((x) => x.BatteryUsage),
        pointRadius: 3,
        borderColor: "#2613cc",
        backgroundColor: "#2613cc",
        yAxisID: "y1",
      },
      {
        label: `Elec Demand`,
        type: "line",
        data: chart?.map((x) => x.ElecDemand),
        pointRadius: 3,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y1",
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
        text: "Costs",
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
        adapters: {
          date: {
            zone: 'GB',
          }
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
          text: "Pence",
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
          text: "Kwh",
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
        {/* <div>
          <label className="CboxLab">
            {"Device Id "}
            <select value={val} onChange={handleChange}>
              <option value="P100004">Office</option>
              <option value="P100005">Farm</option>
              <option value="P100003">Sim</option>
              <option value="P100001">Relay</option>
            </select>
          </label>
        </div> */}
        <div>
          <button className="CboxLab" type="button" onClick={fetchCommands}>
            Refresh
          </button>
        </div>
      </div>
      <div>
        <Bar height={400} data={data} options={options} />
      </div>


    </>
  );
}

export default AllData;
