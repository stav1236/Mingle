import { Box, Divider, Menu, MenuItem, MenuProps } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useDarkMode } from "../../../contexts/DarkModeContext";

interface TopBarMenuProps extends MenuProps {}

const TopBarMenu = (props: TopBarMenuProps) => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  const handleMenuItemClick = (page: string) => {
    console.log(`Navigating to ${page}`);
    props?.onClose;
  };

  return (
    <Menu {...props}>
      <Box sx={{ width: 180 }}>
        <MenuItem onClick={() => handleMenuItemClick("HomePage")}>
          <PersonIcon sx={{ m: 0.7 }} />
          הפרופיל שלי
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("ProfilePage")}>
          <HomeIcon sx={{ m: 0.7 }} />
          דף הבית
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("SettingsPage")}>
          <SettingsOutlinedIcon sx={{ m: 0.7 }} />
          הגדרות
        </MenuItem>
        <MenuItem onClick={toggleDarkMode}>
          {isDarkMode ? (
            <>
              <DarkModeIcon sx={{ m: 0.7 }} />
              מצב לילה
            </>
          ) : (
            <>
              <LightModeIcon sx={{ m: 0.7 }} />
              מצב בהיר
            </>
          )}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuItemClick("LogoutPage")}>
          <LogoutIcon sx={{ m: 0.7 }} />
          התנתקות
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default TopBarMenu;
