import { Modal } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type MessageProps = {
  className?: string;
  message: ReactNode;
};

export const Message = ({ className, message }: MessageProps) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Automatically hide the message after 1 second
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 1000);

    // Clear the timeout when the component is unmounted to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {showMessage && (
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          sx={{
            display: "flex",
            p: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={className}>{message}</div>
        </Modal>
      )}
    </div>
  );
};
