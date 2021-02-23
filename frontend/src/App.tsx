import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// logic
import { appRoutes } from "./shared/config/app-routes.config";
import { useAuth } from "auth/hooks/use-auth.hook";
import { useScrollToTop } from "shared/hooks/use-scroll-to-top.hook";
import { useAppLocation } from "shared/hooks/use-app-location.hook";

// components
import { Alert } from "alert/components/alert.component";
import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/nav/private-route.component";
import { Navbar } from "shared/components/nav/navbar.component";
import { Sidebar } from "./shared/components/nav/sidebar.component";
import { NotFoundPage } from "shared/pages/not-found.page";
import { ModalRoot } from "./modal/components/modal-root.component";

// styles
import { theme } from "./shared/styles/theme.style";
import { SMainContent } from "shared/styles/layout.style";

export function App() {
  useAuth();
  useScrollToTop();

  const appLocation = useAppLocation();

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

  let paddingLeft: string;
  switch (appLocation) {
    case "library":
      paddingLeft = theme.componentSizes.librarySidebarWidth;
      break;
    case "study":
      paddingLeft = theme.componentSizes.appSidebarWidth;
      break;
    default:
      paddingLeft = "0";
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Switch>
        <Redirect exact from="/" to="/concepts" />
        <SMainContent paddingLeft={paddingLeft}>{getRoutes()}</SMainContent>
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalLoader />
      <Alert />
      <ModalRoot />
    </>
  );
}

