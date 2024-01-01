import { GENDERS } from "@/models/Gender";
import { imgSrcUrl } from "@/utilities/imageUtils";
import { Avatar, SxProps } from "@mui/material";

const UserAvatar = ({
  gender,
  firstName,
  lastName,
  imgSrc,
  sx,
}: {
  gender?: string;
  firstName?: string;
  lastName?: string;
  imgSrc?: string;
  sx?: SxProps;
}) => {
  return (
    <Avatar
      src={imgSrcUrl(imgSrc)}
      sx={{
        ...sx,
        bgcolor: `${gender === GENDERS.FEMALE ? "#ff6961" : "#A7C7E7"}`,
      }}
    >
      {imgSrc
        ? null
        : (firstName?.charAt(0) || "") + "" + (lastName?.charAt(0) || "")}
    </Avatar>
  );
};

export default UserAvatar;
