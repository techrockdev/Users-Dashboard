/* eslint-disable no-console */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { IBet } from "../../../../base";
import { AlertError } from "../../../Global/Alert/Alert";
import { Button } from "../../../Global/Button/Button";
import { useBettingHistoryLogic } from "../../../Global/hook/useBettingHistoryLogic";
import { useGetWithId } from "../../../Global/hook/useGetWithId";
import { Input } from "../../../Global/Input/Input";
import { TableSkeleton } from "../../../Global/TableSkeleton/TableSkeleton";

export const BettingHistory = () => {
  const { data, isLoading, isSuccess } = useGetWithId<{ [key: string]: IBet }>("addedbet");
  const { handlePlayClick, handleBetAmout, handleCancelPlay, showInput, hanldePaymentForBet, error } =
    useBettingHistoryLogic();

  const rows = data?.data ? Object.values(data.data) : [];

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (rows.length === 0) {
    return (
      <div className="text-center">
        <p>Your betslip is empty. Please make one or more selections in order to place a bet.</p>
      </div>
    );
  }

  return (
    <div>
      {rows.map((bet: IBet) => (
        <Accordion key={bet.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>
              <h1>{bet.teamPlace}</h1>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="flex items-center justify-between">
              <h1>{bet.oddType}</h1>
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
            {error ? <AlertError>Insuficient Funds</AlertError> : false}
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
    </div>
  );
};
