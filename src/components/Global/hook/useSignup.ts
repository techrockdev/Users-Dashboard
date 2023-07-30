import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignUpFormInput, User } from "../../../base";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
export const useSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>();
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

        // Add user details to the Realtime Database
        await fetch("https://gobet-admin-dashboard-default-rtdb.firebaseio.com/users.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            displayName: user.name,
            userid: user.id,
          }),
        });
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error: any) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  return { handleSubmit, onSubmit, register, isError, isLoading };
};
