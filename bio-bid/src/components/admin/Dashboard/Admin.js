import React from "react";
import { Card, CardTitle, CardGroup, CardBody, Spinner } from "reactstrap";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { ListItem, ListItemText, List, Grid } from "@material-ui/core";
import { GET_CLAIMS, STATISTICS } from "../../../queries";

function Admin() {
  const { data } = useQuery(STATISTICS);
  const { data: pendingClaims, loading: claimsLoading } = useQuery(GET_CLAIMS);

  return (
    <Style>
      <h1>Statistics</h1>
      <CardGroup style={{ marginTop: "-1.2rem" }}>
        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle">App Statistics</CardTitle>
            <Grid item xs={12} md={12}>
              <List>
                <ListItem>
                  <ListItemText className="item" style={{ marginTop: "-8px" }}>
                    Total Companies: {data?.statistics.companyCount}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText className="item" style={{ marginTop: "-8px" }}>
                    Total Pending Claims: {data?.statistics.pendingClaimCount}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText className="item" style={{ marginTop: "-8px" }}>
                    Total Services: {data?.statistics.serviceCount}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText className="item" style={{ marginTop: "-8px" }}>
                    Total Specialties: {data?.statistics.specialtyCount}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </CardBody>
        </Card>
        <Card className="card">
          <CardBody className="cardBody">
            <CardTitle className="CardTitle">Recent Pending Claims</CardTitle>
            <Grid item xs={12} md={12}>
              <List>
                {claimsLoading ? (
                  <Spinner type="grow" color="primary" />
                ) : (
                  pendingClaims?.pendingClaims.map((claim) => {
                    return (
                      <ListItem key={claim.id}>
                        <ListItemText
                          className="item"
                          style={{ marginTop: "-8px" }}
                        >
                          {claim.company.name} is requested to claim by{" "}
                          {claim.name} ({claim.email})
                        </ListItemText>
                      </ListItem>
                    );
                  })
                )}
              </List>
            </Grid>
          </CardBody>
        </Card>
      </CardGroup>
    </Style>
  );
}

export default Admin;

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
