import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import * as MutationTypes from '../__generated__/submitSong';
import { ExecutionResult, MutationResult } from '@apollo/react-common';

export const ADD_SONG = gql`
  mutation submitSong($songId: ID!, $title: String!, $slides: [SlideInput], $links: [String]) {
    addSong(id: $songId, title: $title, slides: $slides, links: $links) {
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

interface SubmitSongResult {
  submitSong: (data: MutationTypes.submitSongVariables) => Promise<void | ExecutionResult<MutationTypes.submitSong>>;
  mutationResult: MutationResult<MutationTypes.submitSong>
}

const useSubmitSong: () => SubmitSongResult = () => {
  const [submitSongMutation, mutationResult] = useMutation<MutationTypes.submitSong, MutationTypes.submitSongVariables>(ADD_SONG, {
    errorPolicy: 'ignore',
    onError: (err) => {
      console.log(err.message);
    },
  });
  return {
    submitSong: (data: MutationTypes.submitSongVariables) => {
      return submitSongMutation && submitSongMutation({
        variables: data
      });
    },
    mutationResult
  }
};

export default useSubmitSong;