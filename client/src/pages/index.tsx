import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Song from './song';
import Songs from './songs';
// import Cart from './cart';
import { Footer, PageContainer } from '../components';
import NewSong from './new-song';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Songs path="/" />
          <Song path="song/:songId" />
          <NewSong path="new" />
          {/* <Profile path="profile" /> */}
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
