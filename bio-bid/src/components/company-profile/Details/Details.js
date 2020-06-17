import React, { useState, useEffect } from 'react';
// import { Card, CardBody, CardTitle, CardImg, CardLink, CardDeck, Button, ButtonGroup } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Login from '../../Login/Login';
import { DELETE_COMPANY } from '../../../mutations/index';
import { GET_COMPANY_BY_ID } from '../../../queries/index';

import Bubble from './Bubble';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Details, Button, Website, LinkedIn, Size, Location } from './styles';
import logo from '../../../images/default-company-logo.png';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [size, setSize] = useState(undefined);

  const { loading, data, refetch } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id },
  });

  const [deleteCompany] = useMutation(DELETE_COMPANY);

  const handleDelete = async () => {
    try {
      await deleteCompany({ variables: { id } });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refetch();
    if (data && data.company.companySize) {
      switch (data.company.companySize) {
        case 'A':
          setSize('Self-Employed');
          break;
        case 'B':
          setSize('1-10 Employees');
          break;
        case 'C':
          setSize('11-50 Employees');
          break;
        case 'D':
          setSize('51-200 Employees');
          break;
        case 'E':
          setSize('201-500 Employees');
          break;
        case 'F':
          setSize('501-1,000 Employees');
          break;
        case 'G':
          setSize('1,000-5,000 Employees');
          break;
        case 'H':
          setSize('5,001-10,000 Employees');
          break;
        case 'I':
          setSize('10,000+ Employees');
          break;
        default:
          setSize('N/A');
      }
    }
  }, [data, refetch]);

  return (
    <Details>
      {loading && (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {data && (
        <header>
          <div className="header-container">
            <div className="company-name">
              <h2>{data.company.name}</h2>
              <Button>
                <p>Claim</p>
              </Button>
            </div>
            <div className="btn-container">
              <Button onClick={handleDelete} color="delete">
                <p>Delete</p>
              </Button>
              <Link to={`/service-provider/edit/${id}`}>
                <Button color="edit">
                  <p>Edit</p>
                </Button>
              </Link>
              <Link to="/">
                <Button lg>
                  <p>Service Providers</p>
                </Button>
              </Link>
              {/* implement login here */}
              <Login component={Login} />
            </div>
          </div>
        </header>
      )}
      {data && (
        <div className="flex-wrapper">
          <div className="basic-container">
            <div className="basic-sidebar">
              {data.company.logoURL ? (
                <img src={data.company.logoURL} alt="Company logo" />
              ) : (
                <img src={logo} alt="Default Company Logo" />
              )}
              <div className="nav-container">
                <div className="link">
                  <Website />
                  {data.company.website ? (
                    <a target="_blank" rel="noopener noreferrer" href={`https://${data.company.website}`}>
                      {data.company.website}
                    </a>
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
                <div className="link">
                  <LinkedIn />
                  {data.company.linkedin ? (
                    <a target="_blank" rel="noopener noreferrer" href={`https://${data.company.linkedin}`}>
                      {data.company.linkedin}
                    </a>
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
              <div className="basic-info">
                <div className="info">
                  <Size alt="Company Size" />
                  <p>{size ? size : 'N/A'}</p>
                </div>
                <div className="info">
                  <Location />
                  <p>{data.company.headquarters ? data.company.headquarters : 'N/A'}</p>
                </div>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                <p>{data.company.overview ? data.company.overview : 'N/A'}</p>
              </div>
            </div>
            <div className="specifics">
              <div className="regions">
                <h3>Regions</h3>
                {data.company.regions.map((region) => {
                  return <Bubble key={Math.random()} content={region.name} />;
                })}
              </div>
              <div className="bar" />
              <div className="therapeutic-areas">
                <h3>Therapeutic Areas</h3>
                {data.company.therapeutics.map((therapeutic) => {
                  return <Bubble key={Math.random()} content={therapeutic.name} />;
                })}
              </div>
              <div className="bar" />
              <div className="services">
                <h3>Services Coming Soon</h3>
              </div>
            </div>
            <div className="reviews">
              <h3>Reviews Coming Soon</h3>
            </div>
          </div>
        </div>
      )}
    </Details>
  );
};
