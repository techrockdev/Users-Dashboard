import { Alert } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export const AlertError: React.FC<AlertProps> = ({ children, className }) => {
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
    <div className={className}>
      <Alert severity="error">{children}</Alert>
    </div>
  );
};
