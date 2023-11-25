import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

const AuthPage = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignContent: `${isDesktop ? "" : "center"}`,
        alignItems: `${isDesktop ? "center" : ""}`,
        flexFlow: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: `${isDesktop ? "" : "center"}`,
        }}
      >
        <Typography variant="h2" color="primary">
          MINGLE
        </Typography>
        <Typography color="text.primary" variant="h5">
          מינגל היא רשת חברתית המאפשרת
        </Typography>
        <Typography color="text.primary" variant="h5">
          שיתוף רגשות עם הקרובים אליך.
        </Typography>
        {!isDesktop && (
          <>
            <br />
            <br />
          </>
        )}
      </Box>
      {isDesktop && (
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 2, m: 10 }}
        />
      )}
      <Card
        sx={{
          borderRadius: "2.5%",
          padding: 2.5,
          width: 380,
          maxWidth: "93vw",
          height: 290,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ width: "80%" }}
          required
          autoFocus
          variant="outlined"
          id="emailPhone"
          label="אמייל / טלפון"
        />
        <TextField
          sx={{ width: "80%" }}
          required
          variant="outlined"
          id="password"
          label="סיסמא"
          type="password"
        />
        <Button
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
        >
          יצירת משתמש חדש
        </Button>
      </Card>
    </Box>
  );
};

export default AuthPage;
