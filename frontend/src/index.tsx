import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "react-mde/lib/styles/css/react-mde-all.css";

import { store } from "shared/redux/store";
import { App } from "./App";
import { GlobalStyles } from "shared/styles/global.style";

import "shared/config/font-awesome.config";

import reportWebVitals from "./reportWebVitals";

console.log(process.env);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
