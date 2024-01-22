import { ThemeProvider } from "@mui/material/styles";

import { useDarkMode } from "./contexts/DarkModeContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Media from "./Pages/Media";
import TopBar from "./components/TopBar/TopBar";
import { Box, SxProps } from "@mui/material";
import { useAuth } from "./contexts/AuthContext";
import Crypto from "./Pages/Crypto";

const mediaScreenSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const App = () => {
  const { theme } = useDarkMode();
  const { isLogin } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isLogin && <TopBar />}
        <Box sx={isLogin ? mediaScreenSx : {}}>
          <Routes>
            <Route
              path="/Profile/:userId"
              element={isLogin ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/Settings"
              element={isLogin ? <Settings /> : <Navigate to="/" />}
            />
            <Route
              path="/Crypto"
              element={isLogin ? <Crypto /> : <Navigate to="/" />}
            />
            <Route path="/home" element={isLogin ? <Media /> : <Auth />} />
            <Route path="/" element={isLogin ? <Media /> : <Auth />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
