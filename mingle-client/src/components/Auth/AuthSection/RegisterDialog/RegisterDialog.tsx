import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface RegisterDialogProps extends DialogProps {
  onClose: () => void;
}

const RegisterDialog = (props: RegisterDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumberEmail, setPhoneNumberEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = () => {
    console.log({
      firstName,
      lastName,
      phoneNumberEmail,
      password,
      passwordValidate,
      birthdate,
      gender,
    });

    props.onClose;
  };

  return (
    <Dialog {...props}>
      <Box
        sx={{
          maxWidth: "90vw",
          minWidth: "30vw",
          width: 300,
          maxHeight: "90vh",
          minHeight: "50vh",
          height: 500,
        }}
      >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Phone Number/Email"
            fullWidth
            value={phoneNumberEmail}
            onChange={(e) => setPhoneNumberEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={passwordValidate}
            onChange={(e) => setPasswordValidate(e.target.value)}
          />
          <TextField
            label="Birthdate"
            type="date"
            fullWidth
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value as string)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default RegisterDialog;
