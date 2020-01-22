const { gql } = require('apollo-server');

const typeDefs = gql`
  type Song {
      id: ID!
      title: String
      text: [Slide]!
      links: [String]
      url: String
  }

  type Slide {
      id: ID!
      lines: [String!]!
  }

  type Query {
    songs: [Song]!
    song(id: ID!): Song
  }

  type Mutation {
      saveSong(title: String, text: [String], links: [String]): UpdateResponce
  }

  type UpdateResponce {
    success: Boolean!
    song: Song
    message: String
  }
`;

module.exports = typeDefs;