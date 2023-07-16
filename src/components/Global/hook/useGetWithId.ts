import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { API } from "../../../base/constant/constant";
import { uid } from "../../../base/stores/stores";

const fetchData = async <TData>(url: string): Promise<AxiosResponse<TData>> => {
  return axios.get(`${API}/${url}/${uid.id}.json`);
};

export const useGetWithId = <TData = unknown, TError = unknown>(
  url: string,
  options?: UseQueryOptions<AxiosResponse<TData>, TError>
) => {
  const { data, error, isLoading, isSuccess } = useQuery<AxiosResponse<TData>, TError>(
    url,
    () => fetchData<TData>(url),
    options
  );

  return { data, error, isLoading, isSuccess };
};
