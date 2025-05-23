import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    status?: number;
    data?: unknown;
  };
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

const apiClient = axios.create({
  baseURL: "https://www.thesportsdb.com/api/v1/json/3/",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await request;
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: {
          message: axiosError.message,
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        },
      };
      return errorResponse;
    }

    return {
      success: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
    };
  }
};

const get = <T>(url: string, config?: AxiosRequestConfig) =>
  handleRequest<T>(apiClient.get(url, config));

const post = <T, D>(url: string, data?: D, config?: AxiosRequestConfig) =>
  handleRequest<T>(apiClient.post(url, data, config));

const put = <T, D>(url: string, data?: D, config?: AxiosRequestConfig) =>
  handleRequest<T>(apiClient.put(url, data, config));

const del = <T>(url: string, config?: AxiosRequestConfig) =>
  handleRequest<T>(apiClient.delete(url, config));

export { get, post, put, del };

export default apiClient;
