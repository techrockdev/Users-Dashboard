import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { BalanceContext } from "../../context/Balancecontext/BalanceContext";
import { usePost } from "./usePost";

export const useUpdateBalance = () => {
  const [newBalance, setNewBalance] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { post, isLoading, data, onSuccess } = usePost();
  const queryClient = useQueryClient();
  const balanceContext = useContext(BalanceContext);
  const date = `${new Date().getMinutes()}:${new Date().getSeconds()}`;

  const handleUpdateBalance = async (formData: any) => {
    const newBalance = Number(formData.amount) + balanceContext.balance;

    setNewBalance(newBalance);
    await post("userbalance", { amount: newBalance });
    await post("transactionHistory", {
      deposit: `You Just Topup of $${Number(
        formData.amount
      ).toLocaleString()} in your account at ${date}. and your balance now is $${newBalance.toLocaleString()}`,
    });
    queryClient.invalidateQueries("addedbet");
  };

  useEffect(() => {
    if (data && onSuccess) {
      balanceContext.updateBalance(newBalance);
    }

    if (onSuccess) {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }

    if (isLoading) {
      setLoading(isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, newBalance, isLoading, onSuccess]);
  return { handleUpdateBalance, loading, newBalance, success };
};
