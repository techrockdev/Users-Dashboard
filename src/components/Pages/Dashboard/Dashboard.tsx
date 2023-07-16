import { useContext, useEffect } from "react";
import { IUser, useUser } from "../../../base";
import { BalanceContext } from "../../context/Balancecontext/BalanceContext";
import { MaxCard } from "../../Global/Card/MaxCard/MaxCard";
import { useGetWithId } from "../../Global/hook/useGetWithId";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";
import { Header } from "../../Layouts/Header/Header";
import { SideBar } from "../../Layouts/SideBar/SideBar";
import { BetManagement } from "./BetManagement/BetManagement";
import { UserBalance } from "./UserBalance/UserBalance";
import { UserBetting } from "./UserBetting/UserBetting";

export const Dashboard: React.FC = () => {
  const { displayName } = useUser<IUser>(state => (state.user as IUser) ?? {});
  const { data, isLoading } = useGetWithId<any>("userbalance");
  const balanceContext = useContext(BalanceContext);

  useEffect(() => {
    if (data && data.data) {
      const balanceArr = Object.keys(data.data);
      if (balanceArr.length > 0) {
        const objectKey = balanceArr.slice(-1)[0];
        const previousBalance = data.data[objectKey].amount;
        balanceContext.updateBalance(previousBalance);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex h-[100vh] w-full bg-primary font-inter tracking-wide">
      <SideBar />
      <div className="w-full overflow-y-scroll">
        <MaxCard className="mt-20 w-full lg:mt-0">
          <Header routerName="Dashboard" name={displayName ?? <LoadingModal />} />
          <div className="flex w-full flex-wrap space-y-4 sm:px-0 md:px-3 lg:flex-nowrap lg:space-x-6 lg:space-y-0">
            <div className="w-full space-y-3">
              <UserBalance />
              <BetManagement />
            </div>
            <div className="w-full lg:w-1/2">
              <UserBetting />
            </div>
          </div>
        </MaxCard>
      </div>
    </div>
  );
};
