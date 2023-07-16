import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInput, User } from "../../../base";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
export const useLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const onSubmit: SubmitHandler<LoginFormInput> = async data => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user: User = {
        id: userCredential.user.uid,
        name: userCredential.user.displayName || "",
        email: userCredential.user.email || "",
        password: "",
      };

      dispatch({ type: "LOGIN", payload: user });
      navigate("/dashboard");
      window.location.reload();
    } catch (error: any) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return { handleSubmit, onSubmit, errors, isLoading, register, message };
};
