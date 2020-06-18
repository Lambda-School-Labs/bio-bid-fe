// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { GET_COMPANY_BY_ID, GET_REGIONS, GET_THERAPEUTICS, GET_SERVICES, GET_SPECIALTIES } from '../../../queries';
// import { ADD_COMPANY, EDIT_COMPANY } from '../../../mutations';
// import { useHistory, useParams } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

// import WarningCard from './WarningCard';
// import MultipleInput from './MultipleInput';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { Body, LinkedIn, Button, Form, HeaderError, SucceessMessage } from './styles';

// import scienceAsset from '../../../images/science-asset.svg';
// import defaultLogo from '../../../images/default-company-logo.png';
// import theme from '../../../theme';

// const useStyles = makeStyles((theme) => ({
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: '#fff',
//     },
//   }));

// export default (props) => {
//     // id will only be available if props.edit === true
//     const { id } = useParams();

//     const classes = useStyles();
//     const history = useHistory();

//     /*
//         open - Boolean state for whether the backdrop for warnings/loading should be opened.
//         importWarning - Boolean state for warning type when attempting to import
//         linkedInError - Boolean state based on if the linkedInUrl in the `linkedin` input field is valid
//         appError - Stores any errors that exist in the Form component
//         headerError - Boolean state for whether an error should be displayed or not
//         headerErrorText - Stores the value of the error
//         headerSuccess- Boolean state for when changes are saved successfully
//         logo - The current logo image pulled in from LinkedIn/default
//         regions, therapeutics, services, specialties - State to keep track of the mapped 
//             data from the database for these properties
//         newId - When creating a new company profile, this is the new id is stored here
//         addLoading - State to determine if the mutation to add/update a company is loading
//     */
//     const [ open, setOpen ] = useState(false);
//     const [ importWarning, setImportWarning ] = useState(false);
//     const [ linkedInError, setLinkedInError] = useState(false);
//     const [ appError, setAppError] = useState(null);
//     const [ headerError, setHeaderError ] = useState(false);
//     const [ headerErrorText, setHeaderErrorText ] = useState('');
//     const [ headerSuccess, setHeaderSuccess ] = useState(false);
//     const [ logo, setLogo ] = useState(defaultLogo);
//     const [ regions, setRegions ] = useState(null);
//     const [ therapeutics, setTherapeutics ] = useState(null);
//     const [ services, setServices ] = useState(null);
//     const [ specialties, setSpecialties ] = useState(null);
//     const [ newId, setNewId ] = useState(null);
//     const [ addLoading, setAddLoading ] = useState(false);

//     /*
//         useQuery and useMutation
//         - useQuery will accept a gql query that is defined in the `src/queries` directory.
//             - Conditionally returns a `loading` boolean true/false based on if the query is running
//             - Conditionally returns an `error` object if there was an error with the query
//             - Conditionally returns the `data` requested by the query if successful
//         - useMutation will accept a gql mutation that is defined in the `src/mutations` directory.
//             - Returns a functions that can be used to insert data into the mutation as arguments
//             - Example: 
//                 addCompany({ variables: formData }) 
//                 addCompany({ variables: {name: formData.name, imgURL: formData.imgURL} })
            
//     */
//     const { loading: companyLoading, error: companyError, data: companyData } = useQuery(GET_COMPANY_BY_ID, { 
//         variables: { id },
//         skip: !props.edit
//     });

//     const { error: regionsError, data: regionsData } = useQuery(GET_REGIONS);
//     const { error: therapeuticsError, data: therapeuticsData } = useQuery(GET_THERAPEUTICS);
//     const { error: servicesError, data: servicesData} = useQuery(GET_SERVICES);
//     const { error: specialtiesError, data: specialtiesData } = useQuery(GET_SPECIALTIES);

//     const [ addCompany ] = useMutation(ADD_COMPANY, {
//         update: (proxy, result) => {
//             setNewId(result.data.createCompany.id);
//         }
//     });

//     const [ editCompany ] = useMutation(EDIT_COMPANY);

//     /*
//         formData
//         - Inputs in the form components are controlled with `handleUpdate` and `handleMultiUpdate`.
//         - Everything is saved in formData state until the component is unMounted 
//             or there is a successful submission in `handleSubmit`
//     */
//     const [ formData, setFormData ] = useState({
//         name: '',
//         logoURL: '',
//         website: '',
//         linkedin: '',
//         overview: '',
//         headquarters: '',
//         companySize: '',
//         services: [],
//         specialties: [],
//         regionsCovered: [],
//         therapeuticAreas: []
//     })

//     /*
//         handleImportWarning
//         - Checks to se if there is a valid LinkedInURL. The state of `linkedInError` is set
//             in a useEffect hook that checks the linkedin input every time it is updated
//     */
//     const handleImportWarning = () => {
//         if(!linkedInError){
//             setImportWarning(true);
//             setOpen(true);
//         }
//     }

//     const handleCancelWarning = () => {
//         setOpen(true);
//     }  

//     const handleWarningClose = () => {
//         setImportWarning(false);
//         setOpen(false);
//     }

//     const handleUpdate = e => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleMultiUpdate = (name, element) => {
//         setFormData({
//             ...formData,
//             [name]: element.map(value => {
//                 return {'name': value}
//             })
//         })
//     }

//     /*
//         Submit event handler
//         - Handles sending the formData to backend for adding a new company
//         - Handles sending the formData to the backend for edits
//         - Checks to make sure that the name field isn't null or empty
//         - Handles loading state to display a spinner while mutations run
//     */
//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         if(props.edit){
//             if(!formData.name){
//                 setHeaderError(true);
//                 setHeaderErrorText('Missing required field: Company Name');
//                 window.scrollTo(0, 0);
//             }else{
//                 setHeaderError(false);
//                 setHeaderErrorText('');
//                 setAddLoading(true);
//                 try{
//                     await editCompany({ variables: {
//                         id: id,
//                         name: formData.name,
//                         logoURL: formData.logoURL,
//                         website: formData.website,
//                         linkedin: formData.linkedin,
//                         overview: formData.overview,
//                         headquarters: formData.headquarters,
//                         companySize: formData.companySize === '' ? null : formData.companySize,
//                         regions: formData.regionsCovered,
//                         therapeutics: formData.therapeuticAreas,
//                         services: formData.services,
//                         specialties: formData.specialties
//                     }});
//                     setAddLoading(false);
//                     setHeaderSuccess(true);
//                 }
//                 catch(error){
//                     console.log(error);
//                     setAddLoading(false);
//                     setHeaderError(true);
//                     setHeaderErrorText('The company name already exists');
//                 }
//             }
//         }else{
//             if(!formData.name){
//                 setHeaderError(true);
//                 setHeaderErrorText('Missing required field: Company Name');
//                 window.scrollTo(0, 0);
//             }else{
//                 setHeaderError(false);
//                 setHeaderErrorText('');
//                 setAddLoading(true);
//                 try{
//                     await addCompany({ variables: {
//                         name: formData.name,
//                         logoURL: formData.logoURL,
//                         website: formData.website,
//                         linkedin: formData.linkedin,
//                         overview: formData.overview,
//                         headquarters: formData.headquarters,
//                         companySize: formData.companySize === '' ? null : formData.companySize,
//                         regions: formData.regionsCovered,
//                         therapeutics: formData.therapeuticAreas,
//                         services: formData.services,
//                         specialties: formData.specialties
//                     }});
//                     setAddLoading(false);
//                 }
//                 catch(error){
//                     console.log(error);
//                     setAddLoading(false);
//                     setHeaderError(true);
//                     setHeaderErrorText('The company name already exists');
//                 }
//             }
//         }        
//     }

//     const handleReDirect = () => {
//         if(props.edit){
//             history.push(`/service-providers/${id}`);
//         }else{
//             history.push('/')
//         }
//     }

//     const validateUrl = url => {
//         const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
//         if(regex.test(url)) return true;
//         return false;
//     }

//     /*
//         Handle LinkedIn error
//         - If the url in the linkedin input field is invalid, display an error below the input field
//         - If the url is valid, the error goes away
//     */
//     useEffect(() => {
//         if(formData.linkedin && validateUrl(formData.linkedin)){
//             setLinkedInError(false);
//             setAppError('');
//         }else{
//             if(formData.linkedin.length > 0){
//                 setLinkedInError(true);
//                 setAppError('Must enter a valid LinkedIn URL')
//             }else{
//                 setLinkedInError(false);
//                 setAppError('');
//             } 
//         }
//     }, [ formData.linkedin ])

//     /*
//         Fill in current data
//         - When editing a company profile, chances are that the profile is already filled out
//         - All current data stored with the profile in the database is filled in here to
//             display on the UI for the user
//     */
//     useEffect(() => {
//         if(props.edit){
//             if(companyData){
//                 setHeaderErrorText('');
//                 setHeaderError(false);
//                 const regionsMapped = companyData.company.regions.map(region => ({ name: region.name }));
//                 const therapeuticsMapped = companyData.company.therapeutics.map(therapeutic => ({ name: therapeutic.name }));
//                 const servicesMapped = companyData.company.services.map(service => ({ name: service.name }));
//                 const specialtiesMapped = companyData.company.specialties.map(specialty => ({ name: specialty.name }));
//                 setFormData({
//                     name: companyData.company.name,
//                     logoURL: companyData.company.logoURL,
//                     website: companyData.company.website,
//                     linkedin: companyData.company.linkedin,
//                     overview: companyData.company.overview,
//                     headquarters: companyData.company.headquarters,
//                     companySize: companyData.company.companySize ? companyData.company.companySize : '',
//                     regionsCovered: regionsMapped,
//                     therapeuticAreas: therapeuticsMapped,
//                     services: servicesMapped,
//                     specialties: specialtiesMapped
//                 })
//             }
//             if(companyError){
//                 setHeaderError(true);
//                 setHeaderErrorText('Error fetching previous company data');
//             }
//         }
//     }, [ props.edit, companyData, companyError ])

//     /*
//         Updating suggestive data
//         - Suggestive data is querried from backend and stored in their respective array
//         - This useEffects updates and structures the state so that it may be passed 
//             to its appropiate MultipleInput component
//         - TODO?: Display any errors in the UI for feedback to the user
//     */
//     useEffect(() => {
//         if(regionsData){
//             const mappedData = regionsData.regions.map(region => ({ name: region.name }))
//             setRegions(mappedData);
//         }
//         if(regionsError){
//             console.log(regionsError);
//         }

//         if(therapeuticsData){
//             const mappedData = therapeuticsData.therapeutics.map(therapeutic => ({ name: therapeutic.name }));
//             setTherapeutics(mappedData);
//         }
//         if(therapeuticsError){
//             console.log(therapeuticsError);
//         }

//         if(servicesData){
//             const mappedData = servicesData.services.map(service => ({ name: service.name }));
//             setServices(mappedData);
//         }
//         if(servicesError){
//             console.log(servicesError);
//         }

//         if(specialtiesData){
//             const mappedData = specialtiesData.specialties.map(specialty => ({ name: specialty.name }));
//             setSpecialties(mappedData);
//         }
//         if(specialtiesError){
//             console.log(specialtiesError);
//         }
//     }, [ regionsData, regionsError, therapeuticsData, therapeuticsError, servicesData, servicesError, specialtiesData, specialtiesError ]);

//     /*
//         Filling in logo url
//         - If there is a logo url stored in the database, overwrite the default logo
//     */
//     useEffect(() => {
//         if(formData.logoURL){
//             setLogo(formData.logoURL);
//         }
//     }, [ formData.logoURL ]);

//     /*
//         Re-direct on successful submission
//         - When creating a new company, if an id is successfully returned, re-direct to the new company profile
//     */
//     useEffect(() => {
//         if(!props.edit && newId && !addLoading){
//             history.push(`/service-providers/${newId}`)
//         }
//     }, [ props.edit, newId, addLoading, history ])

//     useEffect(() => {
//         if(headerSuccess === true){
//             setTimeout(() => {
//                 setHeaderSuccess(false);
//             }, 3000)
//         }
//     }, [ headerSuccess ]);

//     return (
//         <Body>
//             <Backdrop className={classes.backdrop} open={open}>
//                 {importWarning ? (
//                     <WarningCard close={handleWarningClose} warning='import'/>
//                 ) : (
//                     <WarningCard close={handleWarningClose} warning='cancel' action={handleReDirect} data-testid='warning-card'/>
//                 )}
//             </Backdrop>
//             <Backdrop className={classes.backdrop} open={companyLoading}>
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//             <Backdrop className={classes.backdrop} open={addLoading}>
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//             <HeaderError display={headerError ? 1 : 0} data-testid='header-error'>
//                 <p>{headerErrorText}</p>
//             </HeaderError>
//             <SucceessMessage display={headerSuccess ? 1 : 0} data-testid='header-success'>
//                 <p>Changes were successfully saved</p>
//             </SucceessMessage>
//             <div className='body'>
//                 <div className='header-wrapper'>
//                     {props.edit ? (
//                         <h1>Edit company profile</h1>
//                     ) : (
//                         <h1>Add company profile</h1>
//                     )}
//                     <div className='btn-container'>
//                         <Button onClick={handleImportWarning}>
//                             <LinkedIn/>
//                             <p>Import</p>
//                         </Button>
//                         <Button onClick={handleCancelWarning} cancel='true'>
//                             <p>Cancel</p>
//                         </Button>    
//                     </div>
//                 </div>
//                 <div className='bar'/>
//                 <Form>
//                     <div className='top-row'>
//                         <div className='side-bar'>
//                             <img src={logo} alt='company'/>
//                             <Button noMargin onClick={handleSubmit} id='submit-test'>
//                                 {props.edit ? (
//                                     <p>Save changes</p>
//                                 ) : (
//                                     <p>Add company</p>
//                                 )}
//                             </Button>
//                         </div>
//                         <div className='col-custom'>
//                             <div className='input-container'>
//                                 <label>Company Name</label>
//                                 <input
//                                     name='name'
//                                     value={formData.name}
//                                     onChange={handleUpdate}
//                                     data-testid='name'
//                                 />
//                             </div>
//                             <div className='input-container'>
//                                 <label>Website</label>
//                                 <input
//                                     name='website'
//                                     value={formData.website}
//                                     onChange={handleUpdate}
//                                 />
//                             </div>
//                             <div className='input-container'>
//                                 <label>Company Description</label>
//                                 <textarea
//                                     name='overview'
//                                     value={formData.overview}
//                                     onChange={handleUpdate}
//                                 />
//                             </div>
//                         </div>
//                         <div className='col-custom'>
//                             <div className='input-container' style={{
//                                  marginBottom: linkedInError ? '18px' : '40px'
//                             }}>
//                                 <label>LinkedIn</label>
//                                 <div className='linkedIn-container'>
//                                     <input
//                                         name='linkedin'
//                                         value={formData.linkedin}
//                                         onChange={handleUpdate}
//                                         style={{ 
//                                             borderColor: linkedInError ? 'red' : theme.colors.silver,
//                                         }}
//                                     />
//                                     <p className='error'>{appError}</p>
//                                 </div>
//                             </div>
//                             <div className='input-container'>
//                                 <label>Headquarters</label>
//                                 <input
//                                     name='headquarters'
//                                     value={formData.headquarters}
//                                     onChange={handleUpdate}
//                                 />
//                             </div>
//                             <div className='input-container'>
//                                 <label>Company Size</label>
//                                 <select 
//                                     name='companySize' 
//                                     value={formData.companySize}
//                                     onChange={handleUpdate}
//                                 >
//                                     <option value='' defaultValue disabled hidden>Choose company size</option>
//                                     <option value='N/A'>N/A</option>
//                                     <option value='A'>A: Self Employed</option>
//                                     <option value='B'>B: 1-10 Employees</option>
//                                     <option value='C'>C: 11-50 Employees</option>
//                                     <option value='D'>D: 51-200 Employees</option>
//                                     <option value='E'>E: 201-500 Employees</option>
//                                     <option value='F'>F: 501-1,000 Employees</option>
//                                     <option value='G'>G: 1,001-5,000 Employees</option>
//                                     <option value='H'>H: 5,001-10,000 Employees</option>
//                                     <option value='I'>I: 10,000+ Employees</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='bottom-row'>
//                         <div className='multi-container'>
//                             <label>Regions Covered</label>
//                             {regions && (
//                                 <MultipleInput 
//                                 name='regionsCovered' 
//                                 suggestions={regions} 
//                                 preview={formData.regionsCovered}
//                                 handleMultiUpdate={handleMultiUpdate}
//                             />
//                             )}
//                         </div>
//                         <div className='multi-container'>
//                             <label>Therapeutic Areas</label>
//                             {therapeutics && (
//                                 <MultipleInput 
//                                 name='therapeuticAreas' 
//                                 suggestions={therapeutics} 
//                                 preview={formData.therapeuticAreas}
//                                 handleMultiUpdate={handleMultiUpdate}
//                             />
//                             )}
//                         </div>
//                         <div className='multi-container'>
//                             <label>Services</label>
//                             {services && (
//                                 <MultipleInput 
//                                 name='services' 
//                                 suggestions={services} 
//                                 preview={formData.services}
//                                 handleMultiUpdate={handleMultiUpdate}
//                             />
//                             )}
//                         </div>
//                         <div className='multi-container'>
//                             <label>Specialties</label>
//                             {specialties && (
//                                 <MultipleInput 
//                                 name='specialties' 
//                                 suggestions={specialties}
//                                 preview={formData.specialties} 
//                                 handleMultiUpdate={handleMultiUpdate}
//                             />
//                             )}
//                         </div>
//                     </div>
//                     <img className='background-asset' src={scienceAsset} alt=''/>
//                 </Form>
//             </div>
//         </Body>
//     );
// }
