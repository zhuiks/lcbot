import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import * as MutationTypes from '../../__generated__/updateSong';

export const UPDATE_SONG = gql`
  mutation updateSong($songId: ID!, $title: String!, $slides: [SlideInput], $links: [String]) {
    updateSong(id: $songId, title: $title, text: $slides, links: $links) {
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

export const useUpdateSong = (data: MutationTypes.updateSongVariables) => {
  const [updateSongMutation, mutationResult] = useMutation<MutationTypes.updateSong, MutationTypes.updateSongVariables>(UPDATE_SONG, {
    errorPolicy: 'ignore',
    onError: (err) => {
      console.log(err.message);
    },
  });
  return [
    updateSongMutation({
      variables: data
    }),
    mutationResult
  ]
};
