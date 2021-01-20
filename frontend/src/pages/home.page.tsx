import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";

import { TAppState } from "redux/store";
// import { fetchUsers } from "user/redux/user.thunks";
import { loginGoogle } from "auth/auth.thunks";
import { logout } from "auth/auth.slice";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TAppState) => state.auth.user);
  // const users = useSelector((state: TAppState) => state.user.users);

  async function handleGoogleSuccess(googleData: any) {
    dispatch(loginGoogle(googleData.tokenId));
  }

  function handleGoogleFailure() {
    alert("ERROR: Failed to sign in with Google");
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="text-center pt-16">
      <h1>Home Page</h1>
      <Link to="/">Home</Link>
      <Link to="/library">Library</Link>
      {
        !user && (
          <>
            <h1 className="font-bold">You are not logged in.</h1>
            <GoogleLogin
              clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`}
              buttonText="Login With Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </>
        )
      }
      {
        user && (
          <>
            <h1>Welcome, {user.name}</h1>
            <h3>Google ID: {user.google_id}</h3>
            <h3>Email: {user.email}</h3>
            <img src={user.photo_url} alt={user.name} className="m-auto" />
            <Link to="/users">Users</Link>
            <p
              onClick={handleLogout}
              className="underline text-green-700 cursor-pointer"
            >
              Logout
            </p>
          </>
        )
      }
    </div>
  );
};
