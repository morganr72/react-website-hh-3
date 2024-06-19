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

function Picker() {
  const [state, setState] = React.useState({
    temp: [18, 22],
    day: 1,
    times: [0, 20],
  });

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
    "https://w2s4kg8ggk.execute-api.us-east-1.amazonaws.com/default/InputProfileAPI?device=" +
    state.user +
    "&timestart=" +
    state.times[0] +
    "&timeend=" +
    state.times[1] +
    "&templ=" +
    state.temp[0] +
    "&temph=" +
    state.temp[1] +
    "&day=" +
    state.day;
  var apiKey = "w6wmyIgvla15dJq7jUbZI91YzsZisEIE6uWH8mS0";

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
    { field: "maxtemp", headerName: "Max Temp", width: 180 },
  ];
  var rows = tbldata;

  // var trows = [
  //   {
  //     id: "001",
  //     Day: 1,
  //     starttime: "00:00",
  //     endtime: "08:00",
  //     mintemp: 17,
  //     maxtemp: 20,
  //   },
  // ];
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
    console.log("stemph", state.temp[0]);
    console.log("stempl", state.temp[1]);
    const tableworkdat = {
      id: counter,
      Day: displayday,
      starttime: state.times[0] + ":00",
      endtime: state.times[1] + ":00",
      mintemp: state.temp[0],
      maxtemp: state.temp[1],
    };
    tbldata = [...tbldata, tableworkdat];
    // tblcounter.push(counter);
    // tblstarttime.push(state.times[0]);
    // tblendtime.push(state.times[1]);
    // tblmaxtemp.push(state.temp[1]);
    // tblmintemp.push(state.temp[0]);
    // tblwkd.push(state.day);
    // console.log("start times", tblstarttime);
    // console.log("end times", tblendtime);
    // console.log("max temps", tblmaxtemp);
    // console.log("min temps", tblmintemp);
    // console.log("day", tblwkd);
    console.log("Data", tbldata);

    // const trows = [rows[0]];
    // const trows = tbldata.map((trows) => ({
    //   Day: trows.Day,
    //   starttime: trows.starttime,
    //   endtime: trows.endtime,
    //   mintemp: trows.mintemp,
    //   maxtemp: trows.maxtemp,
    // }));
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
      {/* <div>
        <label class="CboxLab">
          {"UserID "}
          <select value={val} onChange={handleDevChange}>
            <option value="P100001">Office</option>
            <option value="P100002">Home 1</option>
            <option value="P100003">Home 2</option>
          </select>
        </label>
      </div> */}
      <ThemeProvider theme={inptheme}>
        <Container>
          <Grid container spacing={5} alignItems="center">
            {/* <Grid item x={2}>
              <Button>{value}</Button>
            </Grid> */}
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
                  <option value="P100004">Office</option>
                  <option value="P100005">Farm</option>
                </select>
              </label>
            </Grid>
            <Grid
              item
              xs={12}
              sm={10}
              md={7}
              lg={7}
              xl={7}
              // container
              direction="row"
              alignItems="flex-end"
              justify="center"
              justifyContent="center"
            >
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
              alignItems="flex-end"
              justify="center"
            >
              <Slider
                defaultValue={[18, 21]}
                value={state.temp}
                name="temp"
                valueLabelDisplay="auto"
                onChange={handleChange}
                step={0.5}
                size="large"
                marks={pmarks}
                min={10}
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


      </ThemeProvider>
    </>
  );
}
export default Picker;
