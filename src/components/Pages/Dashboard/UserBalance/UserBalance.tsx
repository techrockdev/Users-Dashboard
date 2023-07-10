import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { AlertError } from "../../../Global/Alert/Alert";
import { Card } from "../../../Global/Card/Card";
import { MaxCard } from "../../../Global/Card/MaxCard/MaxCard";
import { useFetchBalance } from "../../../Global/hook/useFetchBalance";
import { InputModal } from "../../../Global/InputModal/InputModal";
import { UserBalanceProps } from "./module.interface";

export const UserBalance: React.FC<UserBalanceProps> = ({ userId }) => {
  const {
    balance,
    balanceVisible,
    handleCloseModal,
    handleConfirmModal,
    handleInputChange,
    handleOpenModal,
    inputAmount,
    notification,
    showConfirmation,
    toggleBalanceVisibility,
  } = useFetchBalance(userId);

  return (
    <MaxCard>
      <Card className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 flex items-center">
          <h1 className="mr-4 text-3xl font-bold"> ₦ {balanceVisible ? balance + ".00" : "**"}</h1>
          <AiFillEye className="cursor-pointer text-gray-500" size={24} onClick={toggleBalanceVisibility} />
        </div>

        <div className="flex w-full items-center justify-center space-x-4 font-bold">
          <div>
            <div
              className="m-auto flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-secondary"
              onClick={handleOpenModal}
            >
              <AiOutlinePlus className=" text-2xl text-white" />
            </div>
            <h4>Add Money</h4>
          </div>
        </div>
      </Card>

      <InputModal
        open={showConfirmation}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
        inputAmount={inputAmount}
        handleInputChange={handleInputChange}
      />

      {notification ? <AlertError className="mt-5">{notification}</AlertError> : ""}
    </MaxCard>
  );
};
