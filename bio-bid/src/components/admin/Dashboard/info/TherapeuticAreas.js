import React from 'react';
import MaterialTable from 'material-table';

import styled from 'styled-components';

export default function MaterialTableTherapeutic() {
  const [state, setState] = React.useState({
    columns: [{ title: 'Therapeutic Areas ', field: 'name' }],
    data: [
      { name: 'Big Money' },
      {
        name: 'Mr.Ben',
      },
    ],
  });

  return (
    <Card>
      <MaterialTable
        style={{ padding: '1rem' }}
        title="Therapeutic Areas"
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
  border: 3px solid #096dd9;
  border-radius: 6px;
  h6 {
    width: 280px;
  }
  button {
    color: black;
  }
  .MTablePaginationInner-root-212 {
    color: #096dd9;
    button {
      color: #096dd9;
    }
  }
`;
