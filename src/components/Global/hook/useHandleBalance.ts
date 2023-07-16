import { useState } from "react";

export const useHandleBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMoney = () => {
    setIsModalOpen(true);
  };

  const handleToggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    handleCloseModal,
    handleAddMoney,
    handleToggleBalance,
    handleSuccess,
    isBalanceVisible,
  };
};
