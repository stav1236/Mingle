import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
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
          minWidth: "25vw",
          maxHeight: "90vh",
          minHeight: "50vh",
          height: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ pt: 2 }} variant="h5" fontWeight="bold">
          הרשמה
        </Typography>
        <Box
          sx={{
            p: "4%",
            height: "76%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              sx={{
                width: "48%",
                "& input": {
                  height: 15,
                },
              }}
              label="שם פרטי"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              sx={{
                width: "48%",
                "& input": {
                  height: 15,
                },
              }}
              label="שם משפחה"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <TextField
            sx={{
              "& input": {
                height: 15,
              },
            }}
            label="אמייל / טלפון"
            fullWidth
            value={phoneNumberEmail}
            onChange={(e) => setPhoneNumberEmail(e.target.value)}
          />
          <TextField
            sx={{
              "& input": {
                height: 15,
              },
            }}
            label="סיסמא"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={{
              "& input": {
                height: 15,
              },
            }}
            label="אימות סיסמא"
            type="password"
            fullWidth
            value={passwordValidate}
            onChange={(e) => setPasswordValidate(e.target.value)}
          />
          <TextField
            sx={{
              "& input": {
                height: 15,
              },
            }}
            InputProps={{
              inputProps: { style: { textAlign: "left" } },
            }}
            fullWidth
            type="date"
            label="תאריך לידה"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <FormControl fullWidth>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="זכר" control={<Radio />} label="זכר" />
              <FormControlLabel value="נקבה" control={<Radio />} label="נקבה" />
              <FormControlLabel value="אחר" control={<Radio />} label="אחר" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ p: 1, width: "100%", display: "flex" }}>
          <Button
            sx={{ m: "auto" }}
            variant="contained"
            onClick={handleRegister}
            color="primary"
          >
            הרשמה
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RegisterDialog;
