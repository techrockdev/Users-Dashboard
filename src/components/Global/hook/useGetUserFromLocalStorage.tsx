import { Navigate } from "react-router-dom";

export const useGetUserFromLocalStorage = () => {
  const userDetail: any = window.localStorage.getItem("user");
  const user = JSON.parse(userDetail);
  if (user) {
    return user;
  }
  if (!user) {
    <Navigate to="/login" />;
  }

  return user;
};
