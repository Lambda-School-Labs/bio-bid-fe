import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import styled from 'styled-components';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [{ title: 'Regions ', field: 'name' }],
    data: [
      { name: 'New York' },
      {
        name: 'Mexico',
      },
    ],
  });

  return (
    <Card>
      <MaterialTable
        style={{ padding: '1rem' }}
        title="Regions Covered"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </Card>
  );
}

export const Card = styled.div`
  width: 33.33%;
  margin-top: 3rem;
  margin-left: 1rem;
  border: 2px solid #096dd9;
  border-radius: 5px;
`;
