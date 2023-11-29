import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { useDarkMode } from "@/contexts/DarkModeContext";

interface PostProps {
  creatorName: string;
  postText: string;
  postImgSrc: string;
}

const Post = ({ creatorName, postText, postImgSrc }: PostProps) => {
  const { theme } = useDarkMode();
  const [likeDialogOpen, setLikeDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const handleLikeClick = () => {
    setLikeDialogOpen(true);
  };

  const handleCommentClick = () => {
    setCommentDialogOpen(true);
  };

  const handleDialogClose = () => {
    setLikeDialogOpen(false);
    setCommentDialogOpen(false);
  };

  return (
    <Card sx={{ maxWidth: "90vw", width: 600, maxHeight: "90vh" }}>
      <CardHeader
        sx={{ pb: 0 }}
        avatar={
          <Avatar sx={{ bgcolor: `${theme.palette.primary.main}` }}>סמ</Avatar>
        }
        title={creatorName}
        subheader="Posted on: {someDate}"
      />
      <CardContent sx={{ pt: 0 }}>
        <p>{postText}</p>
        {postImgSrc && (
          <img src={postImgSrc} alt="Post" style={{ width: "100%" }} />
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleLikeClick} color="primary">
          Like
        </Button>
        <Button onClick={handleCommentClick} color="primary">
          Comment
        </Button>
      </CardActions>

      {/* Like Dialog */}
      <Dialog open={likeDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Like Dialog</DialogTitle>
        <DialogContent>
          <p>Dialog content for likes goes here.</p>
        </DialogContent>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Comment Dialog</DialogTitle>
        <DialogContent>
          {/* You can include a form for adding comments */}
          <TextField label="Add a comment" fullWidth />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Post;
