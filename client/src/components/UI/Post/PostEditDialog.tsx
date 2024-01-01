import { useAuth } from "@/contexts/AuthContext";
import mingleAxios from "@/utilities/axios";
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

interface PostEditDialogProps extends DialogProps {
  onClose: () => void;
  text?: string;
  _id?: string;
}
const PostEditDialog = (props: PostEditDialogProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [text, setText] = useState(props.text ?? "");

  useEffect(() => {
    setText(props.text ?? "");
  }, [props.text]);

  const handleEditPost = async () => {
    if (props._id && text !== props.text) {
      const res = await mingleAxios.put(`/posts/${props._id}/${text}`);
      if (res.status === 200)
        queryClient.invalidateQueries({
          queryKey: ["posts", "feed", { userId: user?._id }],
        });
    }

    handleClose(true);
  };

  const handleClose = (isEditPost = false) => {
    props?.onClose();
    if (!isEditPost) setTimeout(() => setText(props.text ?? ""), 500);
  };

  return (
    <Dialog {...props} onClose={() => handleClose()}>
      <Box
        sx={{
          maxWidth: "90vw",
          minWidth: "25vw",
          maxHeight: "90vh",
          minHeight: "20vh",
          height: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography sx={{ pt: 2 }} variant="h5" fontWeight="bold">
          עריכת פוסט
        </Typography>
        <Box
          sx={{
            p: "4%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            margin="normal"
            label="תוכן הפוסט"
            fullWidth
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        <Box sx={{ p: 1, width: "100%", display: "flex" }}>
          <Button
            disabled={text === props.text}
            sx={{ m: "auto" }}
            variant="contained"
            onClick={handleEditPost}
            color="primary"
          >
            שמירה
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PostEditDialog;
