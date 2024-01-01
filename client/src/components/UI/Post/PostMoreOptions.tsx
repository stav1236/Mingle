import { Box, Menu, MenuItem, MenuProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import mingleAxios from "@/utilities/axios";
import { useQueryClient } from "react-query";
import { useAuth } from "@/contexts/AuthContext";

interface PostMoreOptionsProps extends MenuProps {
  _id?: string;
  handleMenuClose: () => void;
}

const PostMoreOptions = (props: PostMoreOptionsProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
    <Menu {...props}>
      <Box sx={{ width: 180 }}>
        <MenuItem>
          <EditIcon sx={{ m: 0.7 }} />
          עריכת פוסט
        </MenuItem>
        <MenuItem onClick={handleDeletePost}>
          <DeleteIcon sx={{ m: 0.7 }} />
          מחיקת פוסט
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default PostMoreOptions;
