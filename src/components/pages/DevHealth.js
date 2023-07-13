import "../DevHealth.css";
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
  console.log("chart", chart);
  return (
    <>
      <div>
        <table>
          <tr>
            <th>Device</th>
            <th>Last Temperature Received</th>
            <th>Last Commands Received</th>
            <th>Last Commands Sent</th>
          </tr>
          {chart.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Device}</td>
                <td>{val.LastTempReceived}</td>
                <td>{val.LastCommandSent}</td>
                <td>{val.LastCommandRecevied}</td>
              </tr>
            );
          })}
        </table>
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
