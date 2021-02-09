import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

import { TAppState } from "shared/redux/store";
import { loginGoogle } from "auth/redux/auth.thunks";
import { SPageContentCenter } from "shared/styles/layout.styles";
import { SHeadingTitle } from "shared/styles/typography.styles";
import { theme } from "shared/styles/theme.styles";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TAppState) => state.auth.user);

  async function handleGoogleSuccess(googleData: any) {
    dispatch(loginGoogle(googleData.tokenId));
  }

  function handleGoogleFailure() {
    alert("ERROR: Failed to sign in with Google");
  }

  return (
    <SPageContentCenter centerContent>
      { user && <Redirect to={"/concepts"} /> }
      <SHeadingTitle>Login Page</SHeadingTitle>
      {!user ? (
        <SGoogleLogin
          clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`}
          buttonText="Login With Google"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : null}
    </SPageContentCenter>
  );
};

const SGoogleLogin = styled(GoogleLogin)`
  margin-top: ${theme.spacing.sm};
`;