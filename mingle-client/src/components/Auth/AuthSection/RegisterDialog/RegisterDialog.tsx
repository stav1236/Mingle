import { nonTokenAxios } from "@/utilities/axios";
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GENDERS, Gender } from "@/models/Gender";

interface RegisterDialogProps extends DialogProps {
  onClose: () => void;
}

const RegisterDialog = (props: RegisterDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState(GENDERS.MALE.toString());

  const handleRegister = () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      gender,
    };

    nonTokenAxios
      .post("/auth/register/", userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    props.onClose();
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <FormControl fullWidth>
            <FormLabel id="demo-row-radio-buttons-group-label">מגדר</FormLabel>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {Object.values(GENDERS).map((g) => (
                <FormControlLabel value={g} control={<Radio />} label={g} />
              ))}
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
