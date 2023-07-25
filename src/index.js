import React from "react";
import ReactDOM from "react-dom/client";

import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-7ar6hfpscohjw0y0.us.auth0.com"
    clientId="rNVObcbwe3cBncjYmk2KO0NIihqyNfoU"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
