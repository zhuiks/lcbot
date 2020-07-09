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
import { OperationDefinitionNode } from "graphql";
import { getMainDefinition } from "apollo-utilities";
import RTL from './components/atoms/rtl';

const serverLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/edit/'
});

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  const omitTypename = (key: any, value: any) =>
    key === "__typename" ? undefined : value;

  const def = getMainDefinition(operation.query);
  if (def && (def as OperationDefinitionNode).operation === "mutation") {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward ? forward(operation) : null;
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
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
});

const link = ApolloLink.from([errorLink, cleanTypenameLink, serverLink,]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

const direction = process.env.REACT_APP_DIRECTION === 'rtl' || process.env.REACT_APP_DIRECTION === 'ltr' ? process.env.REACT_APP_DIRECTION : 'rtl';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme(direction)}>
      <RTL direction={direction}>
        <CssBaseline />
        <Pages />
      </RTL>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);