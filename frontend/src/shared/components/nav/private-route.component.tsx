import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { selectIsLoggedIn } from "user/redux/user.selectors";

interface PrivateRouteProps extends RouteProps {
  component: any;
}
// FROM: https://stackoverflow.com/a/53111155
export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
