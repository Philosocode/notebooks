import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

import { TAppState } from "shared/redux/store";
import { loginGoogle } from "auth/redux/auth.thunks";
import { SPageContentCenter } from "shared/styles/layout.style";
import { SHeadingTitle } from "shared/styles/typography.style";
import { theme } from "shared/styles/theme.style";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TAppState) => state.auth.user);
  const location = useLocation<{ from: { pathname: string } }>();

  async function handleGoogleSuccess(googleData: any) {
    dispatch(loginGoogle(googleData.tokenId));
  }

  function handleGoogleFailure() {
    alert("ERROR: Failed to sign in with Google");
  }

  return (
    <SPageContentCenter centerContent>
      { user && <Redirect to={location.state?.from?.pathname ?? "/concepts"} /> }
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