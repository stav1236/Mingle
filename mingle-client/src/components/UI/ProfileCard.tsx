import { useDarkMode } from "@/contexts/DarkModeContext";
import { Avatar, Card, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
const ProfileCard = () => {
  const navigate = useNavigate();
  const { theme } = useDarkMode();

  return (
    <Card
      sx={{
        position: "relative",
        p: 1.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: "90vw",
        width: 600,
        minHeight: 200,
        m: 1.5,
      }}
    >
      <span
        onClick={() => navigate("/settings")}
        style={{ cursor: "pointer", position: "absolute", top: 10, left: 15 }}
      >
        <EditIcon />
      </span>
      <Avatar
        sx={{
          bgcolor: `${theme.palette.primary.main}`,
          width: 120,
          height: 120,
        }}
      >
        SM
      </Avatar>
      <Typography fontWeight="bold" variant="h5">
        Stav Maor
      </Typography>
    </Card>
  );
};

export default ProfileCard;
