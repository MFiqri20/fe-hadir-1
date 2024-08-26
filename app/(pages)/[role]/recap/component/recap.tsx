"use client"
import React from "react";


const Recap = () => {
  const data = [
    {
      no: 1,
      date: "Monday, 26 of July 2024",
      clock: "07:30",
      lesson: "Math",
      material: "Translation Function",
      gap: "0 +/-",
      attendances: { H: true, T: false, I: false, TH: false },
    },
    {
      no: 2,
      date: "Tuesday, 27 of July 2024",
      clock: "07:30",
      lesson: "Math",
      material: "Dilatasi Fungsi",
      gap: "0 +/-",
      attendances: { H: true, T: false, I: false, TH: false },
    },
    {
      no: 3,
      date: "Wednesday, 28 of July 2024",
      clock: "07:33",
      lesson: "Indonesia",
      material: "Editorial text",
      gap: "3 +/-",
      attendances: { H: false, T: true, I: false, TH: false },
    },
    {
      no: 4,
      date: "Thursday, 29 of July 2024",
      clock: "-",
      lesson: "",
      material: "-",
      gap: "-",
      attendances: { H: false, T: false, I: false, TH: true },
    },
    {
      no: 5,
      date: "Friday, 30 of July 2024",
      clock: "07:30",
      lesson: "Math",
      material: "Translation Function",
      gap: "0 +/-",
      attendances: { H: true, T: false, I: false, TH: false },
    },
    {
      no: 6,
      date: "Saturday, 31 of July 2024",
      clock: "07:30",
      lesson: "Indonesia",
      material: "Editorial text",
      gap: "0 +/-",
      attendances: { H: true, T: false, I: false, TH: false },
    },
  ];

  return (
    <section className="w-screen h-fit pr-16 py-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-quick">
          <thead>
            <tr className="bg-[#DEE2E6]">
              <th
                rowSpan={4}
                className="px-4 py-2 border border-[#212529] rounded-tl-lg"
              >
                No
              </th>
              <th rowSpan={2} className="px-4 py-2 border border-[#212529]">
                Date
              </th>
              <th rowSpan={2} className="px-4 py-2 border border-[#212529]">
                Clock
              </th>
              <th rowSpan={2} className="px-4 py-2 border border-[#212529]">
                Lesson
              </th>
              <th rowSpan={2} className="px-4 py-2 border border-[#212529]">
                Material
              </th>
              <th rowSpan={2} className="px-4 py-2 border border-[#212529]">
                Gap
              </th>
              <th colSpan={4} className="px-4 py-2 border border-[#212529]">
                Attandence
              </th>
            </tr>
            <tr>
              <th className="border border-[#212529] bg-green-200">H</th>
              <th className="border border-[#212529] bg-yellow-200">T</th>
              <th className="border border-[#212529] bg-blue-200">I</th>
              <th className="border border-[#212529] bg-red-200">TH</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border border-[#212529]">{item.no}</td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.date}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.clock}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.lesson}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.material}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.gap}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.attendances.H ? "✔" : "-"}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.attendances.T ? "✔" : "-"}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.attendances.I ? "✔" : "-"}
                </td>
                <td className="px-4 py-2 border border-[#212529]">
                  {item.attendances.TH ? "✔" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#DEE2E6] rounded-b-lg">
              <td
                colSpan={6}
                className="px-4 py-2 border-y border-l border-[#212529]">
                <select className="p-2 border rounded-lg">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </td>
              <td
                colSpan={4}
                className="px-4 py-2  border-y border-r border-[#212529]"
              >
                <div className="flex justify-end space-x-2">
                  <button className="p-2 border border-[#212529] rounded-lg">
                    {"<"}
                  </button>
                  <button className="p-2 border border-[#212529] rounded-lg">
                    {">"}
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default Recap;
