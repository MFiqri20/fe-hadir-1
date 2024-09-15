import axios, { AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosClientRefresh: AxiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pageSize: number;
    total_page: number;
    current_data: number;
  };
}

export interface BaseResponseSucess {
  status: string;
  message: string;
  data?: any;
}
