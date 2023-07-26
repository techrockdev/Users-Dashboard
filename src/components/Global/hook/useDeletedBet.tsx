import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IBet, UseDeletedBetProps } from "../../../base";
import { usePost } from "./usePost";

const LOCAL_STORAGE_KEY = "addedbet";

export const useDeletedBet = (): UseDeletedBetProps => {
  const [openModal, setOpenModal] = useState(false);
  const [deletedBetIds, setDeletedBetIds] = useState<string[]>(() => {
    // Initialize the deletedBetIds state from local storage if available
    const storedDeletedBetIds = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedDeletedBetIds ? JSON.parse(storedDeletedBetIds) : [];
  });
  const [deletedBets, setDeletedBets] = useState<string[]>([]);
  // const [deletedBetIds, setDeletedBetIds] = useState<string[]>([]);
  const [betData, setBetData] = useState<IBet[]>([]);
  const [delBet, setDelBet] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { del, isLoading, onSuccess, data } = usePost();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Store the updated deletedBetIds in local storage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deletedBetIds));
  }, [deletedBetIds]);

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
    setDeletedBetIds(prevDeletedBetIds => [...prevDeletedBetIds, betId]);

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
    deleteBet(betId);
  };

  const handleLocalDeleteBet = (betId: string) => {
    // Perform local deletion by updating the deletedBetIds state
    setDeletedBetIds(prevDeletedBetIds => [...prevDeletedBetIds, betId]);
  };

  return {
    handleDeleteBet,
    openModal,
    setOpenModal,
    delBet,
    showMessage,
    setShowMessage,
    loading,
    onSuccess,
    handleLocalDeleteBet,
    deletedBetIds,
  };
};
