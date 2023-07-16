import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../context/AuthContext";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [showWarning, setShowWarning] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    setShowWarning(true);
  };

  const handleAgree = async () => {
    setShowWarning(false);
    dispatch({ type: "LOGOUT" });

    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleDisagree = () => {
    setShowWarning(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return {
    showWarning,
    handleLogOut,
    handleAgree,
    handleDisagree,
    handleClose,
    handleListKeyDown,
    open,
    anchorRef,
    handleToggle,
  };
};
