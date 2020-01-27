import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'; 
import { useParams } from 'react-router-dom';
import { Loading, SongText } from '../components';
import * as SongDetailsTypes from './__generated__/SongDetails';

export const GET_SONG_DETAILS = gql`
  query SongDetails($songId: ID!) {
    song(id: $songId) {
      id
      title
      text
    }
  }
`;

interface SongVars extends SongDetailsTypes.SongDetailsVariables {
  songId: any;
};

const Song: React.FC = () => {
  
  let { songId } = useParams(); //https://reacttraining.com/react-router/web/api/Hooks/useparams

  const { 
    data, 
    loading, 
    error 
  } = useQuery<
    SongDetailsTypes.SongDetails, 
    SongVars
  >(GET_SONG_DETAILS, 
    { variables: { songId } }
  );
  
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <h1>{data.song && data.song.title}</h1>
      <SongText {...data.song} />
      {/* <ActionButton {...data.song} /> */}
    </Fragment>
  );
}

export default Song;
