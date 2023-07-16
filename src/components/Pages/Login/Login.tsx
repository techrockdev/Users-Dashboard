import { Link } from "react-router-dom";
import { AlertError } from "../../Global/Alert/Alert";
import { Card } from "../../Global/Card/Card";
import { useLogin } from "../../Global/hook/useLogin";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";

export const Login: React.FC = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register, message } = useLogin();
  return (
    <div className="flex h-full w-full items-center justify-center bg-secondary">
      <Card className="m-auto sm:w-[100%] md:w-[50%]">
        <h1 className="text-center text-xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="font-bold">Enter Email:</label>
          <input
            {...register("email", { required: true })}
            className="w-full rounded-lg border-b-2 border-b-[#ebebeb] p-2 outline-none"
          />
          {errors.email && <AlertError>Please enter your email</AlertError>}
          {isLoading && <LoadingModal />}
          <label className="mt-4 font-bold">Enter Password:</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="w-full rounded-lg border-b-2 border-b-[#ebebeb] p-2 outline-none"
          />
          {errors.password && <AlertError>Please enter your password</AlertError>}
          {message && <AlertError>{message}</AlertError>}
          <input
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "cursor-wait" : "cursor-pointer"
            } mt-4 cursor-pointer rounded-lg bg-secondary p-2 font-bold text-white outline-none`}
            value={isLoading ? "Loading..." : "Log In"}
          />
          <div className="mt-4 flex space-x-3 italic">
            <h1 className="font-bold">Dont have an account?</h1>
            <Link to="/signup" className="text-secondary">
              Sign Up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
