import React from 'react';
import { Paper, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    }
  }));

export default ({ song }: any) => {
  const { id, title } = song;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">
        <Link component={RouterLink} to={`/edit/${id}`}>
          {title}
        </Link>
      </Typography>
    </Paper>
  );
};
