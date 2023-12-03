import ProfileCard from "@/components/UI/ProfileCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return <ProfileCard />;
};

export default Profile;
