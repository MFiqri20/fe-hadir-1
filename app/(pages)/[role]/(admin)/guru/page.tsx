"use client";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import { useEffect, useState } from "react";
import Button from "@/component/Button";
import { GuruSubjectListResponse } from "@/app/lib/(guru)/interface";
import useCrudModule, { PaginationParams } from "@/hook/useCRUD";
import { motion } from "framer-motion";
import FilterSidebar from "../components/filterSideBar";
const Guru = () => {
  const defaultParams: PaginationParams = {
    page: 1,
    pageSize: 10,
    nama: "",
  };

  const { useList } = useCrudModule();
  const {
    data,
    isFetching,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    setParams,
  } = useList<GuruSubjectListResponse>("guru/list-subject", defaultParams, 30000);
  const [isFilterOpen, setFilterOpen] = useState(false);
  // Skeleton Loader for Table Rows with loop
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
      <section
        // onClick={() => setFilterOpen(!isFilterOpen)}
        className="container px-6 py-8 mx-auto space-y-6"
      >
        {/* Header with "Tambah Guru" Button */}
        <section className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Daftar Guru</h1>
          <div className="flex gap-4">
            <Button
              colorSchema="red"
              title="Tambah Guru"
              className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-lg"
            />
            <button
              onClick={() => setFilterOpen(true)} // Open the sidebar
              className="btn btn-primary"
            >
              Filter
            </button>
          </div>
        </section>

        {/* Guru Table */}
        <section className="rounded-lg">
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
              {isFetching ? (
                <SkeletonRows count={10} />
              ) : (
                data &&
                data.data.map((item, index) => (
                  <Tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <Td>
                      <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                      />
                    </Td>
                    <Td>
                      <span className="font-medium text-gray-700">
                        {item.nama}
                      </span>
                    </Td>
                    <Td>
                      {item.mapel.map((mapelItem) => (
                        <div
                          className="flex flex-col gap-1"
                          key={mapelItem.nama_mapel}
                        >
                          <span>{mapelItem.nama_mapel}</span>
                        </div>
                      ))}
                    </Td>
                    <Td>
                      {item.mapel.map((mapelItem) => (
                        <div
                          className="flex flex-col gap-1"
                          key={mapelItem.nama_mapel}
                        >
                          <span>{mapelItem.subject_code}</span>
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
        <section className="flex justify-center py-4">
          <nav className="relative inline-flex items-center space-x-4">
            <button
              onClick={() => handlePage(params.page - 1)}
              disabled={params.page === 1}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {params.page} of {data?.pagination.total || 1}
            </span>
            <button
              onClick={() => handlePage(params.page + 1)}
              disabled={params.page === data?.pagination.total}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
            >
              Next
            </button>
          </nav>
        </section>
      </section>
      <FilterSidebar
        title="Filter Guru"
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nama Guru</span>
          </label>
          <input
            type="text"
            name="nama"
            placeholder="Nama Guru"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Subject Code</span>
          </label>
          <input
            type="text"
            name="subject_code"
            placeholder="Subject Code"
            className="input input-bordered"
          />
        </div>
        <button className="btn btn-primary w-full" onClick={() => {}}>
          Apply Filter
        </button>
      </FilterSidebar>
    </div>
  );
};

export default Guru;
