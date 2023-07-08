import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignUpFormInput, User } from "../../../base";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { AlertError } from "../../Global/Alert/Alert";
import { Card } from "../../Global/Card/Card";
import { MaxCard } from "../../Global/Card/MaxCard/MaxCard";
import { LoadingModal } from "../../Global/LoadingModal/LoadingModal";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<SignUpFormInput> = async data => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userId = userCredential.user.uid;
      const user: User = {
        id: userId,
        name: data.name,
        email: userCredential.user.email || "",
        password: "",
      };
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: data.name });
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
      }
    } catch (error: any) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-secondary">
      <MaxCard>
        <Card className="m-auto sm:w-[100%] md:w-[50%]">
          <h1 className="text-center text-xl font-bold">SignUp</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="font-bold">Enter Username:</label>
            <input {...register("name")} className="w-full rounded-lg border-b-2 border-b-[#ebebeb] p-2 outline-none" />
            <label className="mt-4 font-bold">Enter Email:</label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border-b-2 border-b-[#ebebeb] p-2 outline-none"
            />
            <label className="mt-4 font-bold">Enter Password:</label>
            <input
              {...register("password")}
              type="password"
              className="w-full rounded-lg border-b-2 border-b-[#ebebeb] p-2 outline-none"
            />
            {isError && <AlertError>{isError}</AlertError>}
            {isLoading ? <LoadingModal /> : ""}
            <input
              type="submit"
              className={`${
                isLoading ? "cursor-wait" : "cursor-pointer"
              } mt-4 cursor-pointer rounded-lg bg-secondary p-2 font-bold text-white outline-none`}
              value={isLoading ? "Signing up..." : "Sign Up"}
            />
            <div className="mt-4 flex space-x-3 italic">
              <h1 className="font-bold ">Already have an account?</h1>
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </div>
          </form>
        </Card>
      </MaxCard>
    </div>
  );
};
