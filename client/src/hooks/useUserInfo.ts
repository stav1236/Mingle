import { useQuery } from "react-query";
import mingleAxios from "@/utilities/axios";

const useUserInfo = (userId?: string) => {
  return useQuery(
    [
      "users",
      {
        _id: userId,
        params: {
          projection: { _id: 1, firstName: 1, lastName: 1, gender: 1 },
        },
      },
    ],
    () =>
      mingleAxios
        .get(`/users/${userId}`, {
          params: {
            projection: { _id: 1, firstName: 1, lastName: 1, gender: 1 },
          },
        })
        .then((res) => res.data)
  );
};

export default useUserInfo;
