import React from "react";
import "../InputProfile.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Grid,
  Box,
  Button,
  Slider,
  Container,
} from "@mui/material";

// function valuetext(temp) {
//   return `${temp}°C`;
// }

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

// export function DaySelect() {
//   const [day, setAge] = React.useState("");

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

// return (
//   <FormControl fullWidth>
//     <InputLabel>Day</InputLabel>
//     <Select value={day} label="Day" onChange={handleChange}>
//       <MenuItem value={1}>Weekday</MenuItem>
//       <MenuItem value={2}>Weekend</MenuItem>
//     </Select>
//   </FormControl>
// );
// }

// export function DiscreteSlider() {
//   const [temp, setValue] = React.useState([16]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
// return (
//   <>
//     <ThemeProvider theme={inptheme}>
//       <Slider
//         defaultValue={18}
//         value={temp}
//         valueLabelDisplay="on"
//         onChange={handleChange}
//         step={1}
//         size="large"
//         marks
//         min={16}
//         max={24}
//       />
//     </ThemeProvider>
//   </>
// );
// }
function Picker() {
  const [state, setState] = React.useState({
    temp: "",
    day: "",
    times: [0, 20],
  });
  var baseUrl =
    "https://goyh62l73j.execute-api.us-east-1.amazonaws.com/default/MasterTransactionAPI?controller=";
  var apiKey = "vbeLPuegOeCdlx7bouy95nsege1farX5TTbrvL60";

  const dataToUpdate = {
    Device: "66E32E1B",
    timeraange: "times",
    temp: "temp",
    day: "day",
  };
  const jsonString = JSON.stringify(dataToUpdate);

  function handleChange(evt) {
    const value = evt.target.value;
    console.log("Values", evt.target.value);
    console.log("Name", evt.target.name);

    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleRange(evt) {
    const value = evt.target.value;
    console.log("Values", evt.target.value);
    console.log("Name", evt.target.name);

    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiKey}`,
    },
    body: jsonString,
  };

  const sendData = function () {
    console.log("sStartTimes", state.times[0]);
    console.log("sEndTimes", state.times[1]);
    console.log("sDay", state.day);
    console.log("stemp", state.temp);
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
  };
  return (
    <>
      <div class="godown-60" id="godown"></div>
      <ThemeProvider theme={inptheme}>
        <Container>
          <Grid container spacing={10}>
            {/* <Grid item x={2}>
              <Button>{value}</Button>
            </Grid> */}
            <Grid
              item
              xs={6}
              container
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <Slider
                defaultValue={[0, 24]}
                valueLabelDisplay="on"
                value={state.times}
                name="times"
                onChange={handleChange}
                step={1}
                size="large"
                marks
                min={0}
                max={24}
                valueLabelFormat={
                  state.times[0] + ":00-" + state.times[1] + ":00"
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <Slider
                defaultValue={18}
                value={state.temp}
                name="temp"
                valueLabelDisplay="on"
                onChange={handleChange}
                step={1}
                size="large"
                marks
                min={16}
                max={24}
              />
            </Grid>
            <Grid
              item
              xs={2}
              container
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
              xs={2}
              container
              direction="row"
              // alignItems="flex-end"
              justify="center"
            >
              <Button onClick={sendData}>Submit</Button>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default Picker;
