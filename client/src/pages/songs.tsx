import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ListGroup from 'react-bootstrap/ListGroup';

import { SongRow, Loading } from '../components';
import * as GetSongListTypes from './__generated__/GetSongList';
import wordSearch from '../word-search';

const GET_SONGS = gql`
  query GetSongList {
    songs {
      id
      title
    }
  }
`;

interface SongsProps { 
  filter?: string
}

const Songs: React.FC<SongsProps> = ({filter = ""}) => {
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
    <ListGroup variant="flush">
        {data.songs &&
        wordSearch(data.songs, filter).map((song: any) => (
          <SongRow key={song.id} song={song} />
        ))}
    </ListGroup>
    </Fragment>
  );
}

export default Songs;

