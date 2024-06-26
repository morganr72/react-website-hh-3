import React, {useState, useEffect} from "react";
import "../Boost.css";
import { emit } from "process";

function Boost() {
const[values, setValues] =useState({
    heatWater: "",
    duration: "",
    device: ""
  });
// var baseUrl2 =
//   "https://w3vawcqvtc.execute-api.us-east-1.amazonaws.com/default/GetBoosStatusAPI?device="+
//   values.device;
// var apiKey2 = "sWxVi5wOMJ3re2CwW5KfQau2HCCm1Fro4UEcc7jb";
// console.log(baseUrl2);
// console.log("VD"+values.device)

  const [boostStatus, setBoosStatus] = useState([]);

  const[boostflg, SetBoostFlg] = useState(false);
  
  // const fetchBoost = function () {
  //   console.log("Attempting API"+values.device);
  //   console.log("BU2"+baseUrl2);
  //   console.log(apiKey2);
  //   fetch(`${baseUrl2}`, {
  //     method: `GET`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": `${apiKey2}`,
  //       // 'Access-Control-Allow-Origin': '*',
  //       // 'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
  //       // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  //     },
  //   })
  //     .then((response) => {
  //       console.log("Success");
  //       response.json().then((json) => {
  //         console.log(response);
  //         const data = json.content;
  //         console.log("Data", data)
  //         const bstat =  data.map(
  //           content=> [content.booststatus]
  //         )
  //         console.log("Status",bstat[0]);

  //         setBoosStatus(bstat)
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //     if(boostStatus === 'N' ){
  //       SetBoostFlg(false);
  //     }
  //     else {
  //       SetBoostFlg(true)
  //     } 
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => fetchBoost(), 10000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
        <option disabled={true} value="P100004">
            Device
          </option>
          <option value="P100004">Office</option>
          <option value="P100005">Farm</option>
          <option value="P100003">Sim</option>
        </select>


        <select onChange={handleHeatWaterInputChange} id="heatWater" value={values.heatWater} className="form-field">
          <option disabled={true} value="">
            Heat or Water?
          </option>
          <option value ="H">Heat</option>
          <option value ="W">Water</option>
          <option value ="C">Cancel</option>
        </select>

        <input
        onChange={handleDurationInputChange}
        value={values.duration}
        className="form-field"
        placeholder="Boost Duration Hours"
        name="duration"/>
        {submitted && !values.duration ? <span>Please enter a Duration</span> : null}


        {/* <button class="form-field" type="submit">
          Check
        </button> */}

        <button class="form-field" type="submit">
          Submit
        </button>
        <body>Current Boost Status is {boostStatus}</body>
        {/* <button class="form-field" type="submit">
          Cancel Boost
        </button> */}
      </form> 
    </div>
  
  );
}
export default Boost;
