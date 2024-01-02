import { GENDERS } from "@/models/Gender";
import { imgSrcUrl } from "@/utilities/imageUtils";
import { Avatar, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({
  _id,
  gender,
  firstName,
  lastName,
  imgSrc,
  sx,
}: {
  _id?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  imgSrc?: string;
  sx?: SxProps;
}) => {
  const navigate = useNavigate();

  return (
    <span
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (_id) {
          navigate(`/profile/${_id}`);
          window.scrollTo({
            top: 0,
          });
        }
      }}
    >
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
    </span>
  );
};

export default UserAvatar;
