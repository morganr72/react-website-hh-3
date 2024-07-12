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
    "https://5784bf0vc4.execute-api.us-east-1.amazonaws.com/default/SimulationDataAPI?premiseid=" +
    val +
    "&fromdate=" +
    fmDate +
    "&todate=" +
    toDate;
  console.log(baseUrl);
  var apiKey = "S77kRUGEvb1rS2JABzzzf81Dh7ltsiPA675qO7zR";

  const [chart, setChart] = useState([]);

  const fetchCommands = function () {
    fetch(`${baseUrl}`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
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

  console.log("Dates", chart?.map((x) => x.DateTime))
  useEffect(() => fetchCommands(), []);


  var data = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [

      {
        label: `Total Gas Only Cost`,
        type: "line",
        data: chart?.map((x) => x.TotalGasOnlyCost),
        pointRadius: 3,
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y",
      },
      {
        label: `Total Flat Elec Cost`,
        type: "line",
        data: chart?.map((x) => x.TotalFlatElecCost),
        pointRadius: 3,
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y",
      },
      {
        label: `Total Actual Cost`,
        type: "line",
        data: chart?.map((x) => x.TotalActCost),
        pointRadius: 3,
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y",
      },
      {
        label: `Total Carbon Intensity Cost`,
        type: "line",
        data: chart?.map((x) => x.TotalCarbCost),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
    ],
  };

  var dataa = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `Total Gas Only CO2`,
        type: "line",
        data: chart?.map((x) => x.TotalGasOnlyCarb),
        pointRadius: 3,
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y1",
      },
      {
        label: `Total Flat Elec CO2`,
        type: "line",
        data: chart?.map((x) => x.TotalFlatElecCarb),
        pointRadius: 3,
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
      {
        label: `Total Actual CO2`,
        type: "line",
        data: chart?.map((x) => x.TotalActCarb),
        pointRadius: 3,
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y1",
      },
      {
        label: `Total Carbon Intensity CO2`,
        type: "line",
        data: chart?.map((x) => x.TotalCarbCarb),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y1",
      },
    ],
  };

  var data1 = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `HP Water`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.FlatHPW),
        barThickness: "flex",
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y1",
      },
      {
        label: `HP Heat`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.FlatHPH),
        barThickness: "flex",
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y1",
      },
      {
        label: `Gas Water`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.FlatGasW),
        barThickness: "flex",
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
      {
        label: `Gas Heat`,
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        data: chart?.map((x) => x.FlatGasH),
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y1",
      },
      {
        label: `Room Temp`,
        type: "line",
        data: chart?.map((x) => x.FlatRoom),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
      {
        label: `Water Temp`,
        type: "line",
        data: chart?.map((x) => x.FlatWater),
        pointRadius: 3,
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y",
      },
      {
        label: `Desired Temp Low`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.FlatDTL),
        pointRadius: 1,
        fill: "+1",
        borderColor: "#f6ca83",
        backgroundColor: "#f6ca83",
        yAxisID: "y",
      },

      {
        label: `Desired Temp High`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.FlatDTH),
        pointRadius: 1,
        fill: false,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y",
      },
    ],
  };

  var data2 = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `HP Water`,
        data: chart?.map((x) => x.GasHPW),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y1",
      },
      {
        label: `HP Heat`,
        data: chart?.map((x) => x.GasHPH),
        borderColor: "#a1ac02",
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        backgroundColor: "#a1ac02",
        yAxisID: "y1",
      },
      {
        label: `Gas Water`,
        data: chart?.map((x) => x.GasGasW),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
      {
        label: `Gas Heat`,
        data: chart?.map((x) => x.GasGasH),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y1",
      },
      {
        label: `Room Temp`,
        type: "line",
        data: chart?.map((x) => x.GasRoom),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
      {
        label: `Water Temp`,
        type: "line",
        data: chart?.map((x) => x.GasWater),
        pointRadius: 3,
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y",
      },
      {
        label: `Desired Temp Low`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.GasDTL),
        pointRadius: 1,
        fill: "+1",
        borderColor: "#f6ca83",
        backgroundColor: "#f6ca83",
        yAxisID: "y",
      },

      {
        label: `Desired Temp High`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.GasDTH),
        pointRadius: 1,
        fill: false,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y",
      },
      
      
    ],
  };

  var data3 = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `HP Water`,
        data: chart?.map((x) => x.ActHPW),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y1",
      },
      {
        label: `HP Heat`,
        data: chart?.map((x) => x.ActHPH),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y1",
      },

      {
        label: `Gas Water`,
        data: chart?.map((x) => x.ActGasW),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
     
      {
        label: `Gas Heat`,
        data: chart?.map((x) => x.ActGasH),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y1",
      },
      {
        label: `Room Temp`,
        type: "line",
        data: chart?.map((x) => x.ActRoom),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
      {
        label: `Water Temp`,
        type: "line",
        data: chart?.map((x) => x.ActWater),
        pointRadius: 3,
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y",
      },
      {
        label: `Desired Temp Low`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.ActDTL),
        pointRadius: 1,
        fill: "+1",
        borderColor: "#f6ca83",
        backgroundColor: "#f6ca83",
        yAxisID: "y",
      },

      {
        label: `Desired Temp High`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.ActDTH),
        pointRadius: 1,
        fill: false,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
        yAxisID: "y",
      },
    ],
  };

  var data4 = {
    labels: chart?.map((x) => x.DateTime),
    datasets: [
      {
        label: `HP Water`,
        data: chart?.map((x) => x.CarbHPW),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y1",
      },
      {
        label: `HP Heat`,
        data: chart?.map((x) => x.CarbHPH),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#a1ac02",
        backgroundColor: "#a1ac02",
        yAxisID: "y1",
      },

      {
        label: `Gas Water`,
        data: chart?.map((x) => x.CarbGasW),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#f49f16",
        backgroundColor: "#f49f16",
        yAxisID: "y1",
      },
     
      {
        label: `Gas Heat`,
        data: chart?.map((x) => x.CarbGasH),
        type: "line",
        showLine: false,
        pointRadius: 9,
        pointStyle: 'triangle',
        barThickness: "flex",
        borderColor: "#68015a",
        backgroundColor: "#68015a",
        yAxisID: "y1",
      },
      {
        label: `Room Temp`,
        type: "line",
        data: chart?.map((x) => x.CarbRoom),
        pointRadius: 3,
        borderColor: "#ce1b1e",
        backgroundColor: "#ce1b1e",
        yAxisID: "y",
      },
      {
        label: `Water Temp`,
        type: "line",
        data: chart?.map((x) => x.CarbWater),
        pointRadius: 3,
        borderColor: "#04570f",
        backgroundColor: "#04570f",
        yAxisID: "y",
      },
      {
        label: `Desired Temp Low`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.CarbDTL),
        pointRadius: 1,
        fill: "+1",
        borderColor: "#f6ca83",
        backgroundColor: "#f6ca83",
        yAxisID: "y",
      },

      {
        label: `Desired Temp High`,
        pointHitRadius: 1,
        type: "line",
        data: chart?.map((x) => x.CarbDTH),
        pointRadius: 1,
        fill: false,
        borderColor: "#14d214",
        backgroundColor: "#14d214",
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
    
    
    },
  };
  var optionsa = {
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
        text: "Carbon Intensity",
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
      y1: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          count:6
        },
        title: {
          display: true,
          text: "gCO2/kWh",
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
        text: "Fixed Price Elec",
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
          text: "Degrees",
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
          text: "KwH",
        },
      },
      
    },
  };

  
  var options2 = {
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
        text: "Gas Only",
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
          text: "Degrees",
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
          text: "KwH",
        },
      },
      
    },
  };

  
  var options3 = {
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
        text: "Actual",
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
          text: "Degrees",
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
          text: "KwH",
        },
      },
      
    },
  };

  var options4 = {
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
        text: "Carbon Intensity",
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
          text: "Degrees",
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
          text: "KwH",
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
              <option value="P100001">Relay</option>
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
        <Bar height={400} data={dataa} options={optionsa} />
      </div>
      <div>
        <Bar height={400} data={data1} options={options1} />
      </div>
      <div>
        <Bar height={400} data={data2} options={options2} />
      </div>
      <div>
        <Bar height={400} data={data3} options={options3} />
      </div>
      <div>
        <Bar height={400} data={data4} options={options4} />
      </div>

    </>
  );
}

export default AllData;
