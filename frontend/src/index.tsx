import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
