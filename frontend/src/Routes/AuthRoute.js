// import external modules
import { React, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";

import Spinner from "../components/spinner/spinner";

const AuthRoute = ({ requiredRoles, Component, path, exact = false }) => {
  const isAuthed = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const userHasRequiredRole = requiredRoles.includes(userRole);
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isAuthed && userHasRequiredRole ? (
          <Suspense fallback={<Spinner />}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect to="/NotFound" />
        )
      }
    />
  );
};

export default AuthRoute;
