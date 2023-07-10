import { IUser, useUser } from "../../../base";
import { MaxCard } from "../../Global/Card/MaxCard/MaxCard";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";
import { Header } from "../../Layouts/Header/Header";
import { SideBar } from "../../Layouts/SideBar/SideBar";

export const TransactionHistory: React.FC = () => {
  const { displayName } = useUser(state => (state.user as IUser) ?? {});

  return (
    <div className="flex h-[100vh] w-full  bg-primary font-inter tracking-wide">
      <SideBar />
      <div className="w-full overflow-y-scroll">
        <MaxCard>
          <Header routerName="Transaction History" name={displayName ?? <LoadingModal />} />
        </MaxCard>
      </div>
    </div>
  );
};
