import Table from "@mui/material/Table";
import { Card } from "../../../Global/Card/Card";
import { TextWrap } from "../../../Global/TextWrap/TextWrap";
import { BetTableBody } from "./BetTableData/BetTableBody";

export function BetManagement() {
  return (
    <Card className="p-0 py-2">
      <TextWrap className="text-sm capitalize ">football matches</TextWrap>
      <Table aria-label="collapsible table" className="mt-5">
        <BetTableBody />
      </Table>
    </Card>
  );
}
