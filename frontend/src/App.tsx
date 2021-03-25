import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";

// logic
import { appRoutes } from "./shared/config/app-routes.config";
import { useInit } from "./shared/hooks/use-init.hook";
import { useToggle } from "./shared/hooks/use-toggle.hook";
import { selectIsLoggedIn, selectSettings } from "./user/redux/user.selectors";

// components
import { Alert } from "alert/components/alert.component";
import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/nav/private-route.component";
import { Navbar } from "shared/components/nav/navbar.component";
import { Sidebar } from "./shared/components/nav/sidebar.component";
import { NotFoundPage } from "shared/pages/not-found.page";
import { Loader } from "./loading/components/loader.component";
import { ModalRoot } from "./modal/components/modal-root.component";
import { TimerModal } from "timer/components/timer-modal.component";
import { PreStudyModal } from "./modal/components/pre-study-modal.component";

// styles
import { SMainContent } from "shared/styles/layout.style";

export function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const settings = useSelector(selectSettings);

  useInit();

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

  if (isLoggedIn && !settings) return <Loader />;
  return (
    <SAppContainer>
      <Navbar />
      <Sidebar />
      <Switch>
        <Redirect exact from="/" to="/concepts" />
        <SMainContent>
          {getRoutes()}
        </SMainContent>
        <Route component={NotFoundPage} />
      </Switch>
      {
        settings && (
          <>
            <PreStudyModal settings={settings} />
            <TimerModal settings={settings} />
          </>
        )
      }
      <GlobalLoader />
      <Alert />
      <ModalRoot />
    </SAppContainer>
  );
}

const SAppContainer = styled.div`
  display: flex;
`;