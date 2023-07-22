import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { Card } from "../Card/Card";
import { MaxCard } from "../Card/MaxCard/MaxCard";

interface WarningProps {
  open?: boolean;
  onClose?: () => void;
  onAgree: () => void;
  onDisagree: () => void;
}

export const Warning: React.FC<WarningProps> = ({ open, onClose, onAgree, onDisagree }) => {
  return (
    <MaxCard className="absolute">
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100",
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
      </Card>
    </MaxCard>
  );
};
