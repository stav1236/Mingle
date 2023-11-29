import { ThemeProvider } from "@mui/material/styles";

import MediaPage from "./Pages/Media";
import { useDarkMode } from "./contexts/DarkModeContext";

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <MediaPage />
    </ThemeProvider>
  );
};

export default App;
