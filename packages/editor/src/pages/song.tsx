import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as QueryTypes from '../__generated__/SongDetails';

import Loading from '../atoms/loading';
import AppError from '../molecules/error';
import FormEdit from '../organisms/form-edit';

export const GET_SONG_DETAILS = gql`
  query SongDetails($songId: ID!) {
    song(id: $songId) {
      id
      title
      text
      links
    }
  }
`;


export interface SaveSongArgs {

}

const Song: React.FC = () => {

  const { songId } = useParams(); //https://reacttraining.com/react-router/web/api/Hooks/useparams

  const {loading, error, data} = useQuery<
    QueryTypes.SongDetails,
    Partial<QueryTypes.SongDetailsVariables>
  >(GET_SONG_DETAILS,
    { variables: { songId } }
  );

  if (loading) return <Loading />;

  return (
    <>
      {error &&
        <AppError err={error} />}
      <FormEdit songData={data && data.song || {id:'0'}} />
    </>
  );
}

export default Song;
