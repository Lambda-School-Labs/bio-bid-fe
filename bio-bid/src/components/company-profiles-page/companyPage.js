import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Imagecard from './imagecard';
import { useQuery } from '@apollo/react-hooks';
import theme from '../../theme';

import { GET_COMPANY_BY_ID } from '../../queries/index';

export default (props) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id },
  });
  if (loading) return <h3>Loading...</h3>;
  if (error) return <p>Error</p>;

  return (
    <div className="companypage">
      {/* navbar */}
      <Container>
        <nav className="user-cp">
          <h1 style={{ fontSize: '30px', display: 'flex', alignItems: 'center' }}>{data.company.name}</h1>
        </nav>
      </Container>

      <Imagecard />
    </div>
  );
};

const Container = styled.header`
  width: 100%;
  height: 6rem;
  background: ${theme.colors.scienceBlue};

  display: flex;

  /* navigation / user cp styling */
  nav.user-cp {
    display: flex;
    letter-spacing: 0.1rem;
    margin-left: 3rem;
    color: #ffffff;
    font-family: Lato;
    font-style: normal;
  }

  /* nav bar hero text */
  nav.user-text {
    display: flex;
    margin-left: 10rem;
    letter-spacing: 0.1rem;
    margin-top: 0.3rem;
    color: #ffffff;
    font-family: Lato;
  }
`;
