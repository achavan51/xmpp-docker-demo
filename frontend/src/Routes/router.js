// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Spinner from "../components/spinner/spinner";
const SignUp = lazy(() => import("../components/Authentication/signup"));
const Login = lazy(() => import("../components/Authentication/login"));
const Dashboard = lazy(() => import("../components/DashBoard/dashboard"));
const NotFound = lazy(() => import("../views/NotFound"));

class Router extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          {/* <AuthRoute
            exact
            path="/dashboard"
            requiredRoles={["admin", "user", "customer"]}
            component={Dashboard}
          /> */}
          <Route
            path="/dashboard"
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <Dashboard {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <SignUp {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <Login {...props} />
              </Suspense>
            )}
          />
          <Route path="*" exact={true} component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
