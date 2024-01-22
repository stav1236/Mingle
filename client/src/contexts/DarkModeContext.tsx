import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Theme, createTheme } from "@mui/material/styles";

export interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

const getTheme = (isDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#7ec8e3",
      },
      secondary: {
        main: "#ff4081",
      },
      background: {
        default: isDarkMode ? "#121212" : "#F5F5F5",
        paper: isDarkMode ? "#1E1E1E" : "#FFFFFF",
      },
      text: {
        primary: isDarkMode ? "#FFFFFF" : "#000000",
        secondary: isDarkMode ? "#B0B0B0" : "#666666",
      },
    },
  });
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [isDarkMode, setDarkMode] = useState(storedDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  const theme = useMemo(() => {
    const theme = getTheme(isDarkMode);
    document.documentElement.style.backgroundColor =
      theme.palette.background.default;
    return theme;
  }, [isDarkMode]);

  const value: DarkModeContextProps = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
