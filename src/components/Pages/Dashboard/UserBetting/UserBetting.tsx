import React from "react";
import { Card } from "../../../Global/Card/Card";
import { MaxCard } from "../../../Global/Card/MaxCard/MaxCard";
import { BettingHistory } from "./BettingHistory";

export const UserBetting: React.FC = () => {
  return (
    <div className="mt-3 flex flex-col space-y-4">
      <Card>
        <MaxCard>
          <BettingHistory />
        </MaxCard>
      </Card>
    </div>
  );
};
