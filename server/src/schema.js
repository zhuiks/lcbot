const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Song {
      id: ID!
      title: String
      text: [String]!
      links: [String]
      url: String
  }

  type Slide {
      id: ID!
      type: SlideType
      lines: [String!]!
  }

  enum SlideType {
    INTRO
    VERSE
    PRE
    CHORUS
    BRIDGE
    SOLO
    OUT
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