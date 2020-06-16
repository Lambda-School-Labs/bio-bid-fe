import React, { useState } from 'react';
import { Service, Plus, Option, OptionBtn } from './styles';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 298
    }
}));

export default (props) => {
    const classes = useStyles();

    const [ specialtyOpen, setSpecialtyOpen ] = useState(false);
    const [ searchSelected, setSearchSelected ] = useState(false);
    const [ newSelected, setNewSelected ] = useState(false);

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

    return (
        <Service key={Math.random()} specialtyOpen={specialtyOpen}>
            <div className='service-header'>
                <p>{props.service.name}</p>
                <div className='add-service' onClick={toggleSpecialtyOpen}>
                    <Plus/>
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
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            )}
            {newSelected && (
                <TextField 
                    id="standard-helperText" 
                    fullWidth
                    placeholder='Enter new specialty'
                />
            )}
        </Service>
    );
}