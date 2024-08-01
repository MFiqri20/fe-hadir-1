"use client";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import { useRouter } from "next/navigation";
import useMapelModule from "./lib";
import Button from "@/component/Button";
import useGuruModule from "./lib";

const Guru = () => {
  const { useGuruSubjectList } = useGuruModule();
  const { data, isFetching } = useGuruSubjectList();

  return (
    <>
      <section className="container px-4 mx-auto space-y-5">
        <section className="flex items-center justify-between">
          <Button colorSchema="red" title="Tambah Mapel" />
        </section>
        <section>
          <Table isFetching={isFetching} isEmpty={data?.data?.length === 0}>
            <Thead>
              <Tr>
                <Th scope="col">
                  <div className="flex items-center gap-x-3">
                    <input
                      type="checkbox"
                      className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                    />
                  </div>
                </Th>
                <Th scope="col">Nama Guru</Th>
                <Th scope="col">Nama Pelajaran</Th>
                <Th scope="col">Subject code</Th>
                <Th scope="col">Created At</Th>
                <Th scope="col">Updated At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.data.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                      />
                    </Td>
                    <Td>
                      <span>{item.user.nama}</span>
                    </Td>

                    <Td>
                      {item.mapel.map((item) => (
                        <div className="flex flex-col gap-3" key={item.nama_mapel}>
                          <span className=" mb-3">{item.nama_mapel}</span>
                        </div>
                      ))}
                    </Td>
                    <Td>
                      {item.mapel.map((item) => (
                        <div className="flex flex-col gap-3" key={item.nama_mapel}>
                          <span className=" mb-3">{item.subject_code}</span>
                        </div>
                      ))}
                    </Td>
                    <Td>
                      <span>{item.created_at}</span>
                    </Td>
                    <Td>
                      <span>{item.updated_at}</span>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </section>
      </section>
    </>
  );
};

export default Guru;