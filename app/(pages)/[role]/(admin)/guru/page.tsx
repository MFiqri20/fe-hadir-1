"use client";
import { useState } from "react";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import Button from "@/component/Button";
import { GuruSubjectListResponse } from "@/app/lib/(guru)/interface";
import useCrudModule, { PaginationParams } from "@/hook/useCRUD";
import FilterSidebar from "../components/filterSideBar";
import Pagination from "@/component/Pagination";
import Label from "@/component/Label";
import FilterInput from "@/component/filterInput";

const Guru = () => {
  const defaultParams: PaginationParams = {
    page: 1,
    pageSize: 10,
    nama: "",
    nama_mapel: "",
    initial_subject: "",
  };

  const { useListPagination } = useCrudModule();
  const {
    data,
    isLoading,
    isFetching,
    handleClear,
    handleChange,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    setParams,
  } = useListPagination<GuruSubjectListResponse>(
    "guru/list-subject",
    defaultParams,
    30000
  );

  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleFilterSubmit = async () => {
    await handleFilter();
    setFilterOpen(false);
  };

  const SkeletonRows = ({ count }: { count: number }) => (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Tr key={index}>
          <Td>
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </Td>
          <Td>
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
          </Td>
          <Td>
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
          </Td>
          <Td>
            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
          </Td>
          <Td>
            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
          </Td>
          <Td>
            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
          </Td>
        </Tr>
      ))}
    </>
  );

  return (
    <div className="overflow-auto h-screen">
      <section className="container px-6 py-8 mx-auto space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Daftar Guru</h1>
          <div className="flex gap-4">
            <Button
              colorSchema="red"
              title="Tambah Guru"
              className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-lg"
            />
            <button
              onClick={() => setFilterOpen(true)}
              className="btn btn-primary"
            >
              Filter
            </button>
          </div>
        </section>

        <section className="rounded-lg">
          <Table isFetching={isLoading} isEmpty={data?.data?.length === 0}>
            <Thead>
              <Tr>
                <Th scope="col">
                  <input
                    type="checkbox"
                    className="text-blue-500 border-gray-300 rounded"
                  />
                </Th>
                <Th scope="col">Nama Guru</Th>
                <Th scope="col">Nama Pelajaran</Th>
                <Th scope="col">Subject code</Th>
                <Th scope="col">Created At</Th>
                <Th scope="col">Updated At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isFetching ? (
                <SkeletonRows count={10} />
              ) : (
                data?.data.map((item, index) => (
                  <Tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <Td>
                      <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded"
                      />
                    </Td>
                    <Td>
                      <span className="font-medium text-gray-700">
                        {item.nama}
                      </span>
                    </Td>
                    <Td>
                      {item.mapel.map((mapelItem) => (
                        <div key={mapelItem.nama_mapel}>
                          {mapelItem.nama_mapel}
                        </div>
                      ))}
                    </Td>
                    <Td>
                      {item.mapel.map((mapelItem) => (
                        <div key={mapelItem.subject_code}>
                          {mapelItem.subject_code}
                        </div>
                      ))}
                    </Td>
                    <Td>
                      <span className="text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-gray-500">
                        {new Date(item.updated_at).toLocaleDateString()}
                      </span>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </section>

        <section>
          <Pagination
            isFetching={isFetching}
            page={data?.pagination.page || 1}
            pageSize={data?.pagination.pageSize || 10}
            totalPages={data?.pagination.total_page || 0}
            totalResults={data?.pagination.total || 0}
            current_data={data?.pagination.current_data || 0}
            handlePage={handlePage}
            handlePageSize={handlePageSize}
          />
        </section>
      </section>

      <FilterSidebar
        onSubmit={handleFilterSubmit}
        onClear={handleClear}
        title="Filter Guru"
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <FilterInput
          id="nama"
          name="nama"
          placeholder="Nama Guru"
          value={params.nama || ""}
          onChange={handleChange}
        />
        <FilterInput
          id="nama_mapel"
          name="nama_mapel"
          placeholder="Nama mapel"
          value={params.nama_mapel || ""}
          onChange={handleChange}
        />
        <FilterInput
          id="initial_subject"
          name="initial_subject"
          placeholder="Initial Subject code"
          value={params.initial_subject || ""}
          onChange={handleChange}
        />
      </FilterSidebar>
    </div>
  );
};

export default Guru;
