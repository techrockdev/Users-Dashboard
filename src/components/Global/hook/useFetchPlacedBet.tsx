import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IBet } from "../../../base";
import { useGetWithId } from "./useGetWithId";

export const useFetchPlacedBet = () => {
  const [betData, setBetData] = useState<IBet[]>([]);
  const { data, isLoading } = useGetWithId<{ [key: string]: IBet }>("addedbet");
  const queryClient = useQueryClient();

  const rows: any = data?.data;
  const loadedTransactions: any = [];
  useEffect(() => {
    for (const key in rows) {
      loadedTransactions.push({
        id: key,
        oddType: rows[key].oddType,
        oddValue: rows[key].oddValue,
        teamPlace: rows[key].teamPlace,
        rId: rows[key].rId,
      });
    }
    setBetData(loadedTransactions);
    queryClient.invalidateQueries("addedbet");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { betData, isLoading };
};
