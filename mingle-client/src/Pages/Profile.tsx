import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  return <Typography>{id}</Typography>;
};

export default Profile;
