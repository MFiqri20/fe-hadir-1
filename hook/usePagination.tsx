import { ChangeEvent, useEffect, useState } from "react";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const usePagination = <T extends PaginationParams>(defaultParams: T) => {
  let [params, setParams] = useState<T>(defaultParams);
  let [keyword, setKeyword] = useState("");
  let [filterParams, setFilterParams] = useState<T>(defaultParams);

  const handleFilter = () => {
    setFilterParams({ ...params, page: 1 });
    setParams((prevParams) => {
      return {
        ...prevParams,
        page: 1,
      };
    });
  };

  const handleKeyword = (keyword: string) => {
    setFilterParams({ ...params, keyword: keyword, page: 1 });
  };

  const handleSearch = (e: ChangeEvent<any>) => {
    setKeyword(e.target.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams: any) => {
      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClear = () => {
    setFilterParams(defaultParams);
    setParams(defaultParams);
  };

  const handlePageSize = (e: ChangeEvent<any>) => {
    setParams((params) => ({ ...params, pageSize: e.target.value, page : 1 }));
    setFilterParams((params) => ({ ...params, pageSize: e.target.value, page : 1 }));
  };

  const handlePage = (page: number) => {
    setParams((params) => ({ ...params, page: page }));
    setFilterParams((params) => ({ ...params, page: page }));
  };

  return {
    params,
    keyword,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
    handleSearch,
    handleChange,
    handleKeyword,
  };
};
