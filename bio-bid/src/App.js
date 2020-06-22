import React from "react";
import { Route } from "react-router-dom";
// Component Imports
import Bids from "./components/bids";
import Form from "./components/company-profile/Form/Form";
import Details from "./components/company-profile/Details/Details";
import List from "./components/company-profile/List/List";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Route path="/bids">
        <Bids />
      </Route>
      <Route exact path="/">
        <List />
      </Route>
      <Route path="/service-providers/:id">
        <Details />
      </Route>
      <Route path="/service-provider/add">
        <Form edit={false} />
      </Route>
      <Route path="/service-provider/edit/:id">
        <Form edit={true} />
      </Route>
      {/* <Route path="/admin/dashboard">
        <Dashboard />
      </Route> */}

      {/* PrivateRoute denies anyone from manually typing in urls like /admin/dashboard */}
      <PrivateRoute path="/admin/dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
