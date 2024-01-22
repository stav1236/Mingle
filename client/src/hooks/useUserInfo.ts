import { useQuery } from "react-query";
import mingleAxios from "@/utilities/axios";

const projection = {
  _id: 1,
  firstName: 1,
  lastName: 1,
  gender: 1,
  imgSrc: 1,
};

const useUserInfo = (userId?: string) => {
  return useQuery(
    [
      "users",
      {
        _id: userId,
        params: { projection },
      },
    ],
    () =>
      mingleAxios
        .get(`/users/${userId}`, {
          params: {
            projection,
          },
        })
        .then((res) => res.data)
  );
};

export default useUserInfo;
