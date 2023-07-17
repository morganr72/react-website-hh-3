import "../DevHealth.css";
import "../Charts.css";
import React, { useState, useEffect } from "react";

function DevHealth() {
  const [val, setValue] = React.useState("66E32E1B");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  var baseUrl =
    "https://tyl2kytbxj.execute-api.us-east-1.amazonaws.com/default/DevHealthForWeb?device=" +
    val;
  var apiKey = "oFowbQF3LI6Ft3UgOIu1balJyovMHnu56MIuOjOi";

  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      await fetch(`${baseUrl}`, {
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
          response.json().then((json) => {
            console.log(json);
            setChart(json.content);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCommands();
  }, [baseUrl, apiKey]);

  return (
    <>
      <div>
        <input type="text" class="TboxLab" value={"Device"} />
        {chart.map((val, key) => {
          return <input class="TboxVal" type="text" value={val.Device} />;
        })}
      </div>
      <div>
        <input type="text" class="TboxLab" value={"Last Temp Received"} />
        {chart.map((val, key) => {
          return (
            <input class="TboxVal" type="text" value={val.LastTempReceived} />
          );
        })}
      </div>
      <div>
        <input type="text" class="TboxLab" value={"Sent Command ID"} />
        {chart.map((val, key) => {
          return (
            <input class="TboxVal" type="text" value={val.LastCommandSent} />
          );
        })}
      </div>
      <div>
        <input type="text" class="TboxLab" value={"Receive Command ID"} />
        {chart.map((val, key) => {
          return (
            <input
              class="TboxVal"
              type="text"
              value={val.LastCommandRecevied}
            />
          );
        })}
      </div>
      <div>
        <label>
          DeviceID
          <select value={val} onChange={handleChange}>
            <option value="48A2A459">48A2A459</option>
            <option value="66E32E1B">66E32E1B</option>
            <option value="988A301F">988A301F</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default DevHealth;
