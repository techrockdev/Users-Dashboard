import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "../../../../Global/Button/Button";
import { useBetTableData } from "../../../../Global/hook/useBetTableData";
import { useFetchPlacedBet } from "../../../../Global/hook/useFetchPlacedBet";
import { useGet } from "../../../../Global/hook/useGet";
import { Message } from "../../../../Global/Message/Message";
import { TableSkeleton } from "../../../../Global/TableSkeleton/TableSkeleton";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTablebetdata = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const BetTableBody = () => {
  const { data, isLoading, error } = useGet("predictbet");
  const { handleOddButtonClick, rows, showMessage } = useBetTableData();
  const { betData: placedBets = [] } = useFetchPlacedBet();

  const isAddedToBet = (rId: string, oddType: string) => {
    return placedBets.some(bet => bet.rId === rId && bet.oddType === oddType);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="customized table">
        <TableHead className="bg-secondary">
          <TableRow>
            <StyledTableCell>Matches</StyledTableCell>
            <StyledTableCell align="right">1</StyledTableCell>
            <StyledTableCell align="right">X</StyledTableCell>
            <StyledTableCell align="right">2</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((betdata: any) => (
            <StyledTablebetdata key={betdata.id}>
              <StyledTableCell component="th" scope="betdata">
                {betdata.team1} vs {betdata.team2}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  className={`w-20 ${isAddedToBet(betdata.r_id, "home") ? " bg-red-500" : ""}`}
                  onClick={() => handleOddButtonClick("home", betdata.odd1, betdata.team1, betdata.r_id)}
                  disabled={isAddedToBet(betdata.r_id, "home")}
                >
                  {betdata.odd1}
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  className={`w-20 ${isAddedToBet(betdata.r_id, "draw") ? " bg-red-500" : ""}`}
                  onClick={() =>
                    handleOddButtonClick("draw", betdata.oddx, `${betdata.team1} vs ${betdata.team2}`, betdata.r_id)
                  }
                  disabled={isAddedToBet(betdata.r_id, "draw")}
                >
                  {betdata.oddx}
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  className={`w-20 ${isAddedToBet(betdata.r_id, "away") ? " bg-red-500" : ""}`}
                  onClick={() => handleOddButtonClick("away", betdata.odd2, betdata.team2, betdata.r_id)}
                  disabled={isAddedToBet(betdata.r_id, "away")}
                >
                  {betdata.odd2}
                </Button>
              </StyledTableCell>
            </StyledTablebetdata>
          ))}
        </TableBody>
      </Table>
      {isLoading && (
        <TableContainer component={Paper}>
          <TableSkeleton />
        </TableContainer>
      )}
      {error && <p>{`Error: ${error.message}`}</p>}
      {showMessage && (
        <Message className="rounded-xl bg-secondary p-4 text-white" message="Bet Added To Your Favourite" />
      )}
    </TableContainer>
  );
};
