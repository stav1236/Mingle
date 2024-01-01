import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Divider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { Like, Comment } from "@/models/Post";
import { imgSrcUrl } from "@/utilities/imageUtils";
import { useAuth } from "@/contexts/AuthContext";
import PostHeader from "./PostHeader";
import PostMoreOptions from "./PostMoreOptions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import mingleAxios from "@/utilities/axios";
import { useQueryClient } from "react-query";
import LikesDialog from "./LikesDialog";

interface PostProps {
  _id: string;
  text?: string;
  imgSrc?: string;
  creatorId: string;
  comments: Comment[];
  likes: Like[];
  updatedAt: string;
  createdAt: string;
}

const Post = (props: PostProps) => {
  const queryClient = useQueryClient();
  const { user: connectedUser } = useAuth();

  const [likeDialogOpen, setLikeDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreOptionsClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleLikeClick = async () => {
    const res = await mingleAxios.post("/posts/like/", { postId: props._id });
    if (res.status === 200)
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
  };

  const openLikeDialog = () => {
    setLikeDialogOpen(true);
  };

  const handleCommentClick = () => {
    setCommentDialogOpen(true);
  };

  const handleDialogClose = () => {
    setLikeDialogOpen(false);
    setCommentDialogOpen(false);
  };

  const isLike = useMemo(
    () => props.likes.some((like) => like.userId === connectedUser?._id),
    [props.likes]
  );

  return (
    <Card sx={{ maxWidth: "90vw", width: 600, m: 1.5, position: "relative" }}>
      {connectedUser?._id === props.creatorId && (
        <IconButton
          sx={{ m: 1, position: "absolute", right: 0 }}
          onClick={handleMoreOptionsClick}
        >
          <MoreHorizIcon />
        </IconButton>
      )}
      <PostMoreOptions
        {...props}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreOptionsClose}
        handleMenuClose={handleMoreOptionsClose}
      />
      <PostHeader {...props} />
      <CardContent sx={{ pt: 1, pb: 0.5 }}>
        <p>{props.text}</p>
      </CardContent>
      {props.imgSrc && (
        <img
          src={imgSrcUrl(props.imgSrc)}
          alt="Post"
          style={{ width: "100%" }}
        />
      )}
      <Divider />
      <Box display="flex" justifyContent="space-between" padding={1.2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span onClick={handleLikeClick} style={{ cursor: "pointer" }}>
            {isLike ? <ThumbUpAltIcon /> : <ThumbUpOutlinedIcon />}
          </span>
          <Typography
            sx={{ ml: 1, cursor: "pointer" }}
            variant="subtitle1"
            onClick={openLikeDialog}
          >
            {props.likes.length} לייקים
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CommentIcon />
          <Typography
            sx={{ ml: 1, cursor: "pointer" }}
            variant="subtitle1"
            onClick={handleCommentClick}
          >
            {props.comments.length} תגובות
          </Typography>
        </Box>
      </Box>
      <Divider />
      <TextField
        label="כתיבת תגובה"
        fullWidth
        variant="filled"
        InputProps={{
          endAdornment: (
            <IconButton edge="end">
              <SendIcon />
            </IconButton>
          ),
        }}
      />

      <LikesDialog
        likes={props.likes}
        open={likeDialogOpen}
        onClose={handleDialogClose}
      />
      {/* <Dialog>
        <DialogTitle>Like Dialog</DialogTitle>
        <DialogContent>
          <p>Dialog content for likes goes here.</p>
        </DialogContent>
      </Dialog> */}

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
