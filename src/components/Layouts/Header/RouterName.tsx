import { ReactNode } from "react";
import { UserDetail } from "./UserDetail/UserDetail";

type RouterNameType = React.ComponentProps<"input"> & { routerName: ReactNode; name: string | JSX.Element };

export const RouterName = ({ routerName, name, ...props }: RouterNameType) => {
  return (
    <div className="py-3 lg:w-full">
      <div className="m-auto flex max-w-7xl  items-center justify-between ">
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold">{routerName}</h1>
        </div>
        <div className="">
          <UserDetail name={name} />
        </div>
      </div>
    </div>
  );
};
