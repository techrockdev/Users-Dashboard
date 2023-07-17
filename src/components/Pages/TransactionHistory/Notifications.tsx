import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useGetWithId } from "../../Global/hook/useGetWithId";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";

export const Notifications = () => {
  const { data, isLoading, isSuccess } = useGetWithId("transactionHistory");
  const rows = data?.data ? Object.values(data.data) : [];

  if (isLoading) {
    return <LoadingModal />;
  }

  if (rows.length === 0) {
    return <h1 className="p-4 text-center text-xl ">No Transaction History. </h1>;
  }

  if (isSuccess) {
    return (
      <div className="sm:mt-20 md:mt-0">
        {rows.map((transaction: any) => (
          <Accordion key={transaction.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography sx={{ fontWeight: "900" }}>Deposit Transaction</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{transaction.deposit}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
  return <div>Error occurred while fetching data.</div>;
};
