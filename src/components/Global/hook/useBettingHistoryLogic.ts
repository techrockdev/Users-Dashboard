import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { BalanceContext } from "../../context/Balancecontext/BalanceContext";
import { usePost } from "./usePost";

export const useBettingHistoryLogic = () => {
  const [showInput, setShowInput] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const [playButtonText, setPlayButtonText] = useState("Play");
  const [betBetAmoutInput, setBetAmountInput] = useState<number>(0);
  const [newBalance, setNewBalance] = useState(0);
  const [error, setError] = useState(false);
  const balanceContext = useContext(BalanceContext);
  const queryClient = useQueryClient();
  const { post } = usePost();

  const date = `${new Date().getMinutes()}:${new Date().getSeconds()}`;

  const handlePlayClick = (bet: any) => {
    setShowInput(true);
    setSelectedBet(bet);
    setPlayButtonText("Cancel Play");
  };

  const handleBetAmout = (e: any) => {
    setBetAmountInput(e.target.value);
  };

  const hanldePaymentForBet = async () => {
    const newBalance = balanceContext.balance - Number(betBetAmoutInput);
    if (Number(betBetAmoutInput) > balanceContext.balance) {
      setError(true);
      return;
    }
    setNewBalance(newBalance);
    await post("userbalance", { amount: newBalance });
    // await post("placedbetamount", { amountPlacedOnBet: Number(betBetAmoutInput) });
    await post("placedbetamount", {
      amountPlacedOnBet: Number(betBetAmoutInput),
      teamPlace: selectedBet,
    });
    await post("transactionHistory", {
      deposit: `You Just placed a bet of ${Number(betBetAmoutInput)} at ${date}. and your balance now is ${newBalance}`,
    });
    queryClient.invalidateQueries("userbalance");
  };

  const handleCancelPlay = () => {
    setShowInput(false);
    setSelectedBet(null);
    setPlayButtonText("Play");
  };

  return { handlePlayClick, handleBetAmout, handleCancelPlay, showInput, hanldePaymentForBet, error };
};
