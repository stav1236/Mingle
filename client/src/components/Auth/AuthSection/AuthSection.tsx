import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterDialog from "./RegisterDialog/RegisterDialog";

const AuthSection = () => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <LoginForm openRegisterDialog={openDialog} />
      <RegisterDialog open={open} onClose={closeDialog} />
    </>
  );
};

export default AuthSection;
