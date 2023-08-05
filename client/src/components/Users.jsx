import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  // const refresh=useRefreshToken()
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users/test/listUsers", {
          signal: controller.signal,
        });
        console.log(response.data, "users list from api call");
        isMounted && setUsers(response.data);
        console.log(users, "user data");
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return (
    <>
      <div>
        <h2>User's list</h2>
        {users?.length ? (
          <ul>
            {users.map((user, i) => {
              return <li key={i}>{user?.firstName}</li>;
            })}
          </ul>
        ) : (
          <p>There are no users</p>
        )}
        {/* <button onClick={()=>refresh()}>refresh</button> */}
      </div>
    </>
  );
};

export default Users;
