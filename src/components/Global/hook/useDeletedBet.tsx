import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IBet } from "../../../base";
import { usePost } from "./usePost";

export const useDeletedBet = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBetId, setSelectedBetId] = useState("");
  const [betData, setBetData] = useState<IBet[]>([]);
  const [delBet, setDelBet] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { del, isLoading, onSuccess, data } = usePost();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (onSuccess) {
      setLoading(false);
      setTimeout(() => {
        setShowMessage(false);
      }, 1000);
      setShowMessage(true); // Show the message when the user clicks the button
    }

    if (isLoading) {
      setLoading(isLoading);
      setShowMessage(false);
    }
  }, [onSuccess, isLoading]);

  const deleteBet = async (betId: string) => {
    try {
      await del(betId);
      setBetData(prevBetData => prevBetData.filter(bet => bet.id !== betId));
      setDelBet(`Deleted bet successfully`);
      queryClient.invalidateQueries("addedbet");
    } catch (error) {
      setDelBet(`Error: ${error}`);
    }
  };
  const handleDeleteBet = async (betId: string) => {
    setSelectedBetId(betId);
    setOpenModal(true);
  };

  const handleDeleteConfirmation = () => {
    deleteBet(selectedBetId);
    setOpenModal(false);
  };

  return {
    handleDeleteBet,
    handleDeleteConfirmation,
    openModal,
    setOpenModal,
    delBet,
    showMessage,
    setShowMessage,
    loading,
    onSuccess,
  };
};
