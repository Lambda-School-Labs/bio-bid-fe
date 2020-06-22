import React, { useState } from 'react';
import NavBar from './NavBar';
import { Dashboard } from './styles';
import Admin from './Admin.js';

import Info from './Info/Info';

export default () => {
  const [selected, setSelected] = useState('0');

  const changeSelected = (num) => {
    setSelected(num);
  };

  return (
    <Dashboard>
      <NavBar selected={selected} changeSelected={changeSelected} />
      <div className="main">
        {selected === '0' ? (
          <div className="admin-container">
            <Admin />
          </div>
        ) : null || selected === '1' ? (
          <div className="requests-container">
            <h1>Claim Requests</h1>
          </div>
        ) : null || selected === '2' ? (
          <Info />
        ) : null}
      </div>
    </Dashboard>
  );
};
