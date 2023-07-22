import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface WarningProps {
  open?: boolean;
  onClose?: () => void;
  onAgree: () => void;
  onDisagree: () => void;
}

export const Warning: React.FC<WarningProps> = ({ open, onClose, onAgree, onDisagree }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          zIndex: 1000,
          left: 0,
          top: 0,
          right: 0,
          p: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Dialog open={true} onClose={onClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <p className="text-xl">Are you sure?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDisagree}>Cancel</Button>
            <Button onClick={onAgree}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
