import useUserInfo from "@/hooks/useUserInfo";
import { Comment } from "@/models/Post";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import UserAvatar from "../UserAvatar";
import { getFullName } from "@/utilities/userUtils";

interface CommentsDialogProps extends DialogProps {
  comments: Comment[];
  onClose: () => void;
}

const CommentRow = ({
  comment,
  isLast,
}: {
  comment: Comment;
  isLast: boolean;
}) => {
  const { data: user } = useUserInfo(comment.userId);

  const fullName = getFullName(user?.firstName, user?.lastName);

  return (
    <Box width={"100%"}>
      <Box sx={{ mb: 2.5 }} display="flex" alignItems={"center"}>
        <UserAvatar {...user} />
        <Typography sx={{ ml: 1.5 }}>{fullName}</Typography>
      </Box>
      <Typography>{comment.text}</Typography>
      {isLast ? <br /> : <Divider sx={{ m: 1 }} />}
    </Box>
  );
};

const CommentsDialog = (props: CommentsDialogProps) => {
  return (
    <Dialog {...props}>
      <Box sx={{ minHeight: "50vh", minWidth: "30vw" }}>
        <DialogTitle>תגובות</DialogTitle>
        <DialogContent>
          {props.comments.map((comment, index) => (
            <CommentRow
              key={comment.userId + "" + index}
              comment={comment}
              isLast={index === props.comments.length - 1}
            />
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default CommentsDialog;
