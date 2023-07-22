import { useState } from "react";
import { useAddBet } from "./useAddBet";
import { useGet } from "./useGet";

export const useBetTableData = () => {
  const { data = {} } = useGet("predictbet");
  const { addBet } = useAddBet();
  const dataIds = Object.keys(data ?? {});
  const rows = dataIds.map(id => {
    const bet = data[id];
    bet.r_id = id;
    return bet;
  });
  const [showMessage, setShowMessage] = useState(false); // State to show/hide the message

  const handleOddButtonClick = (oddType: string, oddValue: string, teamPlace: string, rId: string) => {
    addBet(oddType, oddValue, teamPlace, rId);

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return { rows, showMessage, handleOddButtonClick };
};
