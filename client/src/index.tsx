import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

// ... above is the instantiation of the client object.
client
  .query({
    query: gql`
        query GetSongs {
            songs {
                id
                title
            }
        }    
    `
  })
  .then(result => console.log(result));