import { IUser, useUser } from "../../../base";
import { MaxCard } from "../../Global/Card/MaxCard/MaxCard";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";
import { Header } from "../../Layouts/Header/Header";
import { SideBar } from "../../Layouts/SideBar/SideBar";
import { BetManagement } from "./BetManagement/BetManagement";
import { UsersInfo } from "./UsersInfo/UsersInfo";
import { UserStatusCard } from "./UserStatusCard/UserStatusCard";

export const Dashboard = () => {
  const { displayName } = useUser<IUser>(state => (state.user as IUser) ?? {});
  return (
    <div className="flex h-[100vh] w-full  bg-primary font-inter tracking-wide">
      <SideBar />
      <div className="w-full overflow-y-scroll">
        <MaxCard className="mt-20 w-full lg:mt-0">
          <Header routerName="Dashboard" name={displayName ?? <LoadingModal />} />
          <div className="flex w-full flex-wrap space-y-4 px-3 lg:flex-nowrap lg:space-x-6 lg:space-y-0">
            <div className="w-full space-y-3">
              <UsersInfo />
              <BetManagement />
            </div>
            <div className="w-full lg:w-1/2">
              <UserStatusCard />
            </div>
          </div>
        </MaxCard>
      </div>
    </div>
  );
};
