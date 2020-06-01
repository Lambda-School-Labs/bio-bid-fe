import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { gql } from 'apollo-boost';
import * as FullStory from '@fullstory/browser';

const client = new ApolloClient({

  uri: process.env.REACT_APP_SERVER_ENDPOINT || 'https://api.biobidlabs.com/',
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
  `,
});

FullStory.init({ orgId: 'VHMTY' });

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
