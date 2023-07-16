import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "../../../../Global/Button/Button";
import { useAddBet } from "../../../../Global/hook/useAddBet";
import { useGet } from "../../../../Global/hook/useGet";
import { TableSkeleton } from "../../../../Global/TableSkeleton/TableSkeleton";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
  const { addBet } = useAddBet();

  if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <TableSkeleton />
      </TableContainer>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = data ? Object.values(data) : [];

  const handleOddButtonClick = (oddType: string, oddValue: string, teamPlace: string) => {
    addBet(oddType, oddValue, teamPlace);
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
          {rows &&
            rows.map((row: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.team1} vs {row.team2}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    className="w-20  hover:bg-red-500"
                    onClick={() => handleOddButtonClick("home", row.odd1, row.team1)}
                  >
                    {row.odd1}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    className="w-20  hover:bg-red-500"
                    onClick={() => handleOddButtonClick("draw", row.oddx, `${row.team1} vs ${row.team2}`)}
                  >
                    {row.oddx}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    className="w-20  hover:bg-red-500"
                    onClick={() => handleOddButtonClick("away", row.odd2, row.team2)}
                  >
                    {row.odd2}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
