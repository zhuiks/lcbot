import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ListGroup from 'react-bootstrap/ListGroup';

import Loading from '../atoms/loading';
import { SongRow, SearchField } from '../components';
import * as GetSongListTypes from '../__generated__/GetSongList';
import wordSearch from '../word-search';

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
  const [filter, setFilter] = useState("");
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
      <SearchField filter={filter} onChange={setFilter} />
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

