import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from '@material-ui/core';

import Loading from '../components/atoms/loading';
import AppError from '../components/molecules/error';
import ButtonAdd from '../components/atoms/button-add';
import { SongRow, SearchField } from '../components';
import * as GetSongListTypes from '../__generated__/GetSongList';
import wordSearch from '../word-search';

const GET_SONGS = gql`
  query GetSongList {
    songs {
      id
      title
      hasChords
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
  if (error) return <AppError err={error} />;
  if (!data || !data.songs) return <p>Not found</p>;
  const songs = data.songs.sort((a, b) => {
    if (!(a && a.title) && !(b && b.title)) return 0;
    if (!(b && b.title)) return 1;
    if (!(a && a.title)) return -1;
    return a.title.localeCompare(b.title, 'ar', { sensitivity: 'base' })
  });
  return (
    <>
      <SearchField filter={filter} onChange={setFilter} />
      <Grid
        container
        spacing={2}
        direction="column"
        // justify="flex-start"
        // alignItems="flex-start"
        // alignContent="stretch"
        wrap="nowrap"
      >
        {wordSearch(songs, filter).map((song: any) => (
          <Grid item key={song.id}>
            <SongRow song={song} />
          </Grid>
        ))}
      </Grid>
      <ButtonAdd />
    </>
  );
}

export default Songs;

