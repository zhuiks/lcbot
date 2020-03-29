import React from 'react';
import { Paper, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(4, 0),
      padding: theme.spacing(2, 3),
    }
  }));

interface SearchFormProps {
  filter?: string;
  onChange: (s: string) => void;
}


const SearchField: React.FC<SearchFormProps> = ({ filter = '', onChange }) => {

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.id} = "${e.target.value}"`);
    onChange(e.target.value);
  };
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root} elevation={3} >
      <TextField
        placeholder="Search"
        onChange={HandleInput}
        fullWidth
        // variant="outlined"
      />
    </Paper>
  );
}
export default SearchField;