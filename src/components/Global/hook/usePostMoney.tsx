import "firebase/firestore";
import { useMutation, UseMutationResult } from "react-query";

interface Amount {
  betMoney: any;
  userId: string;
}

export const usePostMoney = (): UseMutationResult<any, Error, Amount, unknown> => {
  const addMoneyMutation = useMutation(async (amount: Amount) => {
    try {
      const response = await fetch(
        `https://gobet-admin-dashboard-default-rtdb.firebaseio.com/userbalance/${amount.userId}.json`,
        {
          method: "POST",
          body: JSON.stringify({ betMoney: amount.betMoney }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post bet data");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  });

  return addMoneyMutation as UseMutationResult<any, Error, Amount, unknown>;
};
