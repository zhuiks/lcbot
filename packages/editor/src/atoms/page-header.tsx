import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2,3,0,3),
    },
  }));


interface PageHeaderProps {
  link?: string;
  children: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ link = '', children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.root} variant="h3" component="h1">
      {link !== '' ? (
        <Link component={RouterLink} to={link}>{children}</Link>
      ) : (
          <>{children}</>
        )}
    </Typography>
  );
}

export default PageHeader;
