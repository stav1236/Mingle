import * as React from "react";
import { Button, ThemeProvider } from "@mui/material";
import { useDarkMode } from "./contexts/DarkModeContext";

const App = () => {
  const { theme, toggleDarkMode } = useDarkMode();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant="contained" onClick={toggleDarkMode}>
          כפתור
        </Button>
        <Button color="secondary" variant="contained">
          כפתור
        </Button>
      </ThemeProvider>
    </>
  );
};

export default App;
