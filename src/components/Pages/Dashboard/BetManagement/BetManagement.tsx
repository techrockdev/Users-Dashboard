import { Card } from "../../../Global/Card/Card";
import { TextWrap } from "../../../Global/TextWrap/TextWrap";
import { BetTableBody } from "./BetTableData/BetTableBody";

export const BetManagement = () => {
  return (
    <div>
      <Card className="p-0 py-2 ">
        <TextWrap className="text-sm capitalize">football matches</TextWrap>
        <BetTableBody />
      </Card>
    </div>
  );
};
