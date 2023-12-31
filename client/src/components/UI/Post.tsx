import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
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
import { useDarkMode } from "@/contexts/DarkModeContext";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { Like, Comment } from "@/models/Post";
import { useQuery } from "react-query";
import mingleAxios from "@/utilities/axios";

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
  const { theme } = useDarkMode();
  const [likeDialogOpen, setLikeDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const { data: creator } = useQuery(
    [
      "users",
      {
        _id: props.creatorId,
        params: {
          projection: { _id: 1, firstName: 1, lastName: 1, gender: 1 },
        },
      },
    ],
    () =>
      mingleAxios
        .get(`/users/${props.creatorId}`, {
          params: {
            projection: { _id: 1, firstName: 1, lastName: 1, gender: 1 },
          },
        })
        .then((res) => res.data)
  );

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
    <Card sx={{ maxWidth: "90vw", width: 600, m: 1.5 }}>
      <CardHeader
        sx={{ pb: 0 }}
        avatar={
          <Avatar sx={{ bgcolor: `${theme.palette.primary.main}` }}>סמ</Avatar>
        }
        title={props.creatorId}
        subheader={props.createdAt}
      />
      <CardContent sx={{ pt: 1, pb: 0.5 }}>
        <p>{props.text}</p>
      </CardContent>
      {props.imgSrc && (
        <img
          src={`${import.meta.env.VITE_APP_UPLOADS_URL ?? ""}${props.imgSrc}`}
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
          <ThumbUpOutlinedIcon />
          <Typography
            sx={{ ml: 1 }}
            variant="subtitle1"
            onClick={handleLikeClick}
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
            sx={{ ml: 1 }}
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
      <Dialog open={likeDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Like Dialog</DialogTitle>
        <DialogContent>
          <p>Dialog content for likes goes here.</p>
        </DialogContent>
      </Dialog>

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
