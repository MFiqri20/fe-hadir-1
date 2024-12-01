import React from 'react';

const TableWeekly = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-black text-gray-600">
        <thead className="bg-[#DEE2E6] text-gray-900">
          <tr className='text-xl'>
            <th rowSpan={2} className="text-center px-4 py-2 border border-black">Name</th>
            <th rowSpan={2} className="px-4 py-2 border border-black">Class</th>
            <th colSpan={6} className="px-4 py-2 border border-black text-center">Weekly Present</th>
            <th rowSpan={2} className="text-center px-4 py-2 border border-black">Average %</th>
          </tr>
          <tr className="bg-[#DEE2E6] text-lg">
            <th className="px-4 py-2 border border-black text-center">Monday</th>
            <th className="px-4 py-2 border border-black text-center">Tuesday</th>
            <th className="px-4 py-2 border border-black text-center">Wednesday</th>
            <th className="px-4 py-2 border border-black text-center">Thursday</th>
            <th className="px-4 py-2 border border-black text-center">Friday</th>
            <th className="px-4 py-2 border border-black text-center">Saturday</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 9 }).map((_, index) => (
            <tr key={index} className="bg-white hover:bg-gray-50 text-lg">
              <td className="px-4 py-2 border border-black">Ramzi Respati Putra Yulianto</td>
              <td className="px-4 py-2 border border-black">XII RPL</td>
              <td className="px-4 py-2 border border-black text-center bg-[#BFF6C3]">Att</td>
              <td className="px-4 py-2 border border-black text-center bg-[#f28780]">Ab</td>
              <td className="px-4 py-2 border border-black text-center bg-[#74c0e8]">Per</td>
              <td className="px-4 py-2 border border-black text-center bg-[#BFF6C3]">Att</td>
              <td className="px-4 py-2 border border-black text-center bg-[#edc874]">La</td>
              <td className="px-4 py-2 border border-black text-center bg-[#BFF6C3]">Att</td>
              <td className="px-4 py-2 border border-black text-center">78,67%</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-[#DEE2E6]">
          <tr>
            <td colSpan={8} className="px-4 py-2 text-xl border border-black font-semibold text-center">Total Average %</td>
            <td className="px-4 py-2 text-center bg-yellow-200">78,26%</td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination */}
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

export default TableWeekly;
