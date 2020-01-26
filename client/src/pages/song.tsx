import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'; 

import { Loading, Header, SongDetail } from '../components';
// import { ActionButton } from '../containers';
import { RouteComponentProps } from '@reach/router';
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

interface SongProps extends RouteComponentProps {
  songId?: any;
}

const Song: React.FC<SongProps> = ({ songId }) => {
  const { 
    data, 
    loading, 
    error 
  } = useQuery<
    SongDetailsTypes.SongDetails, 
    SongDetailsTypes.SongDetailsVariables
  >(GET_SONG_DETAILS, 
    { variables: { songId } }
  );
  
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header>
        {data && data.song && data.song.title}
      </Header>
      <SongDetail {...data.song} />
      {/* <ActionButton {...data.song} /> */}
    </Fragment>
  );
}

export default Song;
