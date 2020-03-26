import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Link, Avatar, Typography, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../assets/logo.png';

interface HeaderProps {
  title?: string;
  children?: any;
  user: any;
  logoutAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = 'Lyrics & Chords', user, logoutAction, children }) => {

  return (
    <AppBar position="relative">
      <Toolbar>

        <IconButton edge="start" component={RouterLink} to="/">
          <Avatar
            alt=""
            src={logo}
          />
        </IconButton>
        <Typography>
          <Link component={RouterLink} to="/">
            {title}
          </Link>
        </Typography>
        {user && (
          <>
            <Typography>
              Hello <strong>{(user.user_metadata && user.user_metadata.full_name) || 'NoName'}</strong>!
          </Typography>
            <IconButton onClick={logoutAction}><ExitToAppIcon /></IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;