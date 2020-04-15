import React, { useState, useEffect } from 'react';

/* STYLE IMPORT */
import '../styles/CP-table.css';

/* COMPONENT IMPORTS */
import Row from './CP-table-row';

/* This the core table for the dashboard. All 'rows' will be dynamically generated from the API.
   Will be adjusted to fit a more suitable and reasonable means in the future as time progresses. */
const Table = (props) => {

    return(
        <div id='table-wrapper'>
            <div id='table-header-container'>
                <p style={{ width: '6%' }} class='table-header-item'>BIDS</p>
                <p style={{ width: '10%' }} class='table-header-item'>NAME</p>
                <p style={{ width: '20%' }} class='table-header-item'>THERAPEUTIC AREA</p>
                <p style={{ width: '15%' }} class='table-header-item'>PROTOCOL NO./TITLE</p>
                <p style={{ width: '10%' }} class='table-header-item'>PHASE</p>
                <p style={{ width: '15%' }} class='table-header-item'>SERVICE LIST</p>
                <p style={{ width: '10%' }} class='table-header-item'>MODIFIED DATE</p>
                <p style={{ width: '12%', textAlign: 'center' }} class='table-header-item'>ACTIONS</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Row first='first' active={true} name='Second study' status='Closed' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row active={false} name='Second study' status='Open' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row first='first' active={true} name='Second study' status='Closed' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row active={false} name='Second study' status='Open' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row first='first' active={true} name='Second study' status='Closed' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row active={false} name='Second study' status='Open' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row first='first' active={true} name='Second study' status='Closed' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='III' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row active={false} name='Second study' status='Open' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row first='first' active={true} name='Second study' status='Closed' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='IV' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row active={false} name='Second study' status='Open' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='I' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
                <Row first='first' active={true} name='Second study' status='Closed' thera='Inflammation Indication: Back pain Molecule type: Chemical' protocol='ABZ-123' proto_title='Atest' phase='II' service_list='1' mod_date='April 19, 2019' mod_time='07:09:50 AM' />
            </div>
        </div>
    );

}

export default Table;