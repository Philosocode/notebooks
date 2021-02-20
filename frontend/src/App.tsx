import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// logic
import { appRoutes } from "./shared/config/app-routes.config";
import { useAuth } from "auth/hooks/use-auth.hook";
import { useScrollToTop } from "shared/hooks/use-scroll-to-top.hook";
import { useAppLocation } from "shared/hooks/use-app-location.hook";
import { selectAppLoaded } from "./loading/redux/loading.selectors";

// components
import { Alert } from "alert/components/alert.component";
import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/nav/private-route.component";
import { Navbar } from "shared/components/nav/navbar.component";
import { Sidebar } from "./shared/components/nav/sidebar.component";
import { NotFoundPage } from "shared/pages/not-found.page";
import { ModalRoot } from "./modal/components/modal-root.component";
import { Loader } from "./loading/components/loader.component";

// styles
import { theme } from "./shared/styles/theme.style";
import { SMainContent } from "shared/styles/layout.style";
import { selectUser } from "./auth/redux/auth.selectors";
import { getConcepts } from "./concept/redux/concept.thunks";

export function App() {
  const appLoaded = useSelector(selectAppLoaded);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useAuth();
  useScrollToTop();

  useEffect(() => {
    if (user && !appLoaded) dispatch(getConcepts());
  }, [dispatch, user]);

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

  if (!appLoaded) return <Loader />;
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

