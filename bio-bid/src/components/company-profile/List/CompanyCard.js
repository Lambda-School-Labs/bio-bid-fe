import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultLogo from "../../../images/default-company-logo.png";
import { CompanyCard, CardButton } from "./styles";
import { useOktaAuth } from "@okta/okta-react";
import { CLAIM_COMPANY } from "../../../mutations";
import { useMutation } from "@apollo/react-hooks";

export default ({ company }) => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState({});
  const [addClaim] = useMutation(CLAIM_COMPANY);
  const [isClaiming, setIsClaiming] = useState(false);
  console.log("onmount claiming: ", isClaiming);

  useEffect(() => {
    setIsClaiming(localStorage.getItem('isClaiming'))
  }, [])

  useEffect(() => {
    authService.getUser().then(setUserInfo);
  }, [authService]);
  console.log("users info: ", userInfo);

  const handleClaims = async () => {
    try {
      localStorage.setItem("isClaiming", true);
      setIsClaiming(true);
      await addClaim({
        variables: {
          user: userInfo.sub,
          email: userInfo.email,
          name: `${userInfo.given_name} ${userInfo.family_name}`,
          company: company.id,
        },
      });
      console.log(
        `${userInfo.given_name} ${userInfo.family_name} created a claim for company ${company.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCancel = () => {
  //   localStorage.removeItem('isClaiming');
  //   setIsClaiming(false);
  // }

  const [overview, setOverview] = useState("");
  const [tooLong, setTooLong] = useState(false);
  console.log(company.overview);

  useEffect(() => {
    if (company.overview?.length >= 300) {
      setOverview(`${company.overview.substring(0, 300)}...`);
      setTooLong(true);
    } else {
      setOverview(company.overview);
    }
  }, [company.overview]);

  return (
    <CompanyCard>
      {company.logoURL ? (
        <img src={company.logoURL} alt="default logo" />
      ) : (
        <img src={defaultLogo} alt={company.name} />
      )}
      <div className="content">
        <div className="text">
          <h3>{company.name}</h3>
          <div className="details">
            {company.website && (
              <p>
                <span>Website URL: </span>
                {company.website}
              </p>
            )}
            {company.linkedin && (
              <p>
                <span>LinkedIn URL: </span>
                {company.linkedin}
              </p>
            )}
          </div>
          <div className="btn-container">
            {!authState.isAuthenticated || isClaiming || userInfo.profile==='Admin' ? null : (
              <CardButton onClick={handleClaims} gray>
                <p>Claim</p>
              </CardButton>
            )}
            {/* {!isClaiming ? null : (
              <CardButton onClick={handleCancel} gray>
                <p>Cancel</p>
              </CardButton>
            )} */}
            <Link to={`/service-providers/${company.id}`}>
              <CardButton>
                <p>Details</p>
              </CardButton>
            </Link>
          </div>
        </div>
        <div className="overview">
          {company.overview && <p className="bold">Company Overview</p>}
          <p>
            {overview}{" "}
            {tooLong && (
              <Link to={`/service-providers/${company.id}`}> see more </Link>
            )}
          </p>
        </div>
      </div>
    </CompanyCard>
  );
};
