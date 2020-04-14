import React,{useEffect, useState} from "react";
import MaterialTable from "material-table";
import axios from 'axios';
import { GET_STUDIES } from "../queries";

export default function Table() {
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

  const setStudies = (result) => {
    const {studies} = result.data;
    setState({...state, data: [...studies]})
  }
  useEffect(() => {
    axios.post('http://ec2-34-195-186-223.compute-1.amazonaws.com/', {query: GET_STUDIES})
    .then(res =>
    {
      setStudies(res.data);
    })
    .catch(error => console.log(error));
  }, [setStudies])

  return (
    <MaterialTable
       title="Current Projects"
      columns={state.columns}
      data={state.data}
     
    />
  );
}