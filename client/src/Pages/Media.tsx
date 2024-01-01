import Post from "@/components/UI/Post/Post";
import AddPost from "components/UI/AddPost";
import { useQuery } from "react-query";
import mingleAxios from "@/utilities/axios";
import { Post as PostType } from "@/models/Post";

const Media = () => {
  const { data: posts = [] } = useQuery<PostType[]>(["posts", "media"], () =>
    mingleAxios("/posts/media").then((res) => res.data.posts as PostType[])
  );
  return (
    <>
      <AddPost />
      {[...posts].map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </>
  );
};

export default Media;
