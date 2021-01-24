import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";

import { TAppState } from "shared/redux/store";
import { loginGoogle } from "auth/redux/auth.thunks";
import { Redirect } from "react-router-dom";
import { selectIsLoading } from "loading/redux/loading.selectors";
import { SPageContentCenter } from "shared/styles/layout.styles";
import { SHeadingTitle } from "../../shared/styles/typography.styles";
import styled from "styled-components";
import { theme } from "../../shared/styles/theme.styles";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TAppState) => state.auth.user);
  const isLoading = useSelector(selectIsLoading);

  async function handleGoogleSuccess(googleData: any) {
    dispatch(loginGoogle(googleData.tokenId));
  }

  function handleGoogleFailure() {
    alert("ERROR: Failed to sign in with Google");
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <SPageContentCenter centerContent>
      { user && <Redirect to={"/concepts"} /> }
      <SHeadingTitle>Login Page</SHeadingTitle>
      {!user && (
        <>
          <SGoogleLogin
            clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`}
            buttonText="Login With Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </>
      )}
    </SPageContentCenter>
  );
};

const SGoogleLogin = styled(GoogleLogin)`
  margin-top: ${theme.spacing.sm};
`;