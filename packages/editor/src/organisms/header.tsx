import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/logo.png';

interface HeaderProps {
  title?: string;
  children?: any;
  user: any;
  logoutAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = 'Lyrics & Chords', user, logoutAction, children }) => {

  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {title}
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {user && (
          <Navbar.Text>
            Hello <strong>{(user.user_metadata && user.user_metadata.full_name) || 'NoName'}</strong>!
          </Navbar.Text>
        )}
        <Nav>
          {user && (
            <Nav.Link onClick={logoutAction}>Log Out</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;