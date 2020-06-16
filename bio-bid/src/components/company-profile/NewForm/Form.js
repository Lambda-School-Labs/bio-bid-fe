import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import WarningCard from './WarningCard';
import Service from './Service';

import { GET_REGIONS, GET_THERAPEUTICS, GET_SERVICES, GET_SPECIALTIES, GET_COMPANY_BY_ID } from '../../../queries';
import { ADD_COMPANY, EDIT_COMPANY } from '../../../mutations';

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
    const { data: specialtyData } = useQuery(GET_SPECIALTIES);
    // const { loading, error: companyError, data: companyData } = useQuery(GET_COMPANY_BY_ID, {
    //     variables: { id },
    // })

    // Mutations
    const [ addCompany ] = useMutation(ADD_COMPANY, {
        update: (proxy, result) => {
            setNewId(result.data.createCompany.id);
        }
    });
    const [ editCompany ] = useMutation(EDIT_COMPANY);

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
    const [ services, setServices ] = useState([
        {
            name: 'Service 1',
            specialties: [
                {
                    name: 'Specialty 1'
                }
            ]
        }
    ]);

    const [ regionsAll, setRegionsAll ] = useState(false);
    const [ therapeuticsAll, setTherapeuticsAll ] = useState(false);
    const [ phasesAll, setPhasesAll ] = useState(false);

    const [ error, setError ] = useState('');
    const [ newId, setNewId ] = useState(null);
    const [ submitting, setSubmitting ] = useState(false);

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
        if(e.target.name === 'services'){
            /*
                services state = old array
                e.target.value = new array
                Compare [new and old array] to see if a services has been removed or added
                    - If a services has been added, add the new service to [old array]
                    - If a services has been removed, remove the service from [old array]
                Now that [old array] has been changed, it has updated state

                Comparing Algorithm
                    - Check the length of [old array]
                        - If [new array] is longer, we know there is a new service.
                            - Use [new array] and pull the last index and add it to [old array]
                        - If [new array] is shorter, we know a service has been removed.
                            - Alphabetically sort [old array and new array]
                            - Starting at index 0, compare each index of both arrays
                                - When a value doesn't match in the old array, this is the removed service
                                    - Remove that service from the original services state
            */
            if(e.target.value.length > services.length){
                const newService = e.target.value[e.target.value.length - 1];
                setServices([
                    ...services,
                    {
                        name: newService
                    }
                ])
            }else{
                const oldArray = services.map(service => service.name);
                const newArray = e.target.value;
                oldArray.sort();
                newArray.sort();
                let i=0;
                while(true){
                    if(oldArray[i] === newArray[i]){
                        i++;
                    }else{
                        setServices(services.filter(service => service.name !== oldArray[i]));
                        return;
                    }
                }
            }

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

    const handleSubmit = async () => {
        if(!formData.name){
            setError('Missing name field');
            window.scrollTo(0, 0);
        }else{
            setSubmitting(true);
            console.log(formData);
            console.log('phases', phases);
            console.log(regions);
            console.log(therapeutics);
            console.log({
                ...formData,
                regions: regions.map(region => ({name: region})),
                therapeutics: therapeutics.map(therapeutic => ({name: therapeutic})),
                phases: phases
            })
            try{
                await addCompany({ variables: {
                    name: formData.name,
                    logoURL: formData.logoURL,
                    website: formData.website,
                    linkedin: formData.linkedin,
                    overview: formData.overview,
                    headquarters: formData.headquarters,
                    companySize: formData.companySize === '' ? null : formData.companySize,
                    regions: regions.map(region => ({name: region})),
                    therapeutics: therapeutics.map(therapeutic => ({name: therapeutic})),
                    phases: phases.length === 0 ? [] : phases
                }})
                
                setSubmitting(false);
            }catch(error){
                console.log(error);
                setError('Company Name Already Exists');
                setSubmitting(false);
            }
        }
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSpecialtyChange = e => {
        console.log(e.target.value)
        const service = services.filter(service => service.name === e.target.name);
        setServices([
            ...services.filter(service => service.name !== e.target.name),
            {
                name: e.target.name,
                specialties: [
                    ...service[0].specialties,
                    {
                        name: e.target.value
                    }
                ]
            }
        ])
    } 

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
            {submitting && (
                <Backdrop className={classes.backdrop} open={submitting}>
                    <CircularProgress color='inherit'/>
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
            {error.length > 1 && (
                <div className='error'>
                    <p>{error}</p>
                </div>
            )}
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
                                    <label>Company Name*</label>
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
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            name='companySize'
                                        >
                                            <MenuItem value=''>N/A</MenuItem>
                                            <MenuItem value='A'>Self Employed</MenuItem>
                                            <MenuItem value='B'>1-10 Employees</MenuItem>
                                            <MenuItem value='C'>11-50 Employees</MenuItem>
                                            <MenuItem value='D'>51-200 Employees</MenuItem>
                                            <MenuItem value='E'>201-500 Employees</MenuItem>
                                            <MenuItem value='F'>501-1,000 Employees</MenuItem>
                                            <MenuItem value='G'>1,001-5,000 Employees</MenuItem>
                                            <MenuItem value='H'>5,001-10,000 Employees</MenuItem>
                                            <MenuItem value='I'>10,000+ Employees</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                                placeholder='Select Regions'
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
                                {servicesData && (
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="demo-mutiple-checkbox-label"
                                            id="demo-mutiple-checkbox"
                                            multiple
                                            value={services.map(service => service.name)}
                                            onChange={handleMultiple}
                                            input={<Input />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                            name='services'
                                        >
                                        {servicesData.serviceItems.map(service => (
                                            <MenuItem key={service.name} value={service.name}>
                                                <Checkbox checked={services.map(service => service.name).indexOf(service.name) > -1} />
                                                <ListItemText primary={service.name} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                )}
                                {specialtyData && services.map(service => {
                                    return <Service 
                                                service={service} 
                                                specialtyData={specialtyData} 
                                                handleSpecialtyChange={handleSpecialtyChange}
                                                key={Math.random()}
                                            />
                                })}
                                
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