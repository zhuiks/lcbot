import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SongRow, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import * as GetSongListTypes from './__generated__/GetSongList';

const GET_SONGS = gql`
  query GetSongList {
    songs {
      id
      title
    }
  }
`;

interface SongsProps extends RouteComponentProps { }

const Songs: React.FC<SongsProps> = () => {
  const { 
    data, 
    loading, 
    error
  } = useQuery<
    GetSongListTypes.GetSongList
  >(GET_SONGS);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header/>
      {data.songs &&
        data.songs.map((song: any) => (
          <SongRow key={song.id} song={song} />
        ))}
    </Fragment>
  );
}

export default Songs;

