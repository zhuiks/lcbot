import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as GetSongListTypes from '../__generated__/GetSongList';

import Loading from '../components/atoms/loading';
import AppError from '../components/molecules/error';
import FormAdd from '../components/organisms/form-add';
import generateKey from '../utils/generate-key';

const GET_IDS = gql`
  query GetSongIds {
    songs {
      id
    }
  }
`;

const NewSong: React.FC = () => {
  const {
    data,
    loading,
    error
  } = useQuery<
    GetSongListTypes.GetSongList
  >(GET_IDS);

  if (loading) return <Loading />;
  const usedIds = data && data.songs ?
    data.songs.map(song => song ? [song.id, true] : ['song_is_null', false])
    : [];
  console.log(Object.fromEntries(usedIds));
  const songId = generateKey('songId', Object.fromEntries(usedIds));

  return (
    <>
      {error &&
        <AppError err={error} />}
      <FormAdd songId={songId} />
    </>
  );
};

export default NewSong;