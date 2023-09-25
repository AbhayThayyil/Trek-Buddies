import axios from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
// import { loginSuccess, logout } from "../Redux/slices/userSlice";
import { updateAccessToken, selectUserState } from "../Redux/slices/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserState);

  // console.log(user,"user state check for refresh token call");

  if (user?.userInfo?.isAdmin) {
    const refresh = async () => {
      const response = await axios.get("/refresh/admin", {
        withCredentials: true,
      });
      // console.log(user,"Previous state of admin");
      // console.log(response.data, "from refresh api call");
      // console.log(response.data.accessToken,"accesstoken generated for admin");
      // console.log(user,"Users from store");
      dispatch(updateAccessToken(response.data.accessToken));

      return response.data.accessToken;
    };
    return refresh;
  } else {
    const refresh = async () => {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      // console.log(user,"Previous state");
      // console.log(response.data, "from refresh api call");
      // console.log(response.data.accessToken,"accesstoken generated");
      // console.log(user,"Users from store");
      dispatch(updateAccessToken(response.data.accessToken));

      return response.data.accessToken;
    };
    return refresh;
  }
};

export default useRefreshToken;
