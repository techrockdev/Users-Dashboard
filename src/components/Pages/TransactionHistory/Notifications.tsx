import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useGetWithId } from "../../Global/hook/useGetWithId";
import { usePagination } from "../../Global/hook/usePagination";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";

export const Notifications = () => {
  const { data, isLoading, isSuccess } = useGetWithId("transactionHistory");
  const rows = data?.data ? Object.values(data.data) : [];

  // Pagination
  const { totalPages, currentPage, handleNextClick, handlePreviousClick, rowsPerPage, totalRows, offset } =
    usePagination();

  if (isLoading) {
    return <LoadingModal />;
  }

  if (rows.length === 0) {
    return <h1 className="p-4 text-center text-xl ">No Transaction History. </h1>;
  }

  if (isSuccess) {
    return (
      <div className="sm:mt-20 md:mt-0">
        {rows.slice(offset, offset + rowsPerPage).map((transaction: any) => (
          <Accordion key={transaction.id} defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography sx={{ fontWeight: "900" }}>Deposit Transaction</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{transaction.deposit}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-center">
          <button className="rounded bg-secondary p-1 text-white" onClick={handlePreviousClick} disabled={offset === 0}>
            <NavigateBeforeIcon />
          </button>
          <h1 className="p-4 font-bold">
            {currentPage} of {totalPages}
          </h1>
          <button
            className="rounded bg-secondary p-1 text-white"
            onClick={handleNextClick}
            disabled={offset + rowsPerPage >= totalRows}
          >
            <NavigateNextIcon />
          </button>
        </div>
      </div>
    );
  }
  return <div>Error occurred while fetching data.</div>;
};
