import React, { useState } from 'react';
import { Service, AddCircle, Add, SearchAdd, Option, OptionBtn, SpecialtyList, Delete } from './styles';

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
                        >
                            {props.specialtyData.specialtyItems.map(specialty => {
                                return <MenuItem value={specialty.name} key={specialty.name}>{specialty.name}</MenuItem>         
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
                        <div className='specialty' key={specialty.name}>
                            <p>{specialty.name}</p>
                            <div className='btn-container'>
                                <SearchAdd/>
                                <Add/>
                                <Delete onClick={() => props.handleSpecialtyDelete(props.service.name, specialty.name)}/>
                            </div>
                        </div>
                    )
                })}
            </SpecialtyList>
        </>
    );
}