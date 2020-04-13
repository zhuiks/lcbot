import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Pages from './pages';


const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        let locationStr = '';
        if (locations) {
          locations.forEach(el => {
            locationStr += `#${el.line}: ${el.column}`;
          });
        }
        console.log(
          `[GraphQL error]: Message: ${message}, Path: ${path} ${locationStr}`,
        );
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/edit/'
  }),
]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Pages />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);