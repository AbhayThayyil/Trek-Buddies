import { useEffect } from "react";
import  { axiosPrivate } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";
import { selectUserState } from "../Redux/slices/userSlice";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const user = useSelector(selectUserState);
  // console.log(user,"user/admin check");

  useEffect(() => {
    // request intercept to check at start
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // console.log(config,"========checking config here======");
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response intercept after refresh
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        // console.log(response,"reponse");
        return response;
      },
      async (error) => {
        // console.log(error,'Axios private error');
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest.sent) {
          originalRequest.sent = true;
          const newAccessToken = await refresh();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // Check if the request contains a file before setting Content-Type
          if (
            originalRequest.data instanceof FormData &&
            originalRequest.data.has("file")
          ) {
            originalRequest.headers["Content-Type"] = "multipart/form-data";
          }
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
