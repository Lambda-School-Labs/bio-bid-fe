import React from "react";
import styled from "styled-components";
import { Table } from 'reactstrap';
import {EllipsisOutlined} from "@ant-design/icons";
import {Button} from "reactstrap";

const Bids = (props) => {
  return (
    <Table striped style={{ width:'100%',padding:'10%'}}>
      <thead>
        <tr >
          <th>BIDS</th>
          <th>NAME</th>
          <th>THERAPEUTIC AREA</th>
          <th>PROTOCOL NO./TITLE</th>
          <th>PHASE</th>
          <th>SERVICE LIST</th>
          <th>MODIFIED DATE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Open</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> I</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Open</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> I</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Closed</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> I</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Open</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> II</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Active</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> I</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Closed</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> IV</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Open</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> III</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        <tr>
          <th scope="row"> <Button style={{ width: '70px', height: '35px'}} color="secondary">Open</Button></th>
          <td> Second study</td>
          <td> Inflammation<br>
          </br> Indication: Back pain<br>
          </br> Molecule type: Chemical</td>
          <td> ABZ-123<br>
          </br> Title: Atest </td>
          <td> II</td>
          <td> 1</td>
          <td> April 19,2019<br>
          </br> 07:09:50am</td>
          <td> <EllipsisOutlined style={{fontSize:'25px'}}/></td>
        </tr>

        

        
        
      </tbody>
    </Table>
  );
}

export default Bids;


const Title= styled.div
`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 24px;
color: #595959;


`




