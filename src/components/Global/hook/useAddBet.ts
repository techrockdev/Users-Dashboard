import { useQueryClient } from "react-query";
import { usePost } from "./usePost";

export const useAddBet = () => {
  const { post } = usePost();
  const queryClient = useQueryClient();

  const addBet = async (oddType: string, oddValue: string, teamPlace: string) => {
    const payload = {
      oddType,
      oddValue,
      teamPlace,
    };

    try {
      await post("addedbet", payload);
      console.log("Bet added successfully!");
      queryClient.invalidateQueries("addedbet");
    } catch (error) {
      console.error("Error adding bet:", error);
    }
  };

  return { addBet };
};
