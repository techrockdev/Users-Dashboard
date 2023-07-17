import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { IBet } from "../../../base";
import { API } from "../../../base/constant/constant";
import { uid } from "../../../base/stores/stores";

export const useDeletedBet = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBetId, setSelectedBetId] = useState("");
  const [betData, setBetData] = useState<IBet[]>([]);
  const [delBet, setDelBet] = useState("");
  const queryClient = useQueryClient();

  const deleteBet = async (betId: string) => {
    try {
      await axios.delete(`${API}addedbet/${uid.id}/${betId}.json`);
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

  return { handleDeleteBet, handleDeleteConfirmation, openModal, setOpenModal, delBet };
};
