import React, { useEffect } from 'react';
import { Card, CardTitle, CardGroup, CardBody, Input, Button, InputGroup, InputGroupAddon, Spinner } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';

//Imported Queries

import { GET_SERVICES, GET_REGIONS, GET_THERAPEUTICS } from '../../../../queries/index';

//Imported Mutations

import {
  ADD_SERVICE,
  DELETE_SERVICE,
  ADD_THERAPEUTICS,
  DELETE_THERAPEUTICS,
  ADD_REGION,
  DELETE_REGION,
} from '../../../../mutations/index';

import styled from 'styled-components';

//Imported Material Ui components

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

//State

const InfoCards = (props) => {
  const { loading, error, data: services } = useQuery(GET_SERVICES);
  const { loading: loadone, error: errorone, data: therapeutics } = useQuery(GET_THERAPEUTICS);
  const { loading: loadtwo, error: errortwo, data: regions } = useQuery(GET_REGIONS);

  const [addService] = useMutation(ADD_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);
  const [addTherapeutics] = useMutation(ADD_THERAPEUTICS);
  const [deleteTherapeutics] = useMutation(DELETE_THERAPEUTICS);
  const [addRegion] = useMutation(ADD_REGION);
  const [deleteRegion] = useMutation(DELETE_REGION);

  const [data, setData] = React.useState({ services: [], therapeutics: [], regions: [] });
  const [serviceInput, setServiceInput] = React.useState('');
  const [therapeuticInput, setTherapeuticInput] = React.useState('');
  const [regionInput, setRegionInput] = React.useState('');

  useEffect(() => {
    setData({ services: services?.serviceItems, therapeutics: therapeutics?.therapeutics, regions: regions?.regions });
  }, [services, therapeutics, regions]);

  //Add Service Logic

  const handleAddService = async (name) => {
    try {
      const addedService = await addService({ variables: { name } });
      setData({ ...data, services: [...data.services, addedService.data.createServiceItem] });
      setServiceInput('');
    } catch (err) {
      console.log(err);
    }
  };

  //Add Therapeutics Logic

  const handleAddTherapeutics = async (name) => {
    try {
      const addedTheraputics = await addTherapeutics({ variables: { name } });
      setData({ ...data, therapeutics: [...data.therapeutics, addedTheraputics.data.createTherapeutic] });
      setTherapeuticInput('');
    } catch (err) {
      console.log(err);
    }
  };

  //Add Regions Logic

  const handleAddRegion = async (name) => {
    try {
      const addedRegions = await addRegion({ variables: { name } });
      setData({ ...data, regions: [...data.regions, addedRegions.data.createRegion] });
      setRegionInput('');
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Services Logic

  const handleDeleteService = async (name) => {
    try {
      const deletedService = await deleteService({ variables: { name } });
      setData({
        ...data,
        services: data.services.filter((service) => service.name !== deletedService.data.deleteServiceItem.name),
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Therapeutics Logic

  const handleDeleteTherapeutics = async (name) => {
    try {
      const deletedTherapeutics = await deleteTherapeutics({ variables: { name } });
      setData({
        ...data,
        therapeutics: data.therapeutics.filter(
          (therapeutic) => therapeutic.name !== deletedTherapeutics.data.deleteTherapeutic.name
        ),
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Regions Logic

  const handleDeleteRegions = async (name) => {
    try {
      const deletedRegions = await deleteRegion({ variables: { name } });
      setData({
        ...data,
        regions: data.regions.filter((region) => region.name !== deletedRegions.data.deleteRegion.name),
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || loadone || loadtwo)
    return (
      // Loading Spinner

      <h3 style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
        {' '}
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="dark" />
      </h3>
    );
  if (error || errorone || errortwo) return <p>Error</p>;

  return (
    <Style>
      <h1>Information</h1>
      <CardGroup style={{ marginTop: '-1.2rem' }}>
        {/* Card One */}

        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle">Regions Covered</CardTitle>
            <InputGroup>
              <Input placeholder="Add Region" value={regionInput} onChange={(e) => setRegionInput(e.target.value)} />

              <InputGroupAddon addonType="append">
                <Button className="addButton" color="success" onClick={() => handleAddRegion(regionInput)}>
                  ADD
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <br />

            <Grid item xs={12} md={12}>
              <div>
                <List>
                  {' '}
                  {data.regions?.map((region) => (
                    <ListItem>
                      <ListItemText key={region.id} className="item" style={{ marginTop: '-8px' }}>
                        {' '}
                        {region.name}{' '}
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: '#F5222D', marginTop: '-8px' }}
                            onClick={() => handleDeleteRegions(region.name)}>
                            {' '}
                            <DeleteIcon style={{ fontSize: 30 }} />
                          </IconButton>{' '}
                        </ListItemSecondaryAction>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </CardBody>
        </Card>

        {/* Card Two */}

        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle"> Therapeutic Areas</CardTitle>
            <InputGroup>
              <Input
                placeholder="Add Terapeutic Area"
                value={therapeuticInput}
                onChange={(e) => setTherapeuticInput(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button className="addButton" color="success" onClick={() => handleAddTherapeutics(therapeuticInput)}>
                  ADD
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <br />
            <Grid item xs={12} md={12}>
              <div>
                <List>
                  {data.therapeutics?.map((therapeutic) => (
                    <ListItem>
                      <ListItemText key={therapeutic.id} className="item" style={{ marginTop: '-8px' }}>
                        {' '}
                        {therapeutic.name}{' '}
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: '#F5222D', marginTop: '-8px' }}
                            onClick={() => handleDeleteTherapeutics(therapeutic.name)}>
                            {' '}
                            <DeleteIcon style={{ fontSize: 30 }} />
                          </IconButton>{' '}
                        </ListItemSecondaryAction>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </CardBody>
        </Card>

        {/* Card Three */}

        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle">Services</CardTitle>
            <InputGroup>
              <Input placeholder="Add Service" value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} />
              <InputGroupAddon addonType="append">
                <Button className="addButton" color="success" onClick={() => handleAddService(serviceInput)}>
                  ADD
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <br />

            <Grid item xs={12} md={12}>
              <div>
                <List>
                  {data.services?.map((service) => (
                    <ListItem>
                      <ListItemText key={service.id} className="item" style={{ marginTop: '-8px' }}>
                        {' '}
                        {service.name}{' '}
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: '#F5222D', marginTop: '-8px' }}
                            onClick={() => handleDeleteService(service.name)}>
                            <DeleteIcon style={{ fontSize: 30 }} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </CardBody>
        </Card>
      </CardGroup>
    </Style>
  );
};

export default InfoCards;

// Styling

export const Style = styled.div`
  padding-right: 1rem;
  margin-top: 1.5rem;

  .CardTitle {
    color: black;
    font-size: 1.8rem;
  }
  .card {
    margin: 1rem;
  }

  .cardBody {
    border: 4px solid #096dd9;
    border-radius: 3px;
  }
  h1 {
    display: flex;
    justify-content: center;
    color: white;
    border: 4px solid #096dd9;
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 10px;
    border-radius: 3px;
    background: #096dd9;
  }
  .item {
    border: solid lightgrey 1px;
    padding: 8px;
    border-radius: 3px;
  }
`;
