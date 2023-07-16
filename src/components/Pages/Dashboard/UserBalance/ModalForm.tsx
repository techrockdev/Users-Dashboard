import { useForm } from "react-hook-form";
import { AlertError } from "../../../Global/Alert/Alert";
import { useUpdateBalance } from "../../../Global/hook/useUpdatBalance";

export const ModalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleUpdateBalance, isLoading } = useUpdateBalance();

  return (
    <form onSubmit={handleSubmit(handleUpdateBalance)} className="space-y-6 ">
      <div>
        <label htmlFor="cardNumber" className="text-gray-700">
          Card Number:
        </label>
        <div className={`flex cursor-pointer items-center border-b-2 border-b-[#ebebeb] p-1 py-0`}>
          <input
            {...register("cardNumber", { required: true })}
            type="number"
            id="cardNumber"
            name="cardNumber"
            placeholder="Enter your card number"
            className="w-full rounded-lg border-none p-2 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
      {errors.cardNumber && <AlertError>Please enter your cardNumber</AlertError>}

      <div>
        <label htmlFor="atmPin" className="text-gray-700">
          ATM PIN:
        </label>
        <div className={`flex cursor-pointer items-center border-b-2 border-b-[#ebebeb] p-1 py-0`}>
          <input
            {...register("atmPin", { required: true })}
            type="password"
            id="atmPin"
            name="atmPin"
            placeholder="Enter your ATM PIN"
            maxLength={4}
            className="w-full rounded-lg border-none p-2 outline-none "
          />
        </div>
      </div>
      {errors.atmPin && <AlertError>Please enter your atm pin</AlertError>}
      <div>
        <label htmlFor="amount" className="text-gray-700">
          Amount
        </label>
        <div className={`flex cursor-pointer items-center border-b-2 border-b-[#ebebeb] p-1 py-0`}>
          <input
            {...register("amount", { required: true })}
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter the amount to add"
            className="w-full rounded-lg border-none p-2 outline-none "
          />
        </div>
      </div>
      {errors.amount && <AlertError>Please enter your amount</AlertError>}
      <input
        type="submit"
        value={`${isLoading ? "loading..." : "Submit"}`}
        className={`${
          isLoading ? "cursor-wait" : "cursor-pointer"
        } w-full cursor-pointer rounded border-none  bg-accent p-2 font-bold text-white outline-none`}
      />
    </form>
  );
};
