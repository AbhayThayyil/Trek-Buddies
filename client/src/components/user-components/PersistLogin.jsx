import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../Redux/slices/userSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  const user = useSelector(selectAllUsers);
  console.log(user,"user details from redux");

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // At the end loading will be false,it wont load forever
      }
    };

    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [user?.accessToken]);

  // TODO  useeffect to see whats going on .Remove it later

  useEffect(() => {
    console.log(`isLoading:${isLoading}`);
    console.log(`authToken:${JSON.stringify(user?.accessToken)}`);
  }, [isLoading,user?.accessToken]);

  return <>
  {isLoading ?
   <p>LOADING...</p> 
   : <Outlet />}
  </>;
};

export default PersistLogin;
