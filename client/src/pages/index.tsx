import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Song from './song';
import Songs from './songs';
import NewSong from './new-song';
import { Header } from '../components';
import Container from 'react-bootstrap/Container';

export default function Pages() {

  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/song/:songId">
            <Song />
          </Route>
          <Route path="/add">
            <NewSong />
          </Route>
          <Route path="/">
            <Songs />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
