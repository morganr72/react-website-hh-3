import * as React from "react";
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

export function DaySelect() {
  const [day, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Day</InputLabel>
      <Select value={day} label="Day" onChange={handleChange}>
        <MenuItem value={1}>Weekday</MenuItem>
        <MenuItem value={2}>Weekend</MenuItem>
      </Select>
    </FormControl>
  );
}

export function DiscreteSlider() {
  const [temp, setValue] = React.useState([16]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <ThemeProvider theme={inptheme}>
        <Slider
          defaultValue={18}
          value={temp}
          valueLabelDisplay="on"
          onChange={handleChange}
          step={1}
          size="large"
          marks
          min={16}
          max={24}
        />
      </ThemeProvider>
    </>
  );
}

var baseUrl =
  "https://goyh62l73j.execute-api.us-east-1.amazonaws.com/default/MasterTransactionAPI?controller=";
var apiKey = "vbeLPuegOeCdlx7bouy95nsege1farX5TTbrvL60";

export default function Picker() {
  const RangeSlider = function () {
    const [times, setValue] = React.useState([0, 24]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log("Range", times);
      var apitimes = times;
      // chooseTime(newValue);
    };
    return (
      <>
        <ThemeProvider theme={inptheme}>
          <Slider
            defaultValue={18}
            valueLabelDisplay="on"
            value={times}
            onChange={handleChange}
            step={1}
            size="large"
            marks
            min={0}
            max={24}
            valueLabelFormat={times[0] + ":00-" + times[1] + ":00"}
          />
        </ThemeProvider>
      </>
    );
  };

  const dataToUpdate = {
    Device: "66E32E1B",
    timeraange: "times",
    temp: "temp",
    day: "day",
  };
  const jsonString = JSON.stringify(dataToUpdate);

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiKey}`,
    },
    body: jsonString,
  };

  const sendData = function () {
    console.log("Range", baseUrl);
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
              <RangeSlider />
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <DiscreteSlider />
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="row"
              // alignItems="flex-end"
              justify="center"
            >
              <DaySelect />
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
