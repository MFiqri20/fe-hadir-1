import React from 'react';

const UserListTable = () => {
  const students = [
    {
      name: 'Fatin Nayhan',
      nisn: 'SMKMQ000010121',
      class: 'XII RPL',
      age: 17,
    },
    // Duplicate data untuk tampilan
    {
      name: 'Fatin Nayhan',
      nisn: 'SMKMQ000010121',
      class: 'XII RPL',
      age: 17,
    },
    // Tambahkan lebih banyak data jika perlu
  ];

  return (
    <div className="container mx-auto mt-6">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-lg text-gray-700 uppercase border-y-2 border-[#D9D9D9]">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">NISN</th>
              <th scope="col" className="px-6 py-3">Class</th>
              <th scope="col" className="px-6 py-3">Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b-2 border-[#D9D9D9] hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-semibold text-lg whitespace-nowrap">
                  {student.name}
                </th>
                <td className="px-6 py-4 font-semibold text-lg">{student.nisn}</td>
                <td className="px-6 py-4 font-semibold text-lg">{student.class}</td>
                <td className="px-6 py-4 font-semibold text-lg">{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;
