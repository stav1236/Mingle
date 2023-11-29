import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import TopBarMenu from "./TopBarMenu";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="secondary" sx={{ mb: 3 }} position="static">
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
        <Typography variant="h4" fontWeight="bold">
          Mingle
        </Typography>
        <IconButton size="large">
          <LogoutIcon />
        </IconButton>
        <TopBarMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
