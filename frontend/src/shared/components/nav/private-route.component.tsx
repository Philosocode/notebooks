import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { TAppState } from "redux/store";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

// https://stackoverflow.com/a/53111155
export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const token = useSelector((state: TAppState) => state.auth.token);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        token ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
