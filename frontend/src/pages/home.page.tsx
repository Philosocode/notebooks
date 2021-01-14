import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAppState } from "redux/store";

import { fetchUsers } from "redux/user/user.thunk";

export const HomePage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: TAppState) => state.user.users);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Home Page</h1>
      {
        users && users.length >= 1 && (
          <div>
            <p>ID: { users[0].google_id }</p>
            <p>Name: { users[0].name }</p>
            <p>Email: { users[0].email }</p>
            <p>Created At: { new Date(users[0].created_at).toLocaleDateString() }</p>
          </div>
        )
      }
    </div>
  );
 };