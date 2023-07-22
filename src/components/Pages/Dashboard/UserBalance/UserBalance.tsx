import { useContext } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlinePlus } from "react-icons/ai";
import { BalanceContext } from "../../../context/Balancecontext/BalanceContext";
import { Card } from "../../../Global/Card/Card";
import { MaxCard } from "../../../Global/Card/MaxCard/MaxCard";
import { useHandleBalance } from "../../../Global/hook/useHandleBalance";
import { ModalForBalanceInput } from "./ModalForBalanceInput";

export const UserBalance = () => {
  const balanceContext = useContext(BalanceContext);
  const { handleCloseModal, handleSuccess, handleToggleBalance, isModalOpen, handleAddMoney, isBalanceVisible } =
    useHandleBalance();

  return (
    <MaxCard>
      <Card className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 flex items-center">
          {isBalanceVisible ? (
            <h1 className="mr-4 text-3xl font-bold">$ {balanceContext.balance.toLocaleString()}.00</h1>
          ) : (
            <h1 className="mr-4 text-3xl font-bold">$ ***</h1>
          )}
          {isBalanceVisible ? (
            <AiFillEye className="cursor-pointer text-gray-500" size={24} onClick={handleToggleBalance} />
          ) : (
            <AiFillEyeInvisible className="cursor-pointer text-gray-500" size={24} onClick={handleToggleBalance} />
          )}
        </div>
        <div className="flex w-full items-center justify-center space-x-4 font-bold">
          <div>
            <div
              onClick={handleAddMoney}
              className="m-auto flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-secondary"
            >
              <AiOutlinePlus className="text-2xl text-white" />
            </div>
            <h4>Add Money</h4>
          </div>
        </div>
        {isModalOpen && <ModalForBalanceInput onClose={handleCloseModal} />}
      </Card>
    </MaxCard>
  );
};
