import React, {useState} from "react";
import "../Boost.css";
import { emit } from "process";








function Boost() {
  const[values, setValues] =useState({
    heatWater: "",
    duration: "",
    device: ""
  });

  console.log(values)

  var apiKey = "R3xwvtWzc23Dgnd7rYtP69ID5l3cFl3Z9xoVVOdt";
  var baseUrl =
  "https://az921o77z2.execute-api.us-east-1.amazonaws.com/default/BoostAPI?device=" +
  values.device+
  "&heatwater="+
  values.heatWater+
  "&duration="+
  values.duration



var apiKey = "R3xwvtWzc23Dgnd7rYtP69ID5l3cFl3Z9xoVVOdt";


const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": `${apiKey}`,
  },
};
  const[submitted, setSubmitted] = useState(false);

  const[valid, setValid] = useState(false);

  const[error, setError] = useState(false);

  const handleHeatWaterInputChange = (event) => {
    setValues({...values, heatWater: event.target.value})
  }
  const handleDeviceInputChange = (event) => {
    setValues({...values, device: event.target.value})
    console.log(values.device)
  }

  const handleDurationInputChange = (event) => {
    setValues({...values, duration: event.target.value})
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if(values.heatWater && values.duration && values.device){
      setValid(true);
      setSubmitted(true);
      fetch(baseUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json()
        console.log("Resp", response.json());
      })
      .then((updatedData) => {
        console.log("Data updated:", updatedData);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      })
    }
    else {
      setError(true)
    }

  }
  return (

    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid ? <div className="success-message">Success!</div>: null}
        {error ? <div className="success-message">Error!</div>: null}

        <select onChange={handleDeviceInputChange} id="device" value={values.device} className="form-field">
        <option disabled={true} value="">
            Device
          </option>
          <option value="P100001">Office</option>
          <option value="P100002">Home 1</option>
          <option value="P100003">Home 2</option>
        </select>


        <select onChange={handleHeatWaterInputChange} id="heatWater" value={values.heatWater} className="form-field">
          <option disabled={true} value="">
            Heat or Water?
          </option>
          <option value ="H">Heat</option>
          <option value ="W">Water</option>
        </select>

        <input
        onChange={handleDurationInputChange}
        value={values.duration}
        className="form-field"
        placeholder="Boost Duration Hours"
        name="duration"/>
        {submitted && !values.duration ? <span>Please enter a Duration</span> : null}

        <button class="form-field" type="submit">
          Submit
        </button>
      </form> 
    </div>
  );
}
export default Boost;
