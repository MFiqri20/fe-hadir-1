import { GuruSubjectListResponse } from "@/app/lib/(guru)/interface";
import useCrudModule from "@/hook/useCRUD";
import React from "react";

export default function TeacherTable() {
  // const { useGuruSubjectList } = useGuruModule();
  // const { data, isFetching } = useGuruSubjectList();
  const { useList } = useCrudModule();
  const { data, isFetching } =
    useList<GuruSubjectListResponse>("/guru/list-subject");

  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-white font-quick">
        <thead>
          <tr className="bg-[#023E8A] text-white">
            <th className="w-[3%] py-2 px-4">NO</th>
            <th className="w-4/12 py-2 px-4">TEACHER`S NAME</th>
            <th className="w-4/12 py-2 px-4">SUBJECT NAME</th>
            <th className="w-1/12 py-2 px-4">SUBJECT CODE</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {data?.data.map((teacher, index) => (
            <React.Fragment key={teacher.id}>
              <tr>
                <td
                  className="border text-center border-black px-4 py-2"
                  rowSpan={teacher.mapel.length || 1}
                >
                 {teacher.initial_schedule}
                </td>
                <td
                  className="border border-black px-4 py-2"
                  rowSpan={teacher.mapel.length || 1}
                >
                  {teacher.nama}
                </td>
                {teacher.mapel.length > 0 ? (
                  <td className="border border-black px-4 py-2">
                    {teacher.mapel[0].nama_mapel}
                  </td>
                ) : (
                  <td
                    className="border border-black px-4 py-2 text-center"
                    colSpan={2}
                  >
                    No subjects available
                  </td>
                )}
                {teacher.mapel.length > 0 && (
                  <td className="border border-black px-4 py-2">
                    {teacher.mapel[0].subject_code}
                  </td>
                )}
              </tr>
              {teacher.mapel.slice(1).map((subject, i) => (
                <tr key={i}>
                  <td className="border border-black px-4 py-2">
                    {subject.nama_mapel}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {subject.subject_code}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
