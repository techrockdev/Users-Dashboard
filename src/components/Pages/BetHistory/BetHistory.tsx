import { IUser, useUser } from "../../../base";
import { MaxCard } from "../../Global/Card/MaxCard/MaxCard";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";
import { Header } from "../../Layouts/Header/Header";
import { SideBar } from "../../Layouts/SideBar/SideBar";
import { BetNotification } from "./BetNotification";

export const BetHistory = () => {
  const { displayName } = useUser(state => (state.user as IUser) ?? {});
  return (
    <div className="flex h-[100vh] w-full  bg-primary font-inter tracking-wide">
      <SideBar />
      <div className="w-full overflow-y-scroll">
        <MaxCard>
          <Header routerName="Bet History" name={displayName ?? <LoadingModal />} />
        </MaxCard>
        <BetNotification />
      </div>
    </div>
  );
};
