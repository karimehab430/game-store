import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
