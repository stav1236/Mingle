import useUserInfo from "@/hooks/useUserInfo";
import { CardHeader, Skeleton } from "@mui/material";
import UserAvatar from "../UserAvatar";

interface PostHeaderProps {
  creatorId: string;
  updatedAt: string;
}

const PostHeader = (props: PostHeaderProps) => {
  const { data: creator, isLoading } = useUserInfo(props.creatorId);

  const fullName = `${creator?.firstName} ${creator?.lastName}`;
  const updatedAt = new Date(props.updatedAt);

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
      subheader={updatedAt.toLocaleString("he", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      })}
    />
  );
};

export default PostHeader;
