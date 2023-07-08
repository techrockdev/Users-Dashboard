import { Alert } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

interface AlertProps {
  children: ReactNode;
}

export const AlertSuccess: React.FC<AlertProps> = ({ children }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showAlert) {
    return null;
  }

  return (
    <div>
      <Alert severity="success">{children}</Alert>
    </div>
  );
};
