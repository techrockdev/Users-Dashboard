// UserDetail.tsx
import React from "react";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Profile } from "../../../Global/Profile/Profile";

interface NameProps {
  name: string | JSX.Element;
}

export const UserDetail: React.FC<NameProps> = ({ name }) => {
  return (
    <div className="flex items-center space-x-5">
      <Link to="/transaction-history">
        <FiBell className="text-2xl" />
      </Link>
      <Profile name={name} />
    </div>
  );
};
