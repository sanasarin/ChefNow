import React from "react";
import ReactDOM from "react-dom/client";

// import axios
import axios from "axios";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

//theme
//import "primereact/resources/themes/lara-light-teal/theme.css";
import "./styles/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

// global styles
import "./styles/global.css";

// import AccountProvider
import { AccountProvider } from "./contexts/AccountContext";

// import app
import App from "./App";

// set Axios defaults
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AccountProvider>
      <App />
    </AccountProvider>
  </React.StrictMode>
);
