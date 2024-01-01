import { Box, Menu, MenuItem, MenuProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface PostMoreOptionsProps extends MenuProps {
  handleMenuClose: () => void;
}

const PostMoreOptions = (props: PostMoreOptionsProps) => {
  return (
    <Menu {...props}>
      <Box sx={{ width: 180 }}>
        <MenuItem>
          <EditIcon sx={{ m: 0.7 }} />
          עריכת פוסט
        </MenuItem>
        <MenuItem>
          <DeleteIcon sx={{ m: 0.7 }} />
          מחיקת פוסט
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default PostMoreOptions;
