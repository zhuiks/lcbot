import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Song from './song';
import Songs from './songs';
import { Header, Login, PrivateRoute } from '../components';
import Container from 'react-bootstrap/Container';
import NewSong from './new-song';

export default function Pages() {

  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/edit/:songId">
            <Song />
          </PrivateRoute>
          <PrivateRoute path="/add">
            <NewSong />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Songs />
          </PrivateRoute>
        </Switch>
      </Container>
    </Router>
  );
}
