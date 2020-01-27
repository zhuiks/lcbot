import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ListGroup from 'react-bootstrap/ListGroup';

import { SongRow, Loading } from '../components';
import * as GetSongListTypes from './__generated__/GetSongList';

const GET_SONGS = gql`
  query GetSongList {
    songs {
      id
      title
    }
  }
`;

interface SongsProps { }

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
    <ListGroup variant="flush">
        {data.songs &&
        data.songs.map((song: any) => (
          <SongRow key={song.id} song={song} />
        ))}
    </ListGroup>
  );
}

export default Songs;

