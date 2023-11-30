import { ThemeProvider } from "@mui/material/styles";

import MainPage from "./Pages/Main";
import { useDarkMode } from "./contexts/DarkModeContext";
import AuthPage from "./Pages/Auth";

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      {/* <AuthPage /> */}
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
