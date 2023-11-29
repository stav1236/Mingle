import { Box } from "@mui/material";
import Post from "components/UI/Post";

const Main = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Post
        creatorName={"סתיו מאור"}
        postText={"ניסיון"}
        postImgSrc={
          "https://i.postimg.cc/bNknc4DH/345461848-638825908090344-8432017085078118923-n.jpg"
        }
      />
    </Box>
  );
};

export default Main;
