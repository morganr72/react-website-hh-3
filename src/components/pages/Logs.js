import React, { useState, useEffect, useRef } from "react";
import "../InputProfile.css";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Button,
  Slider,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth0 } from "@auth0/auth0-react";

// var tbldata = [];
// // let table = new Array(3);

// let trows = [];

// const inptheme = createTheme({
//   components: {
//     // Name of the component
//     MuiSlider: {
//       styleOverrides: {
//         // Name of the slot
//         valueLabel: {
//           // Some CSS
//           backgroundColor: "#04570f",
//         },
//       },
//     },
//   },
// });

function Logs() {
  console.log("Hey");
  const { user } = useAuth0();

  const [val, setValue] = React.useState("P100004");
  const handleDevChange = (event) => {
    setValue(event.target.value);
    console.log("DevValue", val);
  };

  const jsonString = " ";
  var baseUrl =
    "https://z3oydz3xfl.execute-api.us-east-1.amazonaws.com/default/LogAPI?device=" +
    val;
  var apiKey = "jts2Z4LnH87e37GkWLyKnEZE6jgtNB59sMHbDbN2";
  console.log(baseUrl);

  const [table, setTable] = useState([]);
  // function handleChange(evt) {
  //   const value = evt.target.value;
  //   console.log("Value", evt.target.value);
  //   console.log("Name", evt.target.name);

  //   //   setState({
  //   //     ...state,
  //   //     [evt.target.name]: value,
  //   //   });
  //   // }
  // }

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": `${apiKey}`,
  //   },
  // };

  // var columns = [
  //   { field: "TimeStamp", headerName: "TimeStamp", width: 300 },
  //   { field: "Device", headerName: "Device Time", width: 300 },
  //   { field: "Message", headerName: "Message", width: 900 },
  // ];
  // // table.timestamp = "2023-01-01 00:00:00";
  const fetchLogs = function () {
    // table.timestamp = "";
    console.log("Attempting API");
    console.log("${baseUrl}");
    console.log(apiKey);
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
        console.log("Success");
        console.log(response);
        response.json().then((json) => {
          console.log(json.content);
          setTable(json.content);
          console.log("Table", table);
          let devicemap = table?.map((x) => x.Device);
          console.log("TableDev", devicemap);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TimeStamp: table.timestamp,
  // Device: table.Device,
  // Message: table.Messgae,
  // const tableworkdat = {
  //   id: table.timestamp,
  //   TimeStamp: table.timestamp,
  //   Device: table.Device,
  //   Message: table.Messgae,
  // };
  // console.log("tblw", tableworkdat);
  // tbldata = [...tbldata, tableworkdat];
  // var rows = tbldata;

  // console.log("Data", tbldata);

  // console.log("Columns", columns);
  // console.log("Rows", rows);
  console.log("Final Table", table);
  return (
    <>
      <div class="godown-60" id="godown"></div>

      <Container>
        <Grid container spacing={5} alignItems="center">
          <Grid
            item
            xs={12}
            sm={10}
            md={10}
            lg={10}
            xl={10}
            container
            direction="row"
            alignItems="left"
            justifyContent="left"
          >
            <div>
              <button className="CboxLab" type="button" onClick={fetchLogs}>
                Refresh
              </button>
            </div>
            <label class="CboxLab">
              {"UserID "}
              <select value={val} onChange={handleDevChange}>
                <option value="P100001">Office</option>
                <option value="P100002">Home 1</option>
                <option value="P100003">Home 2</option>
                <option value="P100004">Relay</option>
              </select>
            </label>
          </Grid>
        </Grid>
        {/* <div>
        <input type="text" value={columns} />
      </div> */}
        <div style={{ height: 400, width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>timestamp</th>
                <th>Message</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {table.map((x) => {
                return (
                  <tr key={x.key}>
                    <td>{x.timestamp}</td>
                    <td>{x.Message}</td>
                    <td>{x.Device}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
export default Logs;
