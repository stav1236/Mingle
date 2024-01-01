import ProfileCard from "@/components/UI/ProfileCard";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  return <ProfileCard id={id} />;
};

export default Profile;
