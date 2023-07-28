import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users/test/listUsers", {
          signal: controller.signal,
        });
        console.log(response.data, "users list from api call");
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
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
              <li key={i}>{user?._id}</li>;
            })}
          </ul>
        ) : (
          <p>There are no users</p>
        )}
      </div>
    </>
  );
};

export default Users;
