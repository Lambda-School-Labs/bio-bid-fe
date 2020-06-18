import React from "react";
import { Route } from "react-router-dom";

// Component Imports
import Bids from './components/bids';
import Details from './components/company-profile/Details/Details';
import List from './components/company-profile/List/List';
import Form from './components/company-profile/Form/Form';

import Dashboard from './components/admin/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <Route path='/bids'>
        <Bids />
      </Route>
      <Route exact path='/'>
        <List/>
      </Route>
      <Route path='/service-provider/add'>
        <Form edit={false} />
      </Route>
      <Route path='/service-providers/:id'>
        <Details />
      </Route>
      <Route path='/service-provider/edit/:id'>
        <Form edit={true} />
      </Route>
      <Route path='/admin/dashboard'>
        <Dashboard/>
      </Route>
    </div>
  );
}

export default App;
