import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios, { AxiosResponse } from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Doughnut Chart',
    },
    datalabels: {
      display:true
    }
  },
};

export default function DoughnutChart() {
  const [dataChart, setDataChart ] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/api/sentimentratio`)
          .then(res => {
            const data: number[] = [];
            const labels: string[] = [];
            const newArray = res.data;

            let sortedArray = newArray.slice().sort(function (a: any, b: any) {
              if (a.sentiment > b.sentiment) {
                return 1;
              } else {
                return -1;
              }
            });

            for (let dataObj of sortedArray) {
              if (dataObj.sentiment == "positive" || dataObj.sentiment == "neutral" || dataObj.sentiment == "negative") {
                data.push(dataObj.NumberOfPosts);
                labels.push(dataObj.sentiment);
              }
            }

            setDataChart({
              labels,
              datasets: [
                {
                  label: '# of Votes',
                  data: data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(7, 188, 12, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(7, 188, 12, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            })
          })
      } catch (e: any) {
        if (e.response && e.response.status === 400) {
          console.log('400 Error!!');
          console.log(e.message);
        }
      }
    };

    fetchData();
  }, []); 

  return (
    <>
    {dataChart && <Doughnut data={dataChart} options={options} />}
    </>
  );
}
