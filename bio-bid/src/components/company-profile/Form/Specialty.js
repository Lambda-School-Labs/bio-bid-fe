import React, { useState } from 'react';

import { SearchAdd, Add, Delete } from './styles';

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
    let subSpecialties = [];
    if(props.specialty.sub_specialties){
        subSpecialties = props.specialty.sub_specialties.map(subSpecialty => subSpecialty.name);
    }
    
    const [ searchSub, setSearchSub ] = useState(false);
    const [ addSub, setAddSub ] = useState(false);
    const [ customSub, setCustomSub ] = useState('');

    const toggleSearchSub = () => {
        setSearchSub(!searchSub);
        setAddSub(false);
    }

    const toggleAddSub = () => {
        setAddSub(!addSub);
        setSearchSub(false);
    }

    const handleSubChange = e => {
        setCustomSub(e.target.value);
    }

    const handleSubSubmit = e => {
        e.preventDefault();
        props.handleCustomSub(props.serviceName, props.specialty.name, customSub);
        setCustomSub('');
    }

    return(
        <>
            <div className='specialty' >
                <p>{props.specialty.name}</p>
                <div className='btn-container'>
                    <SearchAdd onClick={toggleSearchSub} selected={searchSub}/>
                    <Add onClick={toggleAddSub} selected={addSub}/>
                    <Delete onClick={() => props.handleSpecialtyDelete(props.serviceName, props.specialty.name)}/>
                </div>
            </div>
            <div className='sub-specialties'>
                {props.specialty.sub_specialties && props.specialty.sub_specialties.map(subSpecialty => {
                    return (
                        <div className='sub-specialty' key={subSpecialty.name}>
                            <p>- {subSpecialty.name}</p>
                            <Delete onClick={() => props.handleSubDelete(props.serviceName, props.specialty.name, subSpecialty.name)}/>
                        </div>
                    )
                })}
            </div>
            {searchSub && (
                <FormControl className={classes.formControl}>
                    <Select                    
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={(e) => props.handleSubSelect(e, props.specialty.name)}
                        value=''
                        name={props.serviceName}
                    >
                        {props.specialtyData.specialtyItems.filter(specialty => {
                            return subSpecialties.indexOf(specialty.name) < 0;
                        }).map(filtered => {
                            return <MenuItem value={filtered.name} key={filtered.name}>{filtered.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            )}
            {addSub && (
                <form onSubmit={handleSubSubmit}>
                    <TextField 
                        id="standard-helperText" 
                        fullWidth
                        placeholder='Enter new specialty'
                        onChange={handleSubChange}
                        value={customSub}
                    />
                </form>
            )}
        </>
    )
}