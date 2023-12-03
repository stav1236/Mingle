import { useAuth } from "@/contexts/AuthContext";
import { Card, TextField, Button } from "@mui/material";

interface LoginFormProps {
  openRegisterDialog: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { login } = useAuth();

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
        sx={{ width: "80%" }}
        autoFocus
        variant="outlined"
        id="emailPhone"
        label="אמייל / טלפון"
      />
      <TextField
        sx={{ width: "80%" }}
        variant="outlined"
        id="password"
        label="סיסמא"
        type="password"
      />
      <Button
        onClick={login}
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
