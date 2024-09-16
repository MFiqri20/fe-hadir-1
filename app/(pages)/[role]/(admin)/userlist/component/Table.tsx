import { UserlistReponse } from "@/app/lib/(auth)/interface/interface";
import React from "react";

const UserListTable = ({ data }: { data: UserlistReponse }) => {
  return (
    <div className="container mx-auto mt-6">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-lg text-gray-700 uppercase border-y-2 border-[#D9D9D9]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                NISN
              </th>
              <th scope="col" className="px-6 py-3">
                Class
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user, index) => (
              <tr
                key={index}
                className="border-b-2 border-[#D9D9D9] hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-semibold text-lg whitespace-nowrap"
                >
                  {user.nama}
                </th>
                <td className="px-6 py-4 font-semibold text-lg">
                  {user.email}
                </td>
                <td className="px-6 py-4 font-semibold text-lg">
                  {user.updated_at}
                </td>
                <td className="px-6 py-4 font-semibold text-lg">
                  {user.avatar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;
