import React, { createContext, useEffect, useReducer } from "react";
import { User } from "../../base";
import { AuthAction, AuthReducer } from "./AuthReducer";

interface AuthState {
  currentUser: User | null;
  dispatch: React.Dispatch<AuthAction>;
}

const userString = localStorage.getItem("user");
const initialUser = userString ? JSON.parse(userString) : null;

const INITIAL_STATE: AuthState = {
  currentUser: initialUser,
  dispatch: () => {},
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>{children}</AuthContext.Provider>;
};
