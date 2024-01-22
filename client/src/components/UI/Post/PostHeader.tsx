import useUserInfo from "@/hooks/useUserInfo";
import { CardHeader, Skeleton } from "@mui/material";
import UserAvatar from "../UserAvatar";
import { getFullName } from "@/utilities/userUtils";
import { getHebrewDate } from "@/utilities/dateUtils";

interface PostHeaderProps {
  creatorId: string;
  createdAt: string;
}

const PostHeader = (props: PostHeaderProps) => {
  const { data: creator, isLoading } = useUserInfo(props.creatorId);

  const fullName = getFullName(creator?.firstName, creator?.lastName);

  return (
    <CardHeader
      sx={{ pb: 0 }}
      avatar={
        isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        ) : (
          <UserAvatar {...creator} />
        )
      }
      title={
        isLoading ? (
          <Skeleton
            animation="wave"
            height={10}
            width="20%"
            style={{ marginBottom: 10 }}
          />
        ) : (
          fullName
        )
      }
      subheader={getHebrewDate(props.createdAt)}
    />
  );
};

export default PostHeader;
