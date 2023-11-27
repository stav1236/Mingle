import { ThemeProvider } from "@mui/material/styles";

import AuthPage from "./Pages/Auth";
import { useDarkMode } from "./contexts/DarkModeContext";

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <AuthPage />
    </ThemeProvider>
  );
};

export default App;
