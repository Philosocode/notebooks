import React from "react";

import { AuthForm } from "auth/components/auth-form.component";

import { SHeadingTitle } from "shared/styles/typography.style";
import { SPageContentCenter } from "shared/styles/layout.style";

export const LoginPage: React.FC = () => (
  <SPageContentCenter centerContent>
    <SHeadingTitle>Login</SHeadingTitle>
    <AuthForm mode="login" />
  </SPageContentCenter>
);
