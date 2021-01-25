import React from "react";
import { Route, Switch } from "react-router-dom";

import { appRoutes } from "./shared/config/app.routes";
import { useAuth } from "auth/hooks/use-auth.hook";
import { useScrollToTop } from "shared/hooks/use-scroll-to-top.hook";

import { Alert } from "alert/components/alert.component";
import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/nav/private-route.component";
import { Navbar } from "shared/components/nav/navbar.component";
import { Sidebar } from "./shared/components/nav/sidebar.component";
import { NotFoundPage } from "shared/pages/not-found.page";
import { ModalRoot } from "./modal/components/modal-root.component";

import { SMainContent } from "./shared/styles/layout.styles";

export function App() {
  useAuth();
  useScrollToTop();

  function getRoutes() {
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
        <SMainContent>{getRoutes()}</SMainContent>
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalLoader />
      <Alert />
      <ModalRoot />
    </>
  );
}

