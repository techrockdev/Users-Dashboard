/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ComponentProps, ReactNode } from "react";
import { ProfileDropDown } from "./ProfileDropDown";

type ProfileType = ComponentProps<"div"> & {
  icon?: ReactNode;
  name: string | JSX.Element;
};

export const Profile = ({ className, name, ...props }: ProfileType) => {
  const firstLetter = name?.toString().charAt(0).toUpperCase() || "";
  return (
    <div className="flex space-x-2">
      <Avatar sx={{ bgcolor: blue[500], width: "35px", height: "35px" }}>{firstLetter}</Avatar>
      <div className="flex items-center">
        <h4 className="text-sm text-black">{name}</h4>
        <ProfileDropDown />
      </div>
    </div>
  );
};
