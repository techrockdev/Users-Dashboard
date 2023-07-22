import { createContext, ReactNode, useState } from "react";

interface INotification {
  notificationCount: number;
  incrementNotification: () => void;
  resetNotification: () => void;
  updateNotificationCount: (count: number) => void;
}

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationContext = createContext<INotification>({} as INotification);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const incrementNotification = () => {
    setNotificationCount(prevCount => prevCount + 1);
  };

  const resetNotification = () => {
    setNotificationCount(0);
  };

  const updateNotificationCount = (count: number) => {
    setNotificationCount(count);
  };

  const contextValue: INotification = {
    notificationCount,
    incrementNotification,
    resetNotification,
    updateNotificationCount,
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};
