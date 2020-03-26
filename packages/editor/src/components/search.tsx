import React from 'react';
import { Paper, TextField } from '@material-ui/core';

interface SearchFormProps {
  filter?: string;
  onChange: (s: string) => void;
}


const SearchField: React.FC<SearchFormProps> = ({ filter = '', onChange }) => {

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.id} = "${e.target.value}"`);
    onChange(e.target.value);
  };

  return (
    <Paper component="form">
      <TextField
        placeholder="Search"
        onChange={HandleInput}
      />
    </Paper>
  );
}
export default SearchField;