import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { API } from "../../../base/constant/constant";
import { uid } from "../../../base/stores/stores";

export const usePost = () => {
  const [data, setData] = useState<AxiosResponse<unknown, any> | undefined>(undefined);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);

  const post = async (url: string, payload: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/${url}/${uid.id}.json`, payload);
      setData(response);
      setOnSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const del = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${API}/addedbet/${uid}/${id}`);
      setData(response);
      setOnSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, onSuccess, post, del };
};
