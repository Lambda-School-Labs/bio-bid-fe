import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import * as FullStory from "@fullstory/browser";
import {Security} from "@okta/okta-react";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_ENDPOINT || "https://api.biobidlabs.com/",
  typeDefs: gql`
    enum CompanySize {
      A
      B
      C
      D
      E
      F
      G
      H
      I
      null
    }

    enum Phase {
      I
      II
      III
      IV
      null
    }
  `,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const config = {
  // for okta-react components
  issuer: "https://dev-648803.okta.com/oauth2/default",
  clientId: "0oadk3f256MfKqlA74x6",
  redirectUri: `${window.location.origin}`,
  pkce: true,
};

FullStory.init({ orgId: "VHMTY" });

ReactDOM.render(
  <Router>
    <Security {...config}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Security>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
