import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_COMPANIES } from "../../../queries";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Login from "../../Login/Login.js";
import CompanyCard from "./CompanyCard";
import { CompanyList, Button } from "./styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

export default (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [companyData, setCompanyData] = useState(null);
  const [search, setSearch] = useState("");

  const { loading, data, refetch } = useQuery(GET_COMPANIES);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.length > 0) {
      setCompanyData({
        companies: data.companies.filter((company) =>
          company.name.toLowerCase().includes(search.toLowerCase())
        ),
      });
    } else {
      setCompanyData(data);
    }
  };

    const handleReDirect = () => {
        history.push('/service-provider/add');
    }

  useEffect(() => {
    setCompanyData(data);
  }, [data]);

    useEffect(() => {
        refetch();
    }, [ refetch ]);

  return (
    <CompanyList>
      <header>
        <div className="header-container">
          <h2>List of Service Providers</h2>
          <div className="search-container">
            <input type="search" value={search} onChange={handleChange} />
            <Button onClick={handleSearch}>
              <p>Search</p>
            </Button>
            <Button onClick={handleReDirect}>
              <p>Add Company</p>
            </Button>
            {/* implements login/logout here */}
            <Login component={Login} />
          </div>
        </div>
      </header>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {companyData &&
        companyData.companies.map((company) => {
          return <CompanyCard company={company} key={company.id} />;
        })}
    </CompanyList>
  );
};
