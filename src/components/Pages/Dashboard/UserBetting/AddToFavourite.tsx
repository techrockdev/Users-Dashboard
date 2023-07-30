import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { IBet } from "../../../../base";
import { BalanceContext } from "../../../context/Balancecontext/BalanceContext";
import { useBettingHistoryLogic } from "../../../Global/hook/useBettingHistoryLogic";
import { useDeletedBet } from "../../../Global/hook/useDeletedBet";
import { useFetchPlacedBet } from "../../../Global/hook/useFetchPlacedBet";
import { Input } from "../../../Global/Input/Input";
import { LoadingModal } from "../../../Global/LoadingModal/LoadingModal";
import { Message } from "../../../Global/Message/Message";
import { TableSkeleton } from "../../../Global/TableSkeleton/TableSkeleton";
import { Warning } from "../../../Global/Warning/Warning";

export const AddToFavourite = () => {
  const {
    handlePlayClick,
    handleBetAmout,
    handleCancelPlay,
    showInput,
    hanldePaymentForBet,
    error,
    showMessageNotifaction,
    setShowMessageNotifaction,
    betBetAmoutInput,
    isLoading: loading,
  } = useBettingHistoryLogic();

  const { handleDeleteBet, openModal, setOpenModal, showMessage, loading: load, deletedBetIds } = useDeletedBet();

  const { betData, isLoading } = useFetchPlacedBet();
  const balanceContext = useContext(BalanceContext);

  if (betData.length === 0 || betData.every((bet: any) => deletedBetIds.includes(bet.id))) {
    return (
      <div className="text-center">
        <p>Your betslip is empty. Please make one or more selections in order to place a bet.</p>
      </div>
    );
  }

  const handleDeleteBetAndPayment = async (betId: string) => {
    hanldePaymentForBet(betId);
    setShowMessageNotifaction(false);
  };

  return (
    <div>
      {betData.map((bet: IBet) => (
        <Accordion key={bet.id} className={deletedBetIds.includes(bet.id) ? "hidden" : ""}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>
              <h1>{bet.teamPlace}</h1>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="flex items-center justify-between">
              <h1>{bet.oddType}</h1>
              <Tooltip title="Delete bet" onClick={() => handleDeleteBet(bet.id)}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <h1 className="text-red-500">{bet.oddValue}</h1>
            </Typography>
            {showInput ? (
              <div className="mt-6 flex">
                <Input
                  type="number"
                  placeholder="input amount"
                  onChange={handleBetAmout}
                  className="w-full text-red-500 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <input
                  value={loading ? "Loading.." : "Pay"}
                  className={`${
                    loading ? "animate-pulse cursor-wait" : ""
                  } cursor-pointer rounded border-none bg-accent p-2 font-bold text-white outline-none`}
                  type="button"
                  onClick={() => handleDeleteBetAndPayment(bet.id)}
                />
              </div>
            ) : (
              ""
            )}

            {showInput ? (
              <input
                type="button"
                value={loading ? "Loading..." : "Cancel Play"}
                onClick={handleCancelPlay}
                className={`${
                  loading ? "animate-pulse cursor-wait" : ""
                } mt-4 w-full cursor-pointer rounded border-none bg-accent p-2 font-bold text-white outline-none`}
              />
            ) : (
              <input
                type="button"
                value={loading ? "loading..." : "Play"}
                onClick={() => handlePlayClick(bet)}
                className={`${
                  loading ? "animate-pulse cursor-wait" : ""
                } mt-4 w-full cursor-pointer rounded border-none bg-accent p-2 font-bold text-white outline-none`}
              />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      {openModal && (
        <Warning
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAgree={() => {
            setOpenModal(false); // Remove handleDeleteConfirmation call
          }}
          onDisagree={() => setOpenModal(false)}
        />
      )}
      {loading && <LoadingModal />}
      {isLoading && <TableSkeleton />}
      {error && <Message className="rounded-xl bg-red-500 p-4 text-white" message="Insufficient Fund" />}
      {showMessage && <Message className="rounded-xl bg-secondary p-4 text-white" message="Bet Deleted Successfully" />}
      {load && <LoadingModal />}
      {showMessageNotifaction && (
        <Message
          className="rounded-xl bg-secondary p-4 text-white"
          message={`Success Placed a bet with amount of $ ${betBetAmoutInput}`}
        />
      )}
    </div>
  );
};
