import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { BalanceContext } from "../../context/Balancecontext/BalanceContext";
import { usePost } from "./usePost";

export const useBettingHistoryLogic = () => {
  const [showInput, setShowInput] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [playButtonText, setPlayButtonText] = useState("Play");
  const [betBetAmoutInput, setBetAmountInput] = useState<number>();
  const [newBalance, setNewBalance] = useState(0);
  const [error, setError] = useState(false);
  const [showMessageNotifaction, setShowMessageNotifaction] = useState(false); // State to show/hide the message
  const balanceContext = useContext(BalanceContext);
  const queryClient = useQueryClient();
  const { post, isLoading, onSuccess } = usePost();
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
    if (Number(betBetAmoutInput) > balanceContext.balance || !Number(betBetAmoutInput)) {
      setError(true); // Show the message when the user clicks the button
      setTimeout(() => {
        setError(false);
      }, 1000);
      queryClient.invalidateQueries("userbalance");
      return;
    }
    setPaymentSuccess(true);

    setNewBalance(newBalance);
    await post("userbalance", { amount: newBalance });
    await post("placedbetamount", {
      amountPlacedOnBet: Number(betBetAmoutInput),
      teamPlace: selectedBet,
    });
    await post("bettinghistory", {
      deposit: `You Just placed a bet of $${Number(
        betBetAmoutInput
      ).toLocaleString()} at ${date}. and your balance now is $${newBalance.toLocaleString()}`,
    });

    setShowMessageNotifaction(true); // Show the message when the user clicks the button
    setTimeout(() => {
      setShowMessageNotifaction(false);
    }, 1000);
    queryClient.invalidateQueries("userbalance");
  };

  const handleCancelPlay = () => {
    setShowInput(false);
    setSelectedBet(null);
    setPlayButtonText("Play");
  };

  return {
    handlePlayClick,
    handleBetAmout,
    handleCancelPlay,
    showInput,
    hanldePaymentForBet,
    error,
    showMessageNotifaction,
    betBetAmoutInput,
    isLoading,
    onSuccess,
    paymentSuccess,
    setShowMessageNotifaction,
  };
};
