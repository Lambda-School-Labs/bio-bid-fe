import React, { useState } from 'react';
import { Service, Plus } from './styles';

export default (props) => {
    const [ specialtyOpen, setSpecialtyOpen ] = useState(false);

    const toggleSpecialtyOpen = () => {
        setSpecialtyOpen(!specialtyOpen);
    }

    return (
        <Service key={Math.random()} specialtyOpen={specialtyOpen}>
            <div className='service-header'>
                <p>{props.service}</p>
                <div className='add-service' onClick={toggleSpecialtyOpen}>
                    <Plus/>
                    <p>Add Specialty</p>
                </div>
            </div>
            <input
                
            />
            <div className='dropdown'>

            </div>
        </Service>
    );
}