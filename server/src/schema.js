const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Song {
      id: ID!
      title: String
      text: [String]!
      slides: [Slide]
      links: [String]
  }

  type Slide {
      type: SlideType!
      name: String
      lines: [String!]
  }

  input SlideInput {
    type: SlideType! = VERSE
    name: String
    lines: [String!]
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
      saveSong(title: String!, text: [SlideInput!]!, links: [String]): UpdateResponce
  }

  type UpdateResponce {
    success: Boolean!
    song: Song
    message: String
  }
`;

module.exports = typeDefs;