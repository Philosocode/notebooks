import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { appRoutes } from "./shared/app.routes";
import { useAuth } from "auth/hooks/use-auth.hook";
import { useScrollToTop } from "shared/hooks/use-scroll-to-top.hook";

import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/private-route.component";
import { Navbar } from "shared/components/navbar.component";
import { Sidebar } from "shared/components/sidebar.component";
import { NotFoundPage } from "pages/not-found.page";
import { theme } from "shared/styles/theme.styles";

export function App() {
  useAuth();
  useScrollToTop();

  function renderRoutes() {
    return appRoutes.map((route) => {
      if (route.isPrivate) {
        return (
          <PrivateRoute
            exact
            path={route.path}
            component={route.component}
            key={route.path}
          />
        );
      }

      return (
        <Route
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      );
    });
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Switch>
        <SMainContent>{renderRoutes()}</SMainContent>
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalLoader />
    </>
  );
}

const SMainContent = styled.main`
  padding-left: ${theme.other.sidebarWidth};
  padding-bottom: ${theme.spacing.lg};
`;
