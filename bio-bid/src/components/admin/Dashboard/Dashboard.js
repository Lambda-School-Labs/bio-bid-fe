import React, { useState } from 'react';
import NavBar from './NavBar';
import { Dashboard } from './styles';
import Claims from "./Claims.js";
import Admin from "./Admin.js";

export default () => {
    const [selected, setSelected ] = useState('0');
    const changeSelected = num => {
        setSelected(num);
    }

    return (
        <Dashboard>
            <NavBar selected={selected} changeSelected={changeSelected}/>
            <div className='main'>
                {
                    selected === '0' ? 
                    <div className="admin-container">
                        <Admin />
                    </div> : null ||

                    
                    selected === '1' ? 
                    <div className="requests-container">
                        <Claims />
                    </div> : null ||


                    selected === '2' ? <h1>Info</h1> : null
                }
            </div>
        </Dashboard>
    );
}