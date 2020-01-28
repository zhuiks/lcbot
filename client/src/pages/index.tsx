import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Song from './song';
import Songs from './songs';
import NewSong from './new-song';
import { Header } from '../components';
import Container from 'react-bootstrap/Container';

export default function Pages() {
  const [filter, setFilter] = useState("");

  return (
    <Router>
      <Header filter={filter} filterAction={setFilter} />
      <Container>
        <Switch>
          <Route path="/song/:songId">
            {filter.length > 0 ? <Redirect to="/" /> : <Song />}
          </Route>
          <Route path="/add">
            <NewSong />
          </Route>
          <Route path="/">
            <Songs filter={filter} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
