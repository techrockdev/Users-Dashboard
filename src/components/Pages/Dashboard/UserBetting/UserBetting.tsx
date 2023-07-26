import React from "react";
import { Card } from "../../../Global/Card/Card";
import { MaxCard } from "../../../Global/Card/MaxCard/MaxCard";
import { AddToFavourite } from "./AddToFavourite";

export const UserBetting: React.FC = () => {
  return (
    <div className="mt-3 flex flex-col space-y-4">
      <Card>
        <h1 className="p-4 text-2xl font-bold">Favourites</h1>
        <MaxCard>
          <AddToFavourite />
        </MaxCard>
      </Card>
    </div>
  );
};
