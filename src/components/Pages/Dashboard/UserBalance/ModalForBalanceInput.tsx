import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { AiOutlineClose } from "react-icons/ai";
import { ModalForm } from "./ModalForm";

export const ModalForBalanceInput = ({ onClose }: { onClose: any }) => {
  return (
    <Box
      sx={{
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "6px",
            boxShadow: theme => theme.shadows[5],
            p: 4,
          }}
        >
          <div className="flex justify-end">
            <AiOutlineClose className="cursor-pointer" size={24} onClick={onClose} />
          </div>

          <Typography
            id="server-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "900", paddingBottom: "12px" }}
          >
            Add Money
          </Typography>

          <ModalForm />
        </Box>
      </Modal>
    </Box>
  );
};
