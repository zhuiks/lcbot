import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from '@material-ui/core';

import Loading from '../atoms/loading';
import ButtonAdd from '../atoms/button-add';
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
        {data.songs &&
          wordSearch(data.songs, filter).map((song: any) => (
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

