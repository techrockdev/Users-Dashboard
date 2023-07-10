import { ReactNode } from "react";
import { MobileSideBar } from "../SideBar/Mobile/MobileSideBar";
import { RouterName } from "./RouterName";
type HeaderType = React.ComponentProps<"input"> & { routerName: ReactNode; name: string | JSX.Element };

export const Header = ({ routerName, name, ...props }: HeaderType) => {
  return (
    <div className="relative min-w-[300px]">
      <div className="fixed left-0  top-0 z-40 flex w-full items-center justify-between bg-white px-3 lg:relative lg:bg-transparent">
        <MobileSideBar />
        <RouterName name={name} routerName={routerName} />
      </div>
    </div>
  );
};
