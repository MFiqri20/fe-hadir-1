// components/AttendanceTable.js
import React from "react";

const TableMonthly = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-black rounded-lg">
        <thead className="bg-[#DEE2E6] text-gray-900">
          <tr>
            <th className="border border-black p-2" colSpan={2} rowSpan={3}>
              Name
            </th>
            <th className="border border-black p-2" rowSpan={3}>
              Class
            </th>
            <th className="border border-black p-2" colSpan={16}>
              Monthly Present
            </th>
            <th className="border border-black p-2" rowSpan={3}>Average %</th>
          </tr>
          <tr>
            <th className="border border-black p-2" colSpan={4}>
              Week 1
            </th>
            <th className="border border-black p-2" colSpan={4}>
              Week 2
            </th>
            <th className="border border-black p-2" colSpan={4}>
              Week 3
            </th>
            <th className="border border-black p-2" colSpan={4}>
              Week 4
            </th>
          </tr>
          <tr>
            <th className="border border-black p-2 bg-[#BFF6C3]">Att</th>
            <th className="border border-black p-2 bg-[#74c0e8]">Per</th>
            <th className="border border-black p-2 bg-[#f28780]">Ab</th>
            <th className="border border-black p-2 bg-[#edc874]">La</th>
            <th className="border border-black p-2 bg-[#BFF6C3]">Att</th>
            <th className="border border-black p-2 bg-[#74c0e8]">Per</th>
            <th className="border border-black p-2 bg-[#f28780]">Ab</th>
            <th className="border border-black p-2 bg-[#edc874]">La</th>
            <th className="border border-black p-2 bg-[#BFF6C3]">Att</th>
            <th className="border border-black p-2 bg-[#74c0e8]">Per</th>
            <th className="border border-black p-2 bg-[#f28780]">Ab</th>
            <th className="border border-black p-2 bg-[#edc874]">La</th>
            <th className="border border-black p-2 bg-[#BFF6C3]">Att</th>
            <th className="border border-black p-2 bg-[#74c0e8]">Per</th>
            <th className="border border-black p-2 bg-[#f28780]">Ab</th>
            <th className="border border-black p-2 bg-[#edc874]">La</th>
            {/* <th className="border border-gray-300 p-2">78,67%</th> */}
          </tr>
        </thead>
        <tbody className="">
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <tr key={idx}>
                <td className="border border-black p-2" colSpan={2}>
                  Ramzi Respati Putra Yulianto
                </td>
                <td className="border border-black p-2">XII RPL</td>
                {Array(16)
                  .fill(0)
                  .map((_, idx) => (
                    <td
                      key={idx}
                      className="border border-black p-2 text-center"
                    >
                      4
                    </td>
                  ))}
                <td className="border border-black p-2 text-center">
                  78,67%
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between py-3 px-4 bg-[#DEE2E6] text-xl border-x border-b border-black">
        <select className="px-3 py-1 border border-black rounded-md">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div className="text-gray-600">1 of 100</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-black rounded-md text-sm hover:bg-[#DEE2E6]">&lt;</button>
          <button className="px-3 py-1 border border-black rounded-md text-sm hover:bg-[#DEE2E6]">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default TableMonthly;
