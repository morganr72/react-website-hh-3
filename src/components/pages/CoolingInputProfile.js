import React from "react";
import "../InputProfile.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Button,
  Slider,
  Container,
  Typography,
  FormControlLabel,
  Switch
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth0 } from "@auth0/auth0-react";

// function valuetext(temp) {
//   return `${temp}°C`;
// }
// let tblwkd = [];
// let tblstarttime = [];
// let tblendtime = [];
// let tblmintemp = [];
// let tblmaxtemp = [];
// let tblcounter = [];
let counter = 0;
let displayday = "Weekday";
// var tbldata = [
//   {
//     id: 0,
//     Day: 1,
//     starttime: "00:00",
//     endtime: "08:00",
//     mintemp: 17,
//     maxtemp: 20,
//   },
// ];
var tbldata = [];

let trows = [];

const inptheme = createTheme({
  components: {
    // Name of the component
    MuiSlider: {
      styleOverrides: {
        // Name of the slot
        valueLabel: {
          // Some CSS
          backgroundColor: "#04570f",
        },
      },
    },
  },
});

function CoolingPicker() {
  const [state, setState] = React.useState({
    temp: [18, 20],
    day: 1,
    times: [0, 20],
  });

  const [checked, setChecked] = React.useState(true);
  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log(checked)
  // const dataToUpdate = {
  //   Device: "66E32E1B",
  //   timestart: state.times[0],
  //   timeend: state.times[1],
  //   temp: state.temp,
  //   day: state.day,
  // };
  const [val, setValue] = React.useState("P100004");
  // const handleDevChange = (event) => {
  //   setValue(event.target.value);
  //   console.log("DevValue", val);
  // };

  const jsonString = " ";
  var baseUrl =
    "https://p50hevnmga.execute-api.us-east-1.amazonaws.com/default/CoolingProfileAPI?device=" +
    state.user +
    "&timestart=" +
    state.times[0] +
    "&timeend=" +
    state.times[1] +
    "&templ=" +
    state.temp[0] +
    "&temph=" +
    state.temp[1] +
    "&active=" +
    checked +
    "&day=" +
    state.day;
  var apiKey = "woshHvTxc2a6NiiwEI1j235ignu8ySDj4vtjDJPp";

  function handleChange(evt) {
    const value = evt.target.value;
    console.log("Value", evt.target.value);
    console.log("Name", evt.target.name);

    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  // function handleRange(evt) {
  //   const value = evt.target.value;
  //   console.log("Values", evt.target.value);
  //   console.log("Name", evt.target.name);

  //   setState({
  //     ...state,
  //     [evt.target.name]: value,
  //   });
  // }
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiKey}`,
    },
  };
  const emarks = [
    {
      value: 0,
      label: "00:00",
    },
    {
      value: 3,
      label: "03:00",
    },
    {
      value: 6,
      label: "06:00",
    },
    {
      value: 9,
      label: "09:00",
    },
    {
      value: 12,
      label: "12:00",
    },
    {
      value: 15,
      label: "15:00",
    },
    {
      value: 18,
      label: "18:00",
    },
    {
      value: 21,
      label: "21:00",
    },
    {
      value: 24,
      label: "00:00",
    },
  ];
  const pmarks = [
    {
      value: 16,
      label: "16°",
    },
    {
      value: 18,
      label: "18°",
    },
    {
      value: 20,
      label: "20°",
    },
    {
      value: 22,
      label: "22°",
    },
    {
      value: 24,
      label: "24°",
    },
  ];
  var columns = [
    { field: "Day", headerName: "Day", width: 130 },
    { field: "starttime", headerName: "Start Time", width: 130 },
    { field: "endtime", headerName: "End Time", width: 130 },
    { field: "mintemp", headerName: "Min Temp", width: 130 },
    { field: "maxtemp", headerName: "Max Temp", width: 130 },
    { field: "checked", dataType: Boolean, headerName: "Cooling Active", width: 180}
  ];
  var rows = tbldata;

  console.log("Rows", rows);

  
  const sendData = function () {
    counter++;
    if (state.day === 1) {
      displayday = "Weekday";
    } else {
      displayday = "Weekend";
    }
    console.log("Counter", counter);
    console.log("JSon", jsonString);
    console.log("URL", baseUrl);
    console.log("sStartTimes", state.times[0]);
    console.log("sEndTimes", state.times[1]);
    console.log("sDay", state.day);
    console.log("checked", checked);
    const tableworkdat = {
      id: counter,
      Day: displayday,
      starttime: state.times[0] + ":00",
      endtime: state.times[1] + ":00",
      mintemp: state.temp[0],
      maxtemp: state.temp[1],
      checked: checked,
    };
    tbldata = [...tbldata, tableworkdat];

    console.log("Data", tbldata);

    console.log("Columns", columns);
    console.log("Rows", rows);
    console.log("Trows", trows);
    fetch(baseUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log("Data updated:", updatedData);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    setState({
      ...state,
    });
  };
  return (
    <>
      <div class="godown-60" id="godown"></div>
      <ThemeProvider theme={inptheme}>
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
              alignItems="center"
              justifyContent="center"
            >
              <label class="CboxLab">
                {"UserID "}
                <select name = "user" value={state.user} onChange={handleChange}>
                  {/* <option value="P100004">Office</option> */}
                  <option value="P100002">Home 1</option>
                  <option value="P100003">Simulation</option>
                  <option value="P100004">Relay</option>
                  <option value="P100005">Farm</option>
                </select>
              </label>
            </Grid>
            <Grid
              item
              xs={9}
              sm={7}
              md={5}
              lg={5}
              xl={5}
              // container
              direction="row"
              alignItems="flex-end"
              justify="center"
              justifyContent="center"
            >      
            <Typography id="input-slider" gutterBottom>
            Times
          </Typography>
              <Slider
                defaultValue={[0, 24]}
                valueLabelDisplay="auto"
                value={state.times}
                name="times"
                onChange={handleChange}
                step={1}
                size="large"
                marks={emarks}
                min={0}
                max={24}
                valueLabelFormat={
                  state.times[0] + ":00-" + state.times[1] + ":00"
                }
              />
            </Grid>
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={2}
              xl={2}
              // container
              direction="row"
              alignItems="center"
              justify="center"
            >
          <Typography id="input-slider" gutterBottom>
            Max Temp
          </Typography>
          
              <Slider
                defaultValue={[18,22]}
                value={state.temp}
                name="temp"
                valueLabelDisplay="auto"
                onChange={handleChange}
                step={0.5}
                size="large"
                marks={pmarks}
                min={16}
                max={24}
                // valueLabelFormat={state.temp[0]}
              />
            </Grid>
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={2}
              xl={2}
              // container
              direction="row"
              // alignItems="flex-end"
              justify="center"
            >
              <FormControlLabel control={<Switch
  checked={checked}
  onChange={handleSwitchChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>} label="Cooling Active" />

            </Grid>
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={2}
              xl={2}
              // container
              direction="row"
              // alignItems="flex-end"
              justify="center"
            >
              <FormControl fullWidth>
                <InputLabel>Day</InputLabel>
                <Select
                  name="day"
                  value={state.day}
                  label="Day"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Weekday</MenuItem>
                  <MenuItem value={2}>Weekend</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={2}
              xl={1}
              // container
              justifyContent="center"
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <Button onClick={sendData}>Submit</Button>
            </Grid>
          </Grid>
          {/* <div>
            <input type="text" value={columns} />
          </div> */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} autoHeight="true" />
          </div>
        </Container>

        {/* <div>
          <table>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Min Temp</th>
              <th>Max Temp</th>
            </tr>
            {trows.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.Day}</td>
                  <td>{val.starttime}</td>
                  <td>{val.endtime}</td>
                  <td>{val.mintemp}</td>
                  <td>{val.max.temp}</td>
                </tr>
              );
            })}
          </table>
        </div> */}
      </ThemeProvider>
    </>
  );
}
export default CoolingPicker;
