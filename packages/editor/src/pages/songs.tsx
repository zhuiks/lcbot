import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Fab } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

import Loading from '../atoms/loading';
import { SongRow, SearchField } from '../components';
import * as GetSongListTypes from '../__generated__/GetSongList';
import wordSearch from '../word-search';
import { LinkContainer } from 'react-router-bootstrap';

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
    <Container maxWidth="md">
      <SearchField filter={filter} onChange={setFilter} />
      <ListGroup variant="flush">
        {data.songs &&
          wordSearch(data.songs, filter).map((song: any) => (
            <SongRow key={song.id} song={song} />
          ))}
      </ListGroup>
      <LinkContainer to="/add">
        <Fab color="secondary" variant="extended"><PostAddIcon />&nbsp;Add Song</Fab>
      </LinkContainer>
    </Container>
  );
}

export default Songs;

