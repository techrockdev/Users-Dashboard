import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface WarningProps {
  onAgree: () => void;
  onDisagree: () => void;
}

export const Warning: React.FC<WarningProps> = ({ onAgree, onDisagree }) => {
  return (
    <Dialog open={true} onClose={onDisagree}>
      <DialogTitle>Logout Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to log out?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree}>Cancel</Button>
        <Button onClick={onAgree}>Logout</Button>
      </DialogActions>
    </Dialog>
  );
};
