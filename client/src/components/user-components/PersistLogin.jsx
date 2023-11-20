import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import {
  selectAllUsers,
  selectPersistState,
} from "../../Redux/slices/userSlice";
import Loading from "../Loading";

const PersistLogin = () => {
  const persistState = useSelector(selectPersistState);
  // console.log(persistState, "persist chk in persist login component");

  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  const user = useSelector(selectAllUsers);
  // console.log(user, "user details from redux");

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh(); // returns new access token
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false); // At the end loading will be false,it wont load forever,irresp. of error or not
      }
    };

    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [persistState]);

  // TODO  useeffect to see whats going on .Remove it later

  useEffect(() => {
    console.log(`isLoading:${isLoading}`);
    console.log(`authToken:${JSON.stringify(user?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
    {!persistState ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}
    
    </>
  );
};

export default PersistLogin;
