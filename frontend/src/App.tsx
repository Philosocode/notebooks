import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

// logic
import { appRoutes } from "./shared/config/app-routes.config";
import { useAuth } from "auth/hooks/use-auth.hook";
import { useScrollToTop } from "shared/hooks/use-scroll-to-top.hook";
import { useAppLocation } from "shared/hooks/use-app-location.hook";
import { selectSettings, selectUser } from "./user/redux/user.selectors";

// components
import { Alert } from "alert/components/alert.component";
import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/nav/private-route.component";
import { Navbar } from "shared/components/nav/navbar.component";
import { Sidebar } from "./shared/components/nav/sidebar.component";
import { NotFoundPage } from "shared/pages/not-found.page";
import { ModalRoot } from "./modal/components/modal-root.component";
import { TimerModal } from "timer/components/timer-modal.component";
import { PreStudyModal } from "./modal/components/pre-study-modal.component";

// styles
import { theme } from "./shared/styles/theme.style";
import { SMainContent } from "shared/styles/layout.style";
import { getUserSettings } from "./user/redux/user.thunks";

export function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const settings = useSelector(selectSettings);

  // load settings if logged in
  useEffect(() => {
    if (!user || settings) return;

    dispatch(getUserSettings(user.id));
  }, [user, dispatch, settings]);

  useScrollToTop();
  useAuth();

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
    case "concepts":
    case "materials":
    case "parts":
      paddingLeft = theme.componentSizes.appSidebarWidth;
      break;
    default:
      paddingLeft = "0";
  }

  if (user && !settings) return null;
  return (
    <>
      <Navbar />
      <Sidebar />
      <Switch>
        <Redirect exact from="/" to="/concepts" />
        <SMainContent paddingLeft={paddingLeft}>{getRoutes()}</SMainContent>
        <Route component={NotFoundPage} />
      </Switch>
      {
        settings && (
          <>
            <PreStudyModal settings={settings} />
            <TimerModal />
          </>
        )
      }
      <GlobalLoader />
      <Alert />
      <ModalRoot />
    </>
  );
}

