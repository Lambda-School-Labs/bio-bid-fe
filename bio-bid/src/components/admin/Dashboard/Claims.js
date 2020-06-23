import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { APPROVE_CLAIM, DENY_CLAIM } from "../../../mutations";
import { GET_CLAIMS } from "../../../queries";
import { makeStyles } from "@material-ui/core/styles";
import "./Claims.css";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Style } from "./Admin";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Claims() {
  const classes = useStyles();
  const [claims, setClaims] = useState();
  const { loading, data, refetch } = useQuery(GET_CLAIMS);
  const [denyClaim] = useMutation(DENY_CLAIM, {
    onCompleted: () => refetch(),
  });
  const [approveClaim] = useMutation(APPROVE_CLAIM, {
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    setClaims(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  //   console.log("data in claims component", claims);

  return (
    <Style>
      <h1>Pending Claims</h1>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {claims &&
        claims.pendingClaims.map((claim) => {
          return (
            <div className="claimContainer" key={claim.id}>
              <div className="textContainer">
                <h3 className="textTitle">Company: </h3>
                <p className="claimText">{claim.company.name}</p>
              </div>
              <div className="textContainer">
                <h3 className="textTitle">User Name: </h3>
                <p className="claimText">{claim.name}</p>
              </div>
              <div className="textContainer">
                <h3 className="textTitle">User Email: </h3>
                <p className="claimText">{claim.email}</p>
              </div>
              <div className="textContainer">
                <h3 className="textTitle">User ID:</h3>
                <p className="claimText">{claim.user}</p>
              </div>

              <button
                className="approveClaim"
                onClick={async () => {
                  try {
                    await approveClaim({
                      variables: { id: claim.id },
                    });
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Approve
              </button>
              <button
                className="denyClaim"
                onClick={async () => {
                  try {
                    await denyClaim({
                      variables: { id: claim.id },
                    });
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Deny
              </button>
            </div>
          );
        })}
    </Style>
  );
}
