import { AiFillFolderOpen } from "react-icons/ai";
import { MdOutlineCreateNewFolder, MdOutlineDashboard } from "react-icons/md";

export const menus = [
  { name: "dasboard", link: "/dashboard", icon: MdOutlineDashboard },
  { name: "History", link: "/transaction-history", icon: MdOutlineCreateNewFolder, margin: true },
  { name: "BetHistory", link: "/bet-history", icon: AiFillFolderOpen, margin: true },
];
