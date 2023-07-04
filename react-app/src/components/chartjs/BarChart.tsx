import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios, { AxiosResponse } from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

function createChartArray(arry:any){
  const y: number[] = [];
  const x: string[] = [];
  const newArray = []
  for (let dataObj of arry) {
    newArray.push({
      date: new Date(dataObj.day),
      NumberOfPosts: parseInt(dataObj.NumberOfPosts)
    })
  }

  let sortedArray = newArray.slice().sort((a:any, b:any) => a.date - b.date);

  for (let dataObj of sortedArray) {
    y.push(dataObj.NumberOfPosts);
    let tempDate = dataObj.date;
    x.push(tempDate.getUTCMonth() + 1 + '/' + tempDate.getUTCDate());
  }

  return {x: x, y:y}
}


export default function BarChart() {
  const [dataChart, setDataChart ] = useState();
  useEffect(() => {
		const fetchData = async () => {
      try {
        await axios.get(`/api/dailytweets`)
          .then(res => {
            const positive = createChartArray(res.data.positive);
            const neutral = createChartArray(res.data.neutral);
            const negative = createChartArray(res.data.negative);
            const labels = positive.x;
           
            setDataChart({
              labels,
              datasets: [
                {
                  label: 'positive',
                  data: positive.y,
                  backgroundColor: 'rgba(23, 162, 184, 0.5)',
                },
                {
                  label: 'neutral',
                  data: neutral.y,
                  backgroundColor: 'rgba(7, 188, 12, 0.5)',
                },
                {
                  label: 'negative',
                  data: negative.y,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ]
            })
          })
      } catch (e: any) {
        if (e.response && e.response.status === 400) {
          console.log('400 Error!!');
          console.log(e.message);
        } else{
          console.log(e.message)
        }
      }
		};
		fetchData();
    }, []); 

  return (
    <>
    {dataChart && <Bar data={dataChart} options={options}/>}
    </>
  );
}
