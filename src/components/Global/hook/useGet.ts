import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { API } from "../../../base/constant/constant";

const fetchData = async (url: string): Promise<AxiosResponse<any>> => {
  return axios.get(`${API}/${url}.json`);
};

export const useGet = <TData = any, TError = any>(
  url: string,
  options?: UseQueryOptions<AxiosResponse<TData>, TError>
) => {
  const { data, error, isLoading } = useQuery<AxiosResponse<TData>, TError>(url, () => fetchData(url), options);

  return { data: data?.data, error, isLoading };
};
