import React, { useState, useEffect, useRef } from "react";
import GaugeComponent from 'react-gauge-component'



function ElecData() {
  
  const [destemplow, setDesTempLow] = useState({destemplow: "18"});
  const [destemphigh, setDesTempHigh] = useState({destemphigh: "25"});
  const [roomtemp, setRoomTemp] = useState({roomtemp: "22"});
  const [watertemp, setWatrerTemp] = useState({watertemp: "50"});
  const [watervol, setWaterVol] = useState({watervol: "150"});
  console.log("DTH", destemphigh[0])
  console.log("DTL", destemplow)

  var baseUrl2 =
  "https://akhj8y0g8a.execute-api.us-east-1.amazonaws.com/default/FrontPageDataAPI?prem=P100004";
var apiKey2 = "gwOJ9dNP6v2hnTIyzR8fx6dA9ZX2yyrA6AenaQ0M";
console.log(baseUrl2);


 
  
  const fetchData = function () {
    console.log("Attempting API");
    // console.log("${baseUrl2}");
    // console.log(apiKey2);
    fetch(`${baseUrl2}`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey2}`,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      },
    })
      .then((response) => {
        console.log("Success");
        response.json().then((json) => {
          console.log(response);
          const data = json.content;
          console.log("Data", data)
          const dtl =  data.map(
            content=> [content.destemplow]
          )
          console.log("DTL",dtl[0]);
          setDesTempLow(dtl)
          const dth =  data.map(
            content=> [content.destemphigh]
          )
          console.log("DTH",dth[0]);
          setDesTempHigh(dth)
          const rtm =  data.map(
            content=> [content.roomtemp]
          )
          console.log("RTM",rtm[0]);
          setRoomTemp(rtm)

        });
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  useEffect(() => {
    const interval = setInterval(() => fetchData(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);






  return(
    <body>
<GaugeComponent
  type="semicircle"
  arc={{
    width: 0.1,
    padding: 0.005,
    cornerRadius: 1,
    // gradient: true,
    subArcs: [
      {
        limit: destemplow[0],
        color: '#dde7f0',
        // showTick: true,
        tooltip: {
          text: "Under "+ destemplow
        },
        onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
        onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
        onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
      },
      {
        limit: destemphigh[0],
        color: '#0f8f03',
        // showTick: true,
        text: "Ideal Temp",
        tooltip: {
          text: destemplow+ "-"+ destemphigh
        }
      },
      {
        limit: 35,
        color: '#e6b3b3',
        // showTick: true,
        tooltip: {
          text: "Over "+destemphigh
        }
      },


      // {
      //   color: '#EA4228',
      //   tooltip: {
      //     text: 'Too high temperature!'
      //   }
      // }
    ]
  }}
  pointer={{
    color: '#345243',
    length: 0.80,
    width: 15,
    // elastic: true,
  }}
  // labels={{
  //   valueLabel: { formatTextValue: value => value + 'ºC' },
  //   tickLabels: {
  //     type: 'outer',
  //     valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
  //     ticks: [
  //       { value: 13 },
  //       { value: 22.5 },
  //       { value: 32 }
  //     ],
  //   }
  // }}
  value={roomtemp[0]}
  minValue={10}
  maxValue={35}
/>
</body>
  )

}

export default ElecData;
