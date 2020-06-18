import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardGroup, CardBody, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SERVICES, GET_REGIONS, GET_THERAPEUTICS } from '../../../../queries/index';

import {
  ADD_SERVICE,
  DELETE_SERVICE,
  ADD_THERAPEUTICS,
  DELETE_THERAPEUTICS,
  ADD_REGION,
  DELETE_REGION,
} from '../../../../mutations/index';

import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

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

  const handleAddService = async (name) => {
    try {
      const addedService = await addService({ variables: { name } });
      setData({ ...data, services: [...data.services, addedService.data.createServiceItem] });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTherapeutics = async (name) => {
    try {
      const addedTheraputics = await addTherapeutics({ variables: { name } });
      setData({ ...data, therapeutics: [...data.therapeutics, addedTheraputics.data.createTherapeutic] });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddRegion = async (name) => {
    try {
      const addedRegions = await addRegion({ variables: { name } });
      setData({ ...data, regions: [...data.regions, addedRegions.data.createRegion] });
    } catch (err) {
      console.log(err);
    }
  };

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

  if (loading || loadone || loadtwo) return <h3>Loading...</h3>;
  if (error || errorone || errortwo) return <p>Error</p>;

  return (
    <Style>
      <h1>Information</h1>
      <CardGroup>
        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle">Regions Covered</CardTitle>
            <InputGroup>
              <Input value={regionInput} onChange={(e) => setRegionInput(e.target.value)} />

              <InputGroupAddon addonType="append">
                <Button className="addButton" color="success" onClick={() => handleAddRegion(regionInput)}>
                  ADD
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <br />

            <Grid item xs={14} md={12}>
              <div>
                <List>
                  {' '}
                  {data.regions?.map((region) => (
                    <ListItem>
                      <ListItemText key={region.id}>
                        {' '}
                        {region.name}{' '}
                        <ListItemSecondaryAction>
                          <iconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: '#F5222D' }}
                            onClick={() => handleDeleteRegions(region.name)}>
                            {' '}
                            <DeleteOutlineRoundedIcon style={{ fontSize: 30 }} />
                          </iconButton>{' '}
                        </ListItemSecondaryAction>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </CardBody>
        </Card>
        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle"> Therapeutic Areas</CardTitle>
            <InputGroup>
              <Input value={therapeuticInput} onChange={(e) => setTherapeuticInput(e.target.value)} />
              <InputGroupAddon addonType="append">
                <Button className="addButton" color="success" onClick={() => handleAddTherapeutics(therapeuticInput)}>
                  ADD
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <br />
            <Grid item xs={14} md={12}>
              <div>
                <List>
                  {data.therapeutics?.map((therapeutic) => (
                    <ListItem>
                      <ListItemText key={therapeutic.id}>
                        {' '}
                        {therapeutic.name}{' '}
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: '#F5222D' }}
                            onClick={() => handleDeleteTherapeutics(therapeutic.name)}>
                            {' '}
                            <DeleteOutlineRoundedIcon style={{ fontSize: 30 }} />
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

        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle">Services</CardTitle>
            <InputGroup>
              <Input value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} />
              <InputGroupAddon addonType="append">
                <Button className="addButton" color="success" onClick={() => handleAddService(serviceInput)}>
                  ADD
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <br />

            <Grid item xs={14} md={12}>
              <div>
                <List>
                  {data.services?.map((service) => (
                    <ListItem>
                      <ListItemText>
                        {' '}
                        {service.name}{' '}
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: '#F5222D' }}
                            onClick={() => handleDeleteService(service.name)}>
                            <DeleteOutlineRoundedIcon style={{ fontSize: 30 }} />
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

export const Style = styled.div`
  padding-right: 1rem;
  margin-top: 1rem;

  .CardTitle {
    color: #096dd9;
    font-size: 1.5rem;
  }
  .card {
    margin: 1rem;
  }

  .cardBody {
    border: 3px solid #096dd9;
    border-radius: 3px;
  }
  h1 {
    display: flex;
    justify-content: center;
    color: #096dd9;
  }
`;
