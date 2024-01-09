import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../GoogleAuthButton";

interface LoginFormProps {
  openRegisterDialog: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    login(email, password);
    navigate("/");
  };

  return (
    <Card
      sx={{
        borderRadius: "2.5%",
        padding: 2.5,
        minWidth: "22%",
        width: 380,
        maxWidth: "93vw",
        minHeight: "22%",
        height: 330,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <TextField
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        sx={{ width: "80%" }}
        autoFocus
        variant="outlined"
        id="email"
        label="אמייל"
      />
      <TextField
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        sx={{ width: "80%" }}
        variant="outlined"
        id="password"
        label="סיסמא"
        type="password"
      />
      <Button
        onClick={handleLogin}
        sx={{ width: "70%" }}
        fullWidth
        variant="contained"
        color="secondary"
      >
        התחברות
      </Button>
      <Button
        sx={{ width: "60%" }}
        fullWidth
        variant="contained"
        color="primary"
        onClick={props.openRegisterDialog}
      >
        יצירת משתמש חדש
      </Button>
      <GoogleAuthButton />
    </Card>
  );
};

export default LoginForm;
