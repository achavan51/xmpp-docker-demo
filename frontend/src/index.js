import ReactDOM from "react-dom";
import React, { Suspense, lazy } from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Amplify, { Auth } from "aws-amplify";
import Spinner from "./components/spinner/spinner";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <LazyApp />
  </Suspense>,
  document.getElementById("root")
);
// serviceWorker();
// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
