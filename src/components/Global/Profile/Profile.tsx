/* eslint-disable @next/next/no-img-element */
import { ComponentProps, ReactNode } from "react";
import avatar from "../../../assets/image/avatar.png";
import { Image } from "../Image/Image";
import { ProfileDropDown } from "./ProfileDropDown";

type ProfileType = ComponentProps<"div"> & {
  icon?: ReactNode;
  name: string | JSX.Element;
};

export const Profile = ({ className, name, ...props }: ProfileType) => {
  return (
    <div className="flex space-x-2">
      <Image src={avatar} className={`h-[40px] w-[40px] rounded-full object-contain ${className}`} alt="profile" />
      <div className="flex items-center">
        <h4 className="text-sm text-black">{name}</h4>
        <ProfileDropDown />
      </div>
    </div>
  );
};
