import React,{useEffect, useState} from "react";
import MaterialTable from "material-table";
import axios from 'axios';

export default function Table() {
  useEffect(() => {
    axios({
      url: 'http://ec2-34-195-186-223.compute-1.amazonaws.com/',
      method: 'post',
      data: {
        query: `
          query {
            studies {
              id
              name
              area
              phase
            }
          }
        `
      }
    })
    .then(res =>
    {
      setStudies(res.data);
    })
    .catch(error => console.log(error));
  }, [])

  const setStudies = (result) => {
    const {studies} = result.data;
    setState({...state, data: [...studies]})
  }
  const [state, setState] = useState({
    columns: [
        { title: "BIDS", field: "bids" },
      { title: "NAME", field: "name" },
      { title: "THERAPEUTIC AREA", field: "area" },
      { title: "PROTOCOL NO./TITLE", field: "protocol", type: "numeric" },
      { title: "PHASE", field: "phase"},
      { title: "SERVICE LIST" , field: "Serverlist", type: "numeric" },
      { title: "MODIFIED LIST", field: "modify", type: "numeric" },
      {title: "ACTIONS", field: "actions"},
      {
        title: "",
        field: "",
        lookup: { }
      }
    ],
    data: []
  });
console.log(state)
  return (
    <MaterialTable
       title="Current Projects"
      columns={state.columns}
      data={state.data}
     
    />
  );
}