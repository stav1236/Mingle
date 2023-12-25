import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, TextField, Button } from "@mui/material";

interface LoginFormProps {
  openRegisterDialog: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    login(email, password);
  };

  return (
    <Card
      sx={{
        borderRadius: "2.5%",
        padding: 2.5,
        minWidth: "22%",
        width: 380,
        maxWidth: "93vw",
        minHeight: "20%",
        height: 290,
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
    </Card>
  );
};

export default LoginForm;
