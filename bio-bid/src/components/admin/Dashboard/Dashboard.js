import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Dashboard } from "./styles";
import Claims from "./Claims.js";
import Admin from "./Admin.js";
import Info from "./Info/Info";
import { Details, Button } from "./../../company-profile/Details/styles";
import Login from "./../../Login/Login.js";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export default () => {
  const [userInfo, setUserInfo] = useState({});
  const { authService } = useOktaAuth();
  const [selected, setSelected] = useState("0");
  const changeSelected = (num) => {
    setSelected(num);
  };

  useEffect(() => {
    authService.getUser().then(setUserInfo);
  }, [authService]);
//   console.log(userInfo);

  return (
    <>
      <Details>
        <header>
          <div className="header-container">
            <div className="company-name">
              <h2>Admin Dashboard</h2>
              <div className="welcome">
                Welcome Back {userInfo.given_name}
              </div>
            </div>
            <div className="btn-container">
              <Link to="/service-provider/add">
                <Button lg>
                  <p>Add Company</p>
                </Button>
              </Link>
              <Link to="/">
                <Button lg>
                  <p>Service Providers</p>
                </Button>
              </Link>
              <Login component={Login} />
            </div>
          </div>
        </header>
      </Details>
      <Dashboard>
        <NavBar userInfo={userInfo} selected={selected} changeSelected={changeSelected} />
        <div className="main">
          {selected === "0" ? (
            <div className="admin-container">
              <Admin />
            </div>
          ) : null || selected === "1" ? (
            <div className="requests-container">
              <Claims />
            </div>
          ) : null || selected === "2" ? (
            <Info />
          ) : null}
        </div>
      </Dashboard>
    </>
  );
};
