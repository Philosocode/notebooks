import React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFoundPage } from "pages/not-found.page";

import { appRoutes } from "./shared/app.routes";
import { useAuth } from "auth/hooks/use-auth.hook";
import { GlobalLoader } from "loading/components/global-loader.component";
import { PrivateRoute } from "shared/components/private-route.component";
import { Navbar } from "shared/components/navbar.component";

export function App() {
  useAuth();

  function renderRoutes() {
    return appRoutes.map(route => {
      if (route.isPrivate) {
        return <PrivateRoute exact path={route.path} component={route.component} />;
      }

      return <Route exact path={route.path} component={route.component} />;
    })
  }

  return (
    <div className="app-container font-san">
      <Navbar/>
      <Switch>
        { renderRoutes() }
        <Route component={NotFoundPage}/>
      </Switch>
      <GlobalLoader/>
    </div>
  );
}
