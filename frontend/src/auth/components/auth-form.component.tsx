import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import GoogleLogin from "react-google-login";

import { selectIsLoggedIn } from "user/redux/user.selectors";
import { loginEmail, loginGoogle, register } from "user/redux/user.thunks";
import { useForm } from "shared/hooks/use-form.hook";
import { convertToTitleCase } from "shared/utils/string.util";

import { FormGroup } from "shared/components/form/form-group.component";

import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";

interface IProps {
  mode: "login" | "register";
}
export const AuthForm: React.FC<IProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = values;

  async function handleGoogleSuccess(googleData: any) {
    dispatch(loginGoogle(googleData.tokenId));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (mode === "login") {
      dispatch(loginEmail({ email, password }));
    } else {
      dispatch(register({ name, email, password }));
    }
  }

  function submitDisabled() {
    if (mode === "register") {
      return (
        Object.values(values).some((val) => val.trim() === "") ||
        password !== passwordConfirm
      );
    }

    // login
    return email.trim() === "" || password.trim() === "";
  }

  const loggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation<{ from: { pathname: string } }>();
  if (loggedIn)
    return <Redirect to={location.state?.from?.pathname ?? "/notebooks"} />;
  return (
    <>
      <SForm onSubmit={handleSubmit}>
        {mode === "register" && (
          <SFormGroup
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            value={name}
          />
        )}
        <SFormGroup
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          value={email}
        />
        <SFormGroup
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={password}
        />
        {mode === "register" && (
          <SFormGroup
            name="passwordConfirm"
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
          />
        )}
        <SButton disabled={submitDisabled()}>
          {convertToTitleCase(mode)}
        </SButton>
      </SForm>

      <SGoogleLogin
        clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`}
        buttonText="Login With Google"
        onSuccess={handleGoogleSuccess}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

const SButton = styled(SButtonGreen)``;

const SForm = styled.form`
  max-width: 40rem;
  margin: ${theme.spacing.base} auto;
`;

const SFormGroup = styled(FormGroup)`
  margin-bottom: ${theme.spacing.base};
`;

const SGoogleLogin = styled(GoogleLogin)`
  margin-top: ${theme.spacing.sm};
`;
