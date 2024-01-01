import { Box, Divider, Menu, MenuItem, MenuProps } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useDarkMode } from "contexts/DarkModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
interface TopBarMenuProps extends MenuProps {
  handleMenuClose: () => void;
}

const TopBarMenu = (props: TopBarMenuProps) => {
  const { logout, user } = useAuth();
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleMenuItemClick = (page: string) => {
    props.handleMenuClose();
    navigate(page);
  };

  return (
    <Menu {...props}>
      <Box sx={{ width: 180 }}>
        <MenuItem onClick={() => handleMenuItemClick(`/profile/${user?._id}`)}>
          <PersonIcon sx={{ m: 0.7 }} />
          הפרופיל שלי
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/home")}>
          <HomeIcon sx={{ m: 0.7 }} />
          דף הבית
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/settings")}>
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
        <MenuItem onClick={logout}>
          <LogoutIcon sx={{ m: 0.7 }} />
          התנתקות
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default TopBarMenu;
