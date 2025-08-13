import axios, { AxiosError } from 'axios';
import { API_URL } from './config/general';

type ApiError = AxiosError<{ debugInfo: string; stack: string }>;
type GetData = Record<string, string | number>;
type PostData = Record<string, unknown>;
type PatchData = Record<string, unknown>;
type PutData = Record<string, unknown>;
type DeleteData = Record<string, unknown>;

const instance = axios.create({
  baseURL: API_URL,
});

function toUrlSearchParams(params?: Record<string, string | number>) {
  if (!params) return '';

  const searchParams = new URLSearchParams();
  for (const key in params) {
    searchParams.append(key, String(params[key]));
  }
  return `?${searchParams.toString()}`;
}

function handleError(error: ApiError) {
  const errorMessage = error.response?.data?.debugInfo || error.message;

  console.error(errorMessage);
}

const api = {
  async get<R, T extends GetData = GetData>(route: string, params?: T) {
    try {
      const { data } = await instance.get<R>(route + toUrlSearchParams(params));
      return data;
    } catch (error) {
      handleError(error as ApiError);
      throw error;
    }
  },
  async post<R, T extends PostData = PostData>(route: string, data: T) {
    try {
      const res = await instance.post<R>(route, data);
      return res.data;
    } catch (error) {
      handleError(error as ApiError);
      throw error;
    }
  },
  async patch<R, T extends PatchData = PatchData>(route: string, data: T) {
    try {
      const res = await instance.patch<R>(route, data);
      return res.data;
    } catch (error) {
      handleError(error as ApiError);
      throw error;
    }
  },
  async put<R, T extends PutData = PutData>(route: string, data: T) {
    try {
      const res = await instance.put<R>(route, data);
      return res.data;
    } catch (error) {
      handleError(error as ApiError);
      throw error;
    }
  },
  async delete<T extends DeleteData = DeleteData>(
    route: string,
    data: T | undefined = undefined
  ) {
    try {
      const res = await instance.delete(route, { data });
      return res.data;
    } catch (error) {
      handleError(error as ApiError);
      throw error;
    }
  },
};

export default api;
