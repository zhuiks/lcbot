import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SongForm, Loading, SaveResult, AppError } from '../components';
import * as SavingTypes from './__generated__/saveSong';

export const SAVE_SONG = gql`
  mutation saveSong($title: String, $text: [String]!, $links: [String]) {
    saveSong(title: $title, text: $text, links: $links) {
      success
      message
      song {
        id
        title
        text
      }
    }
  }
`;

interface NewSongProps { };

const NewSong: React.FC<NewSongProps> = () => {
  const [saveSong, { 
    data,
    loading, 
    error 
  }] = useMutation<SavingTypes.saveSong, SavingTypes.saveSongVariables>(SAVE_SONG, {
     errorPolicy: 'ignore',
     onError: (err) => {
      console.log(err.message);
    },
  });
  if (loading) return <Loading />;
  if (error) return <AppError err={error} />;
  if (data) return <SaveResult data={data.saveSong} />;

  return <SongForm saveSong={saveSong} />;
};

export default NewSong;