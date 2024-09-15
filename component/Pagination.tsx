import React, { ChangeEvent } from "react";
import clsx from "clsx";

interface PaginationProps {
  page: number | string;
  pageSize: number | string;
  totalPages: number;
  totalResults: number;
  isFetching: boolean;
  current_data: number;
  handlePage: (page: number) => void;
  handlePageSize: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalPages,
  totalResults,
  isFetching,
  current_data,
  handlePage,
  handlePageSize,
}) => {
  function getPage(totalItems: number, currentPage: number, pageSize: number) {
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const pages = Array.from(
      { length: endPage + 1 - startPage },
      (_, i) => startPage + i
    );

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      pages,
    };
  }

  let pages = getPage(totalResults, Number(page), Number(pageSize));

  return (
    <section className="flex justify-between py-4 items-center">
      {/* Page Size Dropdown */}
      <div>
        <label htmlFor="pageSize" className="mr-2 text-gray-700">
          Page Size:
        </label>
        <select
          id="pageSize"
          value={Number(pageSize)} // Ensure it's a number
          onChange={handlePageSize}
          className="px-4 py-1 border rounded"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Pagination Buttons */}
      <nav className="relative inline-flex items-center space-x-4">
        <button
          onClick={() => handlePage(Number(page) - 1)}
          disabled={Number(page) <= 1} // Disable if on the first page
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
        >
          Previous
        </button>

        {isFetching ? (
          <span className="ml-4 w-24 h-6 bg-gray-300 rounded animate-pulse"></span>
        ) : (
          <span className="mx-4 text-gray-700">
            Page {page} of {pages.totalPages}
          </span>
        )}

        <button
          onClick={() => handlePage(Number(page) + 1)}
          disabled={Number(page) >= pages.totalPages} // Disable if on the last page
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
        >
          Next
        </button>
      </nav>

      {/* Current Data Info */}
      <div className="text-sm text-gray-600">
        {isFetching ? (
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
        ) : (
          `Showing ${current_data} of ${totalResults} results`
        )}
      </div>
    </section>
  );
};

export default Pagination;
