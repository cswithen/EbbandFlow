import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Router } from "react-router-dom";
import history from "./history";
import App from "./App";
import AuthProvider from "./contexts/auth";

import "core-js/stable";
import "regenerator-runtime/runtime";

ReactDOM.render(
  <AuthProvider>
    <Router history={history}>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById("app")
);
