import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Router } from "react-router-dom";
import history from "./history";
import App from "./App";
import ContextProvider from "./Context";

import "core-js/stable";
import "regenerator-runtime/runtime";

ReactDOM.render(
  <ContextProvider>
    <Router history={history}>
      <App />
    </Router>
  </ContextProvider>,
  document.getElementById("app")
);
