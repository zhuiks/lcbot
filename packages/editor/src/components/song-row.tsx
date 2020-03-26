import React from 'react';
import { Paper, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export default ({ song }: any) => {
  const { id, title } = song;
  return (
    <Paper>
      <Typography>
        <Link component={RouterLink} to={`/edit/${id}`}>
          {title}
        </Link>
      </Typography>
    </Paper>
  );
};
