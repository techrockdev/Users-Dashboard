import { Box, Dialog, DialogContent, DialogContentText, Modal } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

interface InputModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: (value: number) => void;
  inputAmount: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputModal: React.FC<InputModalProps> = ({
  open,
  handleClose,
  handleConfirm,
  inputAmount,
  handleInputChange,
}) => {
  const [inputValue, setInputValue] = useState<number>(inputAmount);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
    handleInputChange(e);
  };

  const handleConfirmClick = () => {
    handleConfirm(inputValue);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100",
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>Place your value below:</DialogContentText>
            <Input value={inputValue} onChange={handleValueChange} />
            <Button className="mt-4 w-full rounded-xl bg-secondary" onClick={handleConfirmClick}>
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
      </Modal>
    </Box>
  );
};
