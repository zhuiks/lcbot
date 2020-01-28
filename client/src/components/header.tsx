import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/logo.png';


interface HeaderProps {
  title?: string;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ title= 'Lyrics & Chords', children }) => {

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
        <Nav>
          <LinkContainer to="/add">
            <Nav.Link>Add Song</Nav.Link>
          </LinkContainer>
        </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Header;