import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { APPROVE_CLAIM, DENY_CLAIM } from "../../../mutations";
import { GET_CLAIMS } from "../../../queries";
import "./Claims.css";

export default function Claims() {
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
    <div>
      <h2 className="claimsHeader">Claim Requests</h2>
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
    </div>
  );
}
