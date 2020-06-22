import React, { useState } from 'react';
import { Service, AddCircle, Option, OptionBtn, SpecialtyList } from './styles';

import Specialty from './Specialty';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 298
    }
}));

export default (props) => {
    const classes = useStyles();

    const specialtyData = props.service.specialties.map(specialty => specialty.name);

    const [ specialtyOpen, setSpecialtyOpen ] = useState(false);
    const [ searchSelected, setSearchSelected ] = useState(false);
    const [ newSelected, setNewSelected ] = useState(false);
    const [ customSpecialty, setCustomSpecialty ] = useState('');

    const toggleSpecialtyOpen = () => {
        setSpecialtyOpen(!specialtyOpen);
        setNewSelected(false);
        setSearchSelected(false);
    }

    const toggleSearchSelected = () => {
        setSearchSelected(!searchSelected);
        setNewSelected(false);
    }

    const toggleNewSelected = () => {
        setNewSelected(!newSelected);
        setSearchSelected(false);
    }

    const handleChange = e => {
        setCustomSpecialty(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.handleCustomSpecialty(props.service.name, customSpecialty);
        setCustomSpecialty('');
    }

    return (
        <>
            <Service specialtyOpen={specialtyOpen}>
                <div className='service-header'>
                    <p>{props.service.name}</p>
                    <div className='add-service' onClick={toggleSpecialtyOpen}>
                        <AddCircle/>
                        <p>Add Specialty</p>
                    </div>
                </div>
                <Option open={specialtyOpen}>
                    <OptionBtn className='button' onClick={toggleSearchSelected} selected={searchSelected} borderRight>
                        <p>Search existing</p>
                    </OptionBtn>
                    <OptionBtn className='button' onClick={toggleNewSelected} selected={newSelected}>
                        <p>Add new</p>
                    </OptionBtn>
                </Option>
                {searchSelected && (
                    <FormControl className={classes.formControl}>
                        <Select                    
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={props.handleSpecialtyChange}
                            value=''
                            name={props.service.name}
                            placeholder='Select specialty'
                        >
                            {props.specialtyData.specialtyItems.filter(specialty => {
                                return specialtyData.indexOf(specialty.name) < 0;
                            }).map(filtered => {
                                return <MenuItem value={filtered.name} key={filtered.name}>{filtered.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                )}
                {newSelected && (
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            id="standard-helperText" 
                            fullWidth
                            placeholder='Enter new specialty'
                            onChange={handleChange}
                            value={customSpecialty}
                        />
                    </form>
                )}
            </Service>
            <SpecialtyList>
                {props.service.specialties && props.service.specialties.map(specialty => {
                    return (
                        <Specialty
                            key={specialty.name}
                            specialty={specialty}
                            serviceName={props.service.name}
                            handleSpecialtyDelete={props.handleSpecialtyDelete}
                            handleSelect={props.handleSelect}
                            handleSubSelect={props.handleSubSelect}
                            specialtyData={props.specialtyData}
                            handleSubDelete={props.handleSubDelete}
                            handleCustomSub={props.handleCustomSub}
                        />
                    )
                })}
            </SpecialtyList>
        </>
    );
}