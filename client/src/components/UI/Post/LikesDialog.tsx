import useUserInfo from "@/hooks/useUserInfo";
import { Like } from "@/models/Post";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import UserAvatar from "../UserAvatar";
import { getFullName } from "@/utilities/userUtils";

interface LikesDialogProps extends DialogProps {
  likes: Like[];
  onClose: () => void;
}

const LikeRow = ({ userId }: { userId: string }) => {
  const { data: user } = useUserInfo(userId);

  const fullName = getFullName(user?.firstName, user?.lastName);

  return (
    <Box sx={{ mb: 2.5 }} display="flex" alignItems={"center"}>
      <UserAvatar {...user} />
      <Typography sx={{ ml: 1.5 }}>{fullName}</Typography>
    </Box>
  );
};

const LikesDialog = (props: LikesDialogProps) => {
  return (
    <Dialog {...props}>
      <Box
        sx={{
          maxWidth: "90vw",
          minWidth: "25vw",
          maxHeight: "90vh",
          minHeight: "20vh",
          height: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "space-evenly",
        }}
      >
        <DialogTitle>לייקים</DialogTitle>
        <DialogContent sx={{ width: "98%" }}>
          {props.likes.map((like) => (
            <LikeRow {...like} />
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default LikesDialog;
