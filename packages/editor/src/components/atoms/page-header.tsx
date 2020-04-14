import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      margin: theme.spacing(0, 3, 0, 3),
      height: "4.9rem",
    },
  }));


interface PageHeaderProps {
  link?: string;
  children: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ link = '', children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.root} >
      {link !== '' ? (
        <Link component={RouterLink} to={link}>{children}</Link>
      ) : (
          <>{children}</>
        )}
    </Typography>
  );
}

export default PageHeader;
