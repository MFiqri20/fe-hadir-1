import DoughnutChart from "@/component/DoughnutChart";
import { Chart, ChartData, ChartOptions, LegendItem } from "chart.js";
import React from "react";

interface DoughnutProps {
    title: string;
    permission: any;
    absen: any;
    attendece: any;
}

const DoughnutComponent: React.FC<DoughnutProps> = ({ 
    title,
    permission,
    absen,
    attendece
 }) => {
    const data: ChartData = {
        labels: ["Attendance", "Permisson", "Absent"],
        datasets: [
          {
            borderWidth: 0,
            data: [absen, permission, attendece],
            backgroundColor: ["#FFBC25", "#023E8A", "#0077B6"], // Warna kuning, biru, biru tua
          },
        ],
      };
    
      const options: ChartOptions = {
        plugins: {
          legend: {
            rtl: false,
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true, // Mengubah label menjadi lingkaran
              boxWidth: 8, // Ukuran kotak untuk legend, bisa disesuaikan
              boxHeight: 8, // Ukuran kotak untuk legend, bisa disesuaikan
              padding: 16, // Menambahkan jarak antar label secara keseluruhan
              pointStyle: "circle", // Bentuk label lingkaran
              textAlign: "left",
              font: {
                family: "sans-serif", // Ganti dengan font yang diinginkan
                size: 12,
              },
              generateLabels: function (chart: Chart): LegendItem[] {
                const data = chart.data;
                if (data.labels && data.datasets) {
                  return data.labels.map((label, index) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(index, false);
                    return {
                      text: `${label}  `, // Menambahkan spasi di awal label untuk jarak antara lingkaran dan teks
                      fillStyle: style.backgroundColor,
                      hidden: !chart.getDataVisibility(index),
                      lineCap: style.borderCapStyle,
                      lineDash: style.borderDash,
                      lineDashOffset: style.borderDashOffset,
                      lineJoin: style.borderJoinStyle,
                      lineWidth: style.borderWidth,
                      strokeStyle: style.borderColor,
                      pointStyle: style.pointStyle,
                      rotation: style.rotation,
                      textAlign: "left",
                      datasetIndex: 0,
                      index: index,
                    };
                  });
                }
                return [];
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}%`;
              },
            },
          },
          datalabels: {
            color: "#fff",
            formatter: function (value) {
              return `${value}%`;
            },
            font: {
              weight: "bold",
            },
          },
        },
      };
    return ( 
        <>
        <div className="border shadow-lg rounded-md h-[480px] flex flex-col justify-center items-center">
            <div className="flex w-full justify-between my-9 px-9">
              <div className="">
                <h1 className="font-quick font-medium text-2xl">
                  {title}
                </h1>
                <p className="font-quick text-[#495057] text-sm font-medium mt-2">
                  Attendace Graphic
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7"
              >
                <path
                  fill="#bdbdbd"
                  d="M504 256c0 137-111 248-248 248S8 393 8 256C8 119.1 119 8 256 8s248 111.1 248 248zm-248 50c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
                />
              </svg>
            </div>
            <hr className="w-full border border-[#F0F0F0]" />
            <div className="my-9 mx-[72px]">
              <div className="w-[320px]">
                <DoughnutChart data={data} options={options} />
              </div>
            </div>
          </div>
        </>
     );
}
 
export default DoughnutComponent;