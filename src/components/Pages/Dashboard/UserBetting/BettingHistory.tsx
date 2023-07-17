import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip, Typography } from "@mui/material";
import { IBet } from "../../../../base";
import { AlertError } from "../../../Global/Alert/Alert";
import { Button } from "../../../Global/Button/Button";
import { useBettingHistoryLogic } from "../../../Global/hook/useBettingHistoryLogic";
import { useDeletedBet } from "../../../Global/hook/useDeletedBet";
import { useFetchPlacedBet } from "../../../Global/hook/useFetchPlacedBet";
import { Input } from "../../../Global/Input/Input";
import { TableSkeleton } from "../../../Global/TableSkeleton/TableSkeleton";
import { Warning } from "../../../Global/Warning/Warning";

export const BettingHistory = () => {
  const { handlePlayClick, handleBetAmout, handleCancelPlay, showInput, hanldePaymentForBet, error } =
    useBettingHistoryLogic();
  const { handleDeleteBet, handleDeleteConfirmation, openModal, setOpenModal, delBet } = useDeletedBet();
  const { betData, isLoading } = useFetchPlacedBet();

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (betData.length === 0) {
    return (
      <div className="text-center">
        <p>Your betslip is empty. Please make one or more selections in order to place a bet.</p>
      </div>
    );
  }
  return (
    <div>
      {betData.map((bet: IBet) => (
        <Accordion key={bet.id}>
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
                <Input type="text" placeholder="input amout" onChange={handleBetAmout} className="text-red-500" />
                <Button onClick={hanldePaymentForBet}>Pay</Button>
              </div>
            ) : (
              ""
            )}
            {error ? <AlertError>Insufficient Funds</AlertError> : false}
            {delBet ? <AlertError>{delBet}</AlertError> : false}
            {}
            {showInput ? (
              <Button className="mt-4 w-full" onClick={handleCancelPlay}>
                Cancel Play
              </Button>
            ) : (
              <Button className="mt-4 w-full" onClick={() => handlePlayClick(bet)}>
                Play
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      {openModal && (
        <Warning
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAgree={handleDeleteConfirmation}
          onDisagree={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};
