import { useEffect, useState } from "react";
import { usePostMoney } from "./usePostMoney";

type UserBalanceData = {
  [key: string]: { betMoney: number };
};

export const useFetchBalance = (userId: string) => {
  const [balance, setBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { mutateAsync: addMoneyMutation } = usePostMoney();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `https://gobet-admin-dashboard-default-rtdb.firebaseio.com/userbalance/${userId}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch balance data");
        }

        const data = (await response.json()) as UserBalanceData;

        for (const key in data) {
          const newBalance = data[key].betMoney | 0;
          setBalance(newBalance);
        }
      } catch (error) {
        setNotification("Failed to fetch balance.");
      }
    };

    fetchBalance();
  }, [userId]);

  const handleAddMoney = async () => {
    try {
      await addMoneyMutation({ userId, betMoney: inputAmount });

      setBalance(prevBalance => prevBalance + inputAmount);
      setNotification(`Added ₦${inputAmount} to your balance.`);
    } catch (error) {
      setNotification("Failed to add money.");
    }

    setInputAmount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(parseInt(e.target.value, 10));
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible(prevVisibility => !prevVisibility);
  };

  const handleOpenModal = () => {
    setShowConfirmation(true);
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
  };

  const handleConfirmModal = () => {
    handleAddMoney();
    handleCloseModal();
  };

  return {
    balanceVisible,
    balance,
    toggleBalanceVisibility,
    handleOpenModal,
    showConfirmation,
    handleCloseModal,
    handleConfirmModal,
    inputAmount,
    handleInputChange,
    notification,
  };
};
