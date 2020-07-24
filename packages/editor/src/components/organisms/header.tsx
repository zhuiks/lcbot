import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Link,
  Avatar,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import logo from '../../assets/logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.primary.dark,
    },
    siteName: {
      flexGrow: 1,
      '& > a': {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
      }
    },
  }));


interface HeaderProps {
  title?: string;
  children?: any;
  user: any;
  logoutAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = 'Lyrics & Chords', user, logoutAction, children }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
      <Toolbar>

        <IconButton edge="start" component={RouterLink} to="/">
          <Avatar
            alt=""
            src={logo}
          />
        </IconButton>
        <Typography className={classes.siteName} variant="h6">
          <Link component={RouterLink} to="/">
            {title}
          </Link>
        </Typography>
        {user && (
          <>
            <Typography>
              Hello <strong>{(user.user_metadata && user.user_metadata.full_name) || 'NoName'}</strong>!
          </Typography>
            <Button color="inherit" onClick={logoutAction} title="Log Out"><ExitToAppIcon /></Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;