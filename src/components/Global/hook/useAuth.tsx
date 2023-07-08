import { useEffect } from "react";
import { IUser } from "../../../base/models/model.interface";
import { useUser } from "../../../base/models/useUser";
import { auth } from "../../../config/firebase";

export const useAuth = () => {
  const setUser = useUser(state => state.setUser);

  const authUser = useEffect(() => {
    auth.onAuthStateChanged((responseUser: any) => {
      if (responseUser) {
        const displayName = responseUser.displayName;
        const uid = responseUser.uid;
        const reloadUserInfo = responseUser.reloadUserInfo;

        const user: IUser = {
          uid,
          displayName,
          email: reloadUserInfo.email,
          createdAt: reloadUserInfo.createdAt,
          emailVerified: reloadUserInfo.emailVerified,
          lastLoginAt: reloadUserInfo.lastLoginAt,
          lastRefreshAt: reloadUserInfo.lastRefreshAt,
          photoUrl: reloadUserInfo.photoUrl,
        };

        setUser(user);
      }
    });
  });

  return { authUser };
};
