import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import WarningCard from './WarningCard';

import { GET_REGIONS, GET_THERAPEUTICS, GET_SERVICES } from '../../../queries';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Body, Basic, Services, Button, WarningIcon, Arrow } from './styles';


import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300,
    },
        chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const phaseOptions = [
    'I',
    'II',
    'III',
    'IV'
];

export default () => {
    const classes = useStyles();
    const history = useHistory();

    // Queries
    const { data: regionsData } = useQuery(GET_REGIONS);
    const { data: therapeuticsData } = useQuery(GET_THERAPEUTICS);
    const { data: servicesData } = useQuery(GET_SERVICES);

    // State
    const [ confirmCancel, setConfirmCancel ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: '',
        logoURL: '',
        website: '',
        email: '',
        linkedin: '',
        overview: '',
        headquarters: '',
        companySize: ''
    })

    const [ phases, setPhases ] = useState([]);
    const [ regions, setRegions ] = useState([]);
    const [ therapeutics, setTherapeutics ] = useState([]);

    const [ regionsAll, setRegionsAll ] = useState(false);
    const [ therapeuticsAll, setTherapeuticsAll ] = useState(false);
    const [ phasesAll, setPhasesAll ] = useState(false);

    // Event handlers
    const handleMultiple = e => {
        if(e.target.name === 'regions'){
            setRegions(e.target.value);
        }
        if(e.target.name === 'therapeutics'){
            setTherapeutics(e.target.value);
        }   
        if(e.target.name === 'phases'){
            setPhases(e.target.value);
        }
    }

    const setAll = field => {
        if(field === 'regions'){
            setRegions(regionsData.regions.map(region => region.name));
        }
        if(field === 'therapeutics'){
            setTherapeutics(therapeuticsData.therapeutics.map(therapeutic => therapeutic.name));
        }
        if(field === 'phases'){
            setPhases(phaseOptions);
        }
    }

    const clearAll = field => {
        if(field === 'regions'){
            setRegions([]);
        }
        if(field === 'therapeutics'){
            setTherapeutics([]);
        }
        if(field === 'phases'){
            setPhases([])
        }
    }

    const toggleAllTherapeutics = () => {
        setTherapeuticsAll(!therapeuticsAll);
    }

    const toggleAllRegions = () => {
        setRegionsAll(!regionsAll);
    }

    const toggleAllPhases = () => {
        setPhasesAll(!phasesAll);
    }

    const handleCancel = () => {
        setConfirmCancel(!confirmCancel);
    }

    const handleReDirect = () => {
        history.push('/');
    }

    const handleSubmit = () => {
        console.log(formData);
        console.log(phases);
        console.log(regions);
        console.log(therapeutics);
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [ formData ])

    useEffect(() => {
        if(regionsAll){
            setAll('regions');
        }else{
            clearAll('regions');
        }
        if(therapeuticsAll){
            setAll('therapeutics');
        }else{
            clearAll('therapeutics');
        }
        if(phasesAll){
            setAll('phases');
        }else{
            clearAll('phases');
        }
    }, [therapeuticsAll, regionsAll, phasesAll]);
    
    return (
        <Body>
            {confirmCancel && (
                <Backdrop className={classes.backdrop} open={confirmCancel}>
                    <WarningCard handleCancel={handleCancel} handleReDirect={handleReDirect}/>
                </Backdrop>
            )}
            <header>
                <div className='header-content'>
                    <h2>Create Company Profile</h2>
                    <div className='btn-container' onClick={handleCancel}>
                        <Arrow/>
                        <p className='grey'>Back</p>
                    </div>
                </div>
            </header>
            <div className='form-wrapper'>
                <div className='import-container'>
                    <h3>LinkedIn Import</h3>
                    <p className='text'>Would you like to import your LinkedIn data to fill out your basic information?</p>
                    <div className='warning-container'>
                        <WarningIcon/>
                        <p className='text'>Warning: All current data on this page will be overwritten.</p>
                    </div>
                    <Button color='scienceBlue'><p>Import</p></Button>
                </div>
                <Basic>
                    <h3>Basic Information</h3>
                    <div className='form-wrapper'>
                        <div className='form'>
                            <div className='row'>
                                <div className='input-box'>
                                    <label>Company Name</label>
                                    <input
                                        name='name'
                                        onChange={handleChange}
                                        value={formData.name}
                                    />
                                </div>
                                <div className='input-box'>
                                    <label>RFP Email</label>
                                    <input
                                        name='email'
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-box'>
                                    <label>LinkedIn</label>
                                    <input
                                        name='linkedin'
                                        onChange={handleChange}
                                        value={formData.linkedin}
                                    />
                                </div>
                                <div className='input-box'>
                                    <label>Website</label>
                                    <input
                                        name='website'
                                        onChange={handleChange}
                                        value={formData.website}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-box'>
                                    <label>Headquarters</label>
                                    <input
                                        name='headquarters'
                                        onChange={handleChange}
                                        value={formData.headquarters}
                                    />
                                </div>
                                <div className='input-box'>
                                    <label>Company Size</label>
                                    <select
                                        name='companySize'
                                        onChange={handleChange}
                                        value={formData.companySize}
                                    >
                                        <option value='' defaultValue disabled hidden>Choose company size</option>
                                        <option value='N/A'>N/A</option>
                                        <option value='A'>A: Self Employed</option>
                                        <option value='B'>B: 1-10 Employees</option>
                                        <option value='C'>C: 11-50 Employees</option>
                                        <option value='D'>D: 51-200 Employees</option>
                                        <option value='E'>E: 201-500 Employees</option>
                                        <option value='F'>F: 501-1,000 Employees</option>
                                        <option value='G'>G: 1,001-5,000 Employees</option>
                                        <option value='H'>H: 5,001-10,000 Employees</option>
                                        <option value='I'>I: 10,000+ Employees</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-box'>
                                    <label>Regions Covered</label>
                                    {regionsData && (
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                multiple
                                                value={regions}
                                                onChange={handleMultiple}
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                                name='regions'
                                            >
                                            <MenuItem key='All' value='All' onClick={toggleAllRegions}>
                                                <Checkbox checked={regionsAll}/>
                                                <ListItemText primary='All'/>
                                            </MenuItem>
                                            {regionsData.regions.map(region => (
                                                <MenuItem key={region.name} value={region.name}>
                                                    <Checkbox checked={regions.indexOf(region.name) > -1} />
                                                    <ListItemText primary={region.name} />
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                                <div className='input-box'>
                                    <label>Therapeutic Areas</label>
                                    {therapeuticsData && (
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                multiple
                                                value={therapeutics}
                                                onChange={handleMultiple}
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                                name='therapeutics'
                                            >
                                            <MenuItem key='All' value='All' onClick={toggleAllTherapeutics}>
                                                <Checkbox checked={therapeuticsAll}/>
                                                <ListItemText primary='All'/>
                                            </MenuItem>
                                            {therapeuticsData.therapeutics.map(therapeutic => (
                                                <MenuItem key={therapeutic.name} value={therapeutic.name}>
                                                    <Checkbox checked={therapeutics.indexOf(therapeutic.name) > -1} />
                                                    <ListItemText primary={therapeutic.name} />
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-box'>
                                    <label>Clinical Trial Phases</label>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={phases}
                                        onChange={handleMultiple}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        name='phases'
                                        >
                                        <MenuItem key='All' value='All' onClick={toggleAllPhases}>
                                            <Checkbox checked={phasesAll}/>
                                            <ListItemText primary='All'/>
                                        </MenuItem>
                                        {phaseOptions.map(phase => (
                                            <MenuItem key={phase} value={phase}>
                                                <Checkbox checked={phases.indexOf(phase) > -1} />
                                                <ListItemText primary={phase} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='input-box'>
                                    <label>Company Overview</label>
                                    <textarea
                                        name='overview'
                                        value={formData.overview}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Basic>
                <Services>
                    <h3>Services</h3>
                    <div className='service-container'>
                        <div className='wrapper'>
                            <div className='container-col'>
                                <label>Add Services</label>
                            </div>     
                            <div className='container-col'>
                                <p>Overview</p>
                            </div>             
                        </div>
                    </div>
                    
                </Services>
                <div className='btn-wrapper'>
                    <div className='btn-container'>
                        <Button color='sun' onClick={handleCancel}><p>Cancel</p></Button>
                        <Button color='scienceBlue' marginLeft='10px' onClick={handleSubmit}><p>Submit</p></Button>
                    </div>
                </div>
            </div>
        </Body>
    );
}