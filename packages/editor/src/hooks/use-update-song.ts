import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import * as MutationTypes from '../__generated__/updateSong';
import { ExecutionResult, MutationResult } from '@apollo/react-common';

export const UPDATE_SONG = gql`
  mutation updateSong($songId: ID!, $title: String!, $slides: [SlideInput], $links: [String]) {
    updateSong(id: $songId, title: $title, slides: $slides, links: $links) {
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

interface UpdateSongResult {
  updateSong: (data: MutationTypes.updateSongVariables) => Promise<void | ExecutionResult<MutationTypes.updateSong>>;
  mutationResult: MutationResult<MutationTypes.updateSong>
}

export const useUpdateSong: () => UpdateSongResult = () => {
  const [updateSongMutation, mutationResult] = useMutation<MutationTypes.updateSong, MutationTypes.updateSongVariables>(UPDATE_SONG, {
    errorPolicy: 'ignore',
    onError: (err) => {
      console.log(err.message);
    },
  });
  return {
    updateSong: (data: MutationTypes.updateSongVariables) => {
      return updateSongMutation && updateSongMutation({
        variables: data
      });
    },
    mutationResult
  }
};
