import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
