import { Card, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useUserInfo from "@/hooks/useUserInfo";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

const ProfileCard = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const { data: user } = useUserInfo(id);
  const { user: loggedinUser } = useAuth();
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
      {loggedinUser?._id === id && (
        <span
          onClick={() => navigate("/settings")}
          style={{ cursor: "pointer", position: "absolute", top: 10, left: 15 }}
        >
          <EditIcon />
        </span>
      )}
      <UserAvatar
        sx={{
          width: 120,
          height: 120,
          fontSize: 60,
        }}
        {...user}
      />
      <Typography fontWeight="bold" variant="h5">
        {user ? `${user?.firstName} ${user?.lastName}` : ""}
      </Typography>
    </Card>
  );
};

export default ProfileCard;
