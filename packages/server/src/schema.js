const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Song {
      id: ID!
      title: String
      text: [String]!
      slides: [Slide]
      links: [String]
      hasChords: Boolean
  }

  type Slide {
      type: SlideType!
      name: String
      lines: [String!]
      chords: [Chord]
  }

  type Chord {
    root: String!
    quality: String
    type: String
    bass: String
    text: String!
  }

  input SlideInput {
    type: SlideType! = VERSE
    name: String
    lines: [String!]
    chords: [[ChordInput]]
  }

  input ChordInput {
    root: String! = "_"
    quality: String
    type: String
    bass: String
    text: String! = " "
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
      addSong(id: ID!, title: String!, slides: [SlideInput], links: [String]): UpdateResponce
      updateSong(id: ID!, title: String!, slides: [SlideInput], links: [String]): UpdateResponce
  }

  type UpdateResponce {
    success: Boolean!
    song: Song
    message: String
  }
`;

module.exports = typeDefs;