import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SongForm, Loading } from '../components';
import ApolloClient from 'apollo-client';
import * as SavingTypes from './__generated__/saveSong';
import { RouteComponentProps } from '@reach/router';

export const SAVE_SONG = gql`
  mutation saveSong($title: String, $text: [String]!, $links: [String]) {
    saveSong(title: $title, text: $text, links: $links) {
      success
      message
    }
  }
`;

interface NewSongProps extends RouteComponentProps { }
const NewSong: React.FC<NewSongProps> = () => {
  const [saveSong, { data }] = useMutation<SavingTypes.saveSong, SavingTypes.saveSongVariables>(SAVE_SONG);
  return <SongForm saveSong={saveSong} />;
};

export default NewSong;