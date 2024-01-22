import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import TopBarMenu from "./TopBarMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const TopBar = () => {
  const queryClient = useQueryClient();

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTitleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/");
    queryClient.invalidateQueries({ queryKey: ["posts", "media"] });
  };

  return (
    <AppBar color="secondary" sx={{ mb: 3 }} position="sticky">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton size="large" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <span style={{ cursor: "pointer" }} onClick={handleTitleClick}>
          <Typography variant="h4" fontWeight="bold">
            Mingle
          </Typography>
        </span>
        <IconButton onClick={logout} size="large">
          <LogoutIcon />
        </IconButton>
        <TopBarMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          handleMenuClose={handleMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
