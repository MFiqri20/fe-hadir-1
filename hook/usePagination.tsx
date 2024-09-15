import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PaginationParams {
  page: number;
  pageSize: number;
  keyword?: string;
  nama?: string;
  subject_code?: string;
}

export const usePagination = <T extends PaginationParams>(defaultParams: T) => {
  const router = useRouter();
  const [params, setParams] = useState<T>(defaultParams);
  const [keyword, setKeyword] = useState("");
  const [filterParams, setFilterParams] = useState<T>(defaultParams);

  useEffect(() => {
    const query = new URLSearchParams({
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
      ...(params.keyword && { keyword: params.keyword }),
      ...(params.nama && { nama: params.nama }),
      ...(params.subject_code && { subject_code: params.subject_code })
    }).toString();

    router.push(`/guru/list?${query}`, undefined, { shallow: true });
  }, [params, router]);

  const handleFilter = () => {
    setFilterParams({ ...params, page: 1 });
    setParams((prevParams) => ({ ...prevParams, page: 1 }));
  };

  const handleKeyword = (keyword: string) => {
    setFilterParams({ ...params, keyword, page: 1 });
    setParams((prevParams) => ({ ...prevParams, keyword, page: 1 }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClear = () => {
    setFilterParams(defaultParams);
    setParams(defaultParams);
  };

  const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setParams((prevParams) => ({ ...prevParams, pageSize: parseInt(e.target.value, 10), page: 1 }));
    setFilterParams((prevParams) => ({ ...prevParams, pageSize: parseInt(e.target.value, 10), page: 1 }));
  };

  const handlePage = (page: number) => {
    setParams((prevParams) => ({ ...prevParams, page }));
    setFilterParams((prevParams) => ({ ...prevParams, page }));
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
    handleKeyword,
  };
};
