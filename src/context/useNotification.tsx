import { createContext, useContext, ReactNode } from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

interface NotificationContextProps {
  api: NotificationInstance;
  contextHolder: ReactNode;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

type IProps = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: IProps) => {
  const [api, contextHolder] = notification.useNotification();

  const value: NotificationContextProps = {
    api,
    contextHolder,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
