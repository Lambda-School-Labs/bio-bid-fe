import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { APPROVE_CLAIM, DENY_CLAIM } from "../../../mutations";
import { GET_CLAIMS } from "../../../queries";

export default function Claims() {
  const { loading, data, refetch } = useQuery(GET_CLAIMS);
  const [denyClaim] = useMutation(DENY_CLAIM);
  const [approveClaim] = useMutation(APPROVE_CLAIM);
  const [claims, setClaims] = useState();

  useEffect(() => {
    setClaims(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  //   console.log("data in claims component", claims);

  return (
    <div>
      {claims && claims.pendingClaims.map((claim) => {
          return (
            <div key={claim.id} style={{ display: `flex` }}>
              <p>User ID: {claim.user}</p>
              <p>User Name: {claim.name}</p>
              <p>User Email: {claim.email}</p>
              <p>Company: {claim.company.name}</p>
              <p>Approved: {claim.approved}</p>
              <p>Pending: {claim.pending}</p>
              <button
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
                approve
              </button>
              <button
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
                deny
              </button>
            </div>
          );
        })}
    </div>
  );
}
