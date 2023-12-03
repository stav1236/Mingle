import Post from "components/UI/Post";
import AddPost from "components/UI/AddPost";

const Main = () => {
  return (
    <>
      <AddPost />
      <Post
        creatorName={"סתיו מאור"}
        postText={"ניסיון"}
        postImgSrc={
          "https://i.postimg.cc/bNknc4DH/345461848-638825908090344-8432017085078118923-n.jpg"
        }
      />
    </>
  );
};

export default Main;
