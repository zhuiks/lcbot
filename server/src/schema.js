const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
  type Query {
    songs: [Song]!
    song(id: ID!): Song
  }

  type Song {
      id: ID!
      title: String
      text: [Slide!]!
      links: [String]
  }

  type Slide {
      id: ID!
      lines: [String!]!
  }

  type Mutation {
      saveSong(title: String, text: [String], links: [String]): String
  }
`;

module.exports = typeDefs;