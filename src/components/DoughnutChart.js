import React,{useState, useEffect} from 'react'
import{Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)

const DoughnutChart = () => {

var baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10'
var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
var apiKey = "coinranking2b24e0bd77a975db87f15aed9cf8984a1d451232ceb13195"

const [chart, setChart] = useState([])

useEffect(() => {
    const fetchCoins = async () => {
        await fetch(`${proxyUrl}${baseUrl}`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${apiKey}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            response.json().then((json) => {
                console.log(json)
                setChart(json.data)
            })
        }).catch(error => {
            console.log(error);
        })
    }
    fetchCoins()
}, [baseUrl, proxyUrl, apiKey])
console.log("chart", chart);

var data = {
        labels: chart?.coins?.map(x =>x.name),
        datasets: [{
          label: `${chart?.coins?.length} Coins`,
          data: chart?.coins?.map(x => x.price),
          borderWidth: 1
        }]
      }

    var options =  {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
      }

  return (
    <div>
        <Doughnut
        height={400}
        data={data}
        options={options}
        />
    </div>
  )
}

export default DoughnutChart