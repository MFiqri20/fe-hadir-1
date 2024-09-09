

import React from "react";
import "chart.js/auto";
import dynamic from "next/dynamic";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Attendance Overview",
      data: [40, 25, 56, 88, 63],
      fill: false,
      borderColor: "rgb(0, 119, 182)",
      tension: 0.1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      labels: {
        font: {
          family: "'Quicksand', sans-serif", // Custom font for legend labels
          size: 16, // Font size for legend labels
          weight: "semibold", // Bold font
        },
        color: "#495057", // Font color for legend labels
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "'Quicksand', sans-serif", // Custom font for x-axis labels
          size: 14, // Font size for x-axis labels
        },
        color: "#495057", // Font color for x-axis labels
      },
    },
    y: {
      ticks: {
        font: {
          family: "'Quicksand', sans-serif", // Custom font for y-axis labels
          size: 14, // Font size for y-axis labels
        },
        color: "#495057", // Font color for y-axis labels
      },
    },
  },
};

const LineChar = () => {
    return ( 
        <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1>Example 1: Line Chart</h1>
        <div className="w-[700px] h-[700px]">
          <Line data={data} options={options}/>
        </div>
      </div>
     );
}
 
export default Line;