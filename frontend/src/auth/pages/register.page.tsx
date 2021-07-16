import React from "react";

import { AuthForm } from "auth/components/auth-form.component";

import { SHeadingTitle } from "shared/styles/typography.style";
import { SPageContentCenter } from "shared/styles/layout.style";

export const RegisterPage: React.FC = () => (
  <SPageContentCenter centerContent>
    <SHeadingTitle>Register</SHeadingTitle>
    <AuthForm mode="register" />
  </SPageContentCenter>
);
