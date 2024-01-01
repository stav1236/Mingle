import Post from "@/components/UI/Post/Post";
import ProfileCard from "@/components/UI/ProfileCard";
import mingleAxios from "@/utilities/axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Post as PostType } from "@/models/Post";

const Profile = () => {
  const { id } = useParams();
  const { data: posts = [] } = useQuery<PostType[]>(["posts", "feed", id], () =>
    mingleAxios(`/posts/feed/${id}`).then((res) => res.data.posts as PostType[])
  );

  return (
    <>
      <ProfileCard id={id} />;
      {[...posts].map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </>
  );
};

export default Profile;
