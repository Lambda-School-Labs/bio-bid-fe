import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginCallback, useOktaAuth } from "@okta/okta-react";
import "./Login.css";

export default function AutoLogin() {
  const { authService } = useOktaAuth();
  let location = useLocation();

  useEffect(() => {
    authService.handleAuthentication();
    if (location.hash.includes("#id_token")) {
      authService.login("/");
      // redirect to 'home' after login
    }
  });
  // uncomment/comment these for auth and user information
  // console.log("authservice/state:", authService);
  // authService.getUser().then(console.log);

  return (
    <div>
      <div style={{ display: "none" }}>
        <LoginCallback style={{ width: "1px" }} />
      </div>
    </div>
  );
}
