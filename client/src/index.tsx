import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => { 
        let locationStr = '';
        if(locations) {
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
    uri: process.env.SERVER_URL || 'http://localhost:3000/query/'
  }),
]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);