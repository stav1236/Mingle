import { Box, Dialog, Menu, MenuItem, MenuProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import mingleAxios from "@/utilities/axios";
import { useQueryClient } from "react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import PostEditDialog from "./PostEditDialog";

interface PostMoreOptionsProps extends MenuProps {
  _id?: string;
  text?: string;
  handleMenuClose: () => void;
}

const PostMoreOptions = (props: PostMoreOptionsProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeletePost = async () => {
    if (props._id) {
      const res = await mingleAxios.delete(`/posts/${props._id}`);
      if (res.status === 200)
        queryClient.invalidateQueries({
          queryKey: ["posts", "feed", { userId: user?._id }],
        });
    }
  };

  return (
    <>
      <Menu {...props}>
        <Box sx={{ width: 180 }}>
          <MenuItem onClick={() => setIsOpen(true)}>
            <EditIcon sx={{ m: 0.7 }} />
            עריכת פוסט
          </MenuItem>
          <MenuItem onClick={handleDeletePost}>
            <DeleteIcon sx={{ m: 0.7 }} />
            מחיקת פוסט
          </MenuItem>
        </Box>
      </Menu>
      <PostEditDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        text={props.text}
        _id={props._id}
      />
    </>
  );
};

export default PostMoreOptions;
