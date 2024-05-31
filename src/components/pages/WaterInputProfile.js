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
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth0 } from "@auth0/auth0-react";


let counter = 0;
let displayday = "Weekday";


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
    temp: [0],
    day: 1,
    times: [0],
  });


  
  const [val, setValue] = React.useState("P100004");

  

  const jsonString = " ";
  var baseUrl =
    "https://nd051owuz3.execute-api.us-east-1.amazonaws.com/default/WaterProfileAPI?device=" +
    state.user +
    "&timestart=" +
    state.times +
    "&vol=" +
    state.vol +
    "&day=" +
    state.day;
  var apiKey = "aWy1JNm7rWa34cc8pD32b4JaXXfBCr4T1cM1a6Ii";

  var baseUrl2 =
  "https://nb51qzgvzj.execute-api.us-east-1.amazonaws.com/default/ResetWaterProfileAPI?device=" +
  state.user 
  var apiKey2 = "Mz2iDXzYbfV972FdGCnI7nGer75Wavt8lNstlnHb";

  function handleChange(evt) {
    const value = evt.target.value;
    console.log("Value", evt.target.value);
    console.log("Name", evt.target.name);

    setState({
      ...state,
      [evt.target.name]: value,
    });
  }


  
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiKey}`,
    },
  };

  const options2 = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiKey2}`,
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
      value: 0,
      label: "0%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];
  var columns = [
    { field: "Day", headerName: "Day", width: 130 },
    { field: "starttime", headerName: "Start Time", width: 130 },
    { field: "volume", headerName: "Tank Volume", width: 130 },
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
    console.log("sStartTimes", state.times);
    console.log("sDay", state.day);
    console.log("volume", state.vol);
    const tableworkdat = {
      id: counter,
      Day: displayday,
      starttime: state.times + ":00",
      volume: state.vol,
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

  const sendResetData = function () {
    tbldata = [];
    console.log("URL", baseUrl2);
    fetch(baseUrl2, options2)
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
            <Typography id="input-slider" gutterBottom>
            Times
          </Typography>
              <Slider
                defaultValue={[0]}
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
                  state.times + ":00"
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
          <Typography id="input-slider" gutterBottom>
            Tank Full
          </Typography>
              <Slider
                defaultValue={[0]}
                value={state.vol}
                name="vol"
                valueLabelDisplay="auto"
                onChange={handleChange}
                step={25}
                size="large"
                marks={pmarks}
                min={0}
                max={100}
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
            </Grid>
            <Grid container   justifyContent="center">
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
              <Button  variant="contained" onClick={sendData}>Submit</Button>
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
              <Button  variant="contained" onClick={sendResetData}>Reset</Button>
            </Grid>
          </Grid>

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} autoHeight="true" />
          </div>
        </Container>

      </ThemeProvider>
    </>
  );
}
export default Picker;
