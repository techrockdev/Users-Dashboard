import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { LoadingData } from "../Svg/Loading";

export const LoadingModal = () => {
  const rootRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        zIndex: 1000,
        left: 0,
        top: 0,
        right: 0,
        transform: "translateZ(0)",
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
      ref={rootRef}
    >
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
        container={() => rootRef.current}
      >
        <LoadingData />
      </Modal>
    </Box>
  );
};
