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
  function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("Logs");
    console.log("Table", table)
    if (!table) 
      {console.log("Null")}
    else {
      console.log("Table Not Null")
      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc";
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[0];
          y = rows[i + 1].getElementsByTagName("TD")[0];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }}
  const jsonString = " ";
  var baseUrl =
    "https://z3oydz3xfl.execute-api.us-east-1.amazonaws.com/default/LogAPI?device=" +
    val;
  var apiKey = "jts2Z4LnH87e37GkWLyKnEZE6jgtNB59sMHbDbN2";
  console.log(baseUrl);

  const [table, setTable] = useState([]);
 
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
            <div>
              <button className="CboxLab" type="button" onClick={sortTable}>
                Sort
              </button>
            </div>
            <label class="CboxLab">
              {"UserID "}
              <select value={val} onChange={handleDevChange}>
                <option value="P100001">Office</option>
                <option value="P100002">Home 1</option>
                <option value="P100003">Sim</option>
                <option value="P100005">Farm</option>
              </select>
            </label>
          </Grid>
        </Grid> 
        {/* <div>
        <input type="text" value={columns} />
      </div> */}
        <div style={{ height: 400, width: "100%" }}>
          <table id="Logs">
            <thead>
              <tr>
                <th onClick={sortTable(0)}>timestamp</th>
                <th onClick={sortTable(1)}>Message </th>
                <th onClick={sortTable(2)}>Device</th>
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
