import React from "react";
import MaterialTable from "material-table";

import {useQuery} from '@apollo/react-hooks';
import {GET_STUDIES} from '../queries';

export default function Table() {
  const {loading, data, error} = useQuery(GET_STUDIES);
  console.log(data);
  const [state, setState] = React.useState({
    columns: [
        { title: "BIDS", field: "bids" },
      { title: "NAME", field: "name" },
      { title: "THERAPEUTIC AREA", field: "Therapeutic" },
      { title: "PROTOCOL NO./TITLE", field: "protocol", type: "numeric" },
      { title: "PHASE", field: "Phase"},
      { title: "SERVICE LIST" , field: "Serverlist", type: "numeric" },
      { title: "MODIFIED LIST", field: "modify", type: "numeric" },
      {title: "ACTIONS", field: "actions"},
      {
        title: "",
        field: "",
        lookup: { }
      }
    ],
  
  });

  return (
    <MaterialTable
       title="Current Projects"
      columns={state.columns}
      data={state.data}
     
    />
  );
}



