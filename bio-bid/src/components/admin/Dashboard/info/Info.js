import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardText, CardGroup, CardBody, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
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
    <CardGroup>
      <Card>
        <CardBody>
          <CardTitle>Regions Covered</CardTitle>
          <InputGroup>
            <Input value={regionInput} onChange={(e) => setRegionInput(e.target.value)} />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={() => handleAddRegion(regionInput)}>
                ADD
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <br />
          <CardText>
            <ul>
              {' '}
              {data.regions?.map((region) => (
                <ul key={region.id}>
                  {' '}
                  {region.name}{' '}
                  <Button color="danger" onClick={() => handleDeleteRegions(region.name)}>
                    {' '}
                    delete
                  </Button>{' '}
                </ul>
              ))}
            </ul>
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle> Therapeutic Areas</CardTitle>
          <InputGroup>
            <Input value={therapeuticInput} onChange={(e) => setTherapeuticInput(e.target.value)} />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={() => handleAddTherapeutics(therapeuticInput)}>
                ADD
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <br />
          <CardText>
            <ul>
              {' '}
              <br />
              {data.therapeutics?.map((therapeutic) => (
                <ul>
                  {' '}
                  {therapeutic.name}{' '}
                  <Button color="danger" onClick={() => handleDeleteTherapeutics(therapeutic.name)}>
                    {' '}
                    delete
                  </Button>{' '}
                </ul>
              ))}
            </ul>
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle>Services</CardTitle>
          <InputGroup>
            <Input value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={() => handleAddService(serviceInput)}>
                ADD
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <br />
          <CardText>
            <ul>
              {data.services?.map((service) => (
                <ul>
                  {' '}
                  {service.name}{' '}
                  <Button color="danger" onClick={() => handleDeleteService(service.name)}>
                    {' '}
                    delete
                  </Button>{' '}
                </ul>
              ))}
              <br />
            </ul>
          </CardText>
        </CardBody>
      </Card>
    </CardGroup>
  );
};

export default InfoCards;
