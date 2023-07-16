import { createContext, useState } from "react";

export type BalanceContextType = {
  balance: number;
  updateBalance: any;
};

type BalanceContextProviderType = {
  children: React.ReactNode;
};

export const BalanceContext = createContext<BalanceContextType>({} as BalanceContextType);

export const BalanceContextProvider = ({ children }: BalanceContextProviderType) => {
  const [balance, updateBalance] = useState<number>(0);

  return <BalanceContext.Provider value={{ balance, updateBalance }}>{children}</BalanceContext.Provider>;
};
