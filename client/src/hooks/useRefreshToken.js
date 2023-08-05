import axios from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
// import { loginSuccess, logout } from "../Redux/slices/userSlice";
import { updateAccessToken ,selectUserState} from "../Redux/slices/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserState);

  

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log(user,"Previous state");
    // console.log(response.data, "from refresh api call");
    console.log(response.data.accessToken,"accesstoken generated");
    // console.log(user,"Users from store");
    dispatch(updateAccessToken(response.data.accessToken))
    
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
