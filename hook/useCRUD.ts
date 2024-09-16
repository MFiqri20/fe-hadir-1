import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAuthAxios";
import { useToast } from "./useToast";
import Swal from "sweetalert2";
import { usePagination } from "./usePagination";
// import toast, { Toaster } from 'react-hot-toast';
export interface PaginationParams {
  page: number;
  pageSize: number;
  [key: string]: any;
}

const defaultParams: PaginationParams = {
  page: 1,
  pageSize: 10,
};

const useCrudModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const getDetail = async <T>(url: string): Promise<T> => {
    return axiosAuthClient.get(url).then((res) => res.data.data);
  };

  const updateResource = async <T>(
    url: string,
    id: string,
    payload: T
  ): Promise<any> => {
    return axiosAuthClient.put(`${url}/${id}`, payload).then((res) => res.data);
  };

  const getList = async <T>(url: string): Promise<T> => {
    return axiosAuthClient.get(url).then((res) => res.data);
  };

  const getListPagination = async <T>(
    url: string,
    params: PaginationParams
  ): Promise<T> => {
    return axiosAuthClient.get(url, { params }).then((res) => res.data);
  };

  const useList = <T>(url: string, staleTime?: number) => {
    const { data, isFetching, isLoading } = useQuery<T>(
      [url],
      () => getList<T>(url),
      {
        keepPreviousData: true,

        staleTime: staleTime,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };
  const useListPagination = <T>(
    url: string,
    defaultParams: PaginationParams,
    staleTime?: number
  ) => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
      handleKeyword,
      handleSearch,
      keyword,
      handleRole,
      handleChange,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading } = useQuery(
      [url, [filterParams]],
      () => getListPagination<T>(url, filterParams),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: staleTime,
      }
    );

    console.log(url, filterParams);
    console.log(data);

    return {
      data,
      handleRole,
      handleKeyword,
      handleSearch,
      keyword,
      isFetching,
      handleChange,
      isLoading,
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    };
  };

  const useCreate = <T>(url: string, urlInvalidate?: string) => {
    const { mutate, isLoading, data } = useMutation(
      (payload: T) => axiosAuthClient.post(url, payload),
      {
        onSuccess: (response) => {
          console.log("data", data);
          toastSuccess(response.data.message);
          queryClient.invalidateQueries([urlInvalidate]); // Optionally, invalidate queries to refetch data
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message);
        },
      }
    );

    return { mutate, isLoading };
  };

  const useDetail = <T>(url: string, id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      [url, id],
      () => getDetail<T>(`${url}/${id}`),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const useDelete = (url: string, urlList?: string) => {
    const { mutate, isLoading } = useMutation(
      (id: number) => axiosAuthClient.delete(`${url}/${id}`),
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries([urlList]);
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastWarning(error);
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  const useCreateBulk = <T>(url: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: T) => axiosAuthClient.post(url, payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries([url]);
        },
        onError: (error) => {
          toastError();
          console.log("errorrroroorororor", error);
        },
      }
    );
    return { mutate, isLoading };
  };

  const useUpdate = <T>(url: string, id: string) => {
    const axiosAuthClient = useAxiosAuth();
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToast();

    const { mutate, isLoading } = useMutation(
      (payload: T) => updateResource<T>(url, id, payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries([url]); // Optionally, invalidate queries to refetch data
        },
        onError: () => {
          toastError();
        },
      }
    );

    return { mutate, isLoading };
  };

  return {
    useList,
    useCreate,
    useListPagination,
    useDetail,
    useDelete,
    useUpdate,
    useCreateBulk,
  };
};
export default useCrudModule;
