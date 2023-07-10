import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "../../../../Global/Button/Button";
import { MaxCard } from "../../../../Global/Card/MaxCard/MaxCard";
import { useFetchedBets } from "../../../../Global/hook/useFetchedBets";
import { TableSkeleton } from "../../../../Global/TableSkeleton/TableSkeleton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const BetTableBody = () => {
  const { betData, isLoading, isSuccess } = useFetchedBets();

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!isSuccess) {
    return <div>Error fetching data</div>;
  }

  return (
    <MaxCard>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow className="bg-secondary">
              <StyledTableCell>Match</StyledTableCell>
              <StyledTableCell align="right">1</StyledTableCell>
              <StyledTableCell align="right">X</StyledTableCell>
              <StyledTableCell align="right">2</StyledTableCell>
              <StyledTableCell align="right">Stadium</StyledTableCell>
              <StyledTableCell align="right">Place bet</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.team1} vs {row.team2}
                </StyledTableCell>
                <StyledTableCell align="right">{row.odd1}</StyledTableCell>
                <StyledTableCell align="right">{row.oddx}</StyledTableCell>
                <StyledTableCell align="right">{row.odd2}</StyledTableCell>
                <StyledTableCell align="right">{row.stadium}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button>Bet</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MaxCard>
  );
};
