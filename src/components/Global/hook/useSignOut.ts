import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const useSignOut = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { dispatch } = useContext(AuthContext);
  const [showWarning, setShowWarning] = useState(false);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleLogOut = () => {
    setShowWarning(true);
  };

  const handleAgree = () => {
    setShowWarning(false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleDisagree = () => {
    setShowWarning(false);
  };
  return {
    open,
    showWarning,
    handleToggle,
    handleListKeyDown,
    handleClose,
    handleLogOut,
    handleAgree,
    handleDisagree,
    anchorRef,
  };
};
