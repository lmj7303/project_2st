import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch,useSelector } from "react-redux";
import { useState,Component,useRef,useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart3(){
    const reChart3Power = useSelector((state)=>(state.chart3_power));
    const reChart3Time = useSelector((state)=>(state.chart3_time));
    const labels = reChart3Time;
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };


    const data = {
        labels,
        datasets: [
          {
            label: '총 전력량',
            data:reChart3Power,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          // {
          //   label: 'Dataset 2',
          //   data: [],
          //   borderColor: 'rgb(53, 162, 235)',
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          // },
        ],
    }
    return(
        <>
        <Line options={options} data={data} />
        </>
    )
}





