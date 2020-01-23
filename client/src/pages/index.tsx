import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Song from './song';
import Songs from './songs';
// import Cart from './cart';
// import Profile from './profile';
import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Songs path="/" />
          <Song path="song/:songId" />
          {/* <Cart path="cart" /> */}
          {/* <Profile path="profile" /> */}
        </Router>
      </PageContainer>
      {/* <Footer /> */}
    </Fragment>
  );
}
