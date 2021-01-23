import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";

import { appRoutes } from "./shared/app.routes";
import { useAuth } from "auth/hooks/use-auth.hook";
import { useScrollToTop } from "shared/hooks/use-scroll-to-top.hook";

import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/nav/private-route.component";
import { Navbar } from "shared/components/nav/navbar.component";
import { Sidebar } from "shared/components/nav/sidebar.component";
import { NotFoundPage } from "pages/not-found.page";
import { theme } from "shared/styles/theme.styles";
import { LibrarySidebar } from "./library/components/library-sidebar.component";

export function App() {
  const location = useLocation();

  useAuth();
  useScrollToTop();

  const [isLibraryPage, setIsLibraryPage] = useState<boolean>();

  useEffect(() => {
    setIsLibraryPage(location.pathname.includes("library"));
  }, [location]);

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
      {isLibraryPage ? <LibrarySidebar /> : <Sidebar />}
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
