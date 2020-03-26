import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Song from './song';
import Songs from './songs';
import Header from '../organisms/header';
import Login from '../organisms/login';
import NewSong from './new-song';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';

import { IdentityModal, useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';


const Main = styled(Container)({

});
const Routs: React.FC = () => (
  <Switch>
    <Route path="/edit/:songId">
      <Song />
    </Route>
    <Route path="/add">
      <NewSong />
    </Route>
    <Route path="/">
      <Songs />
    </Route>
  </Switch>
);


const AuthView: React.FC = () => {
  const identity = useIdentityContext();
  const [loginDialog, setLoginDialog] = React.useState(false);
  return (
    <Router>
      <Header user={identity.user} logoutAction={() => setLoginDialog(true)} />
      <Main>
        {identity && identity.isLoggedIn ? (
          <Routs />
        ) : (
            <Login loginAction={() => setLoginDialog(true)} />
          )}
        <IdentityModal
          showDialog={loginDialog}
          onCloseDialog={() => setLoginDialog(false)}
          onLogin={(user) => {
            setLoginDialog(false);
            console.log('hello ', user!.user_metadata);
          }}
          onSignup={(user) => {
            setLoginDialog(false);
            console.log('welcome ', user!.user_metadata);
          }}
          onLogout={() => console.log('bye ')}
        />
      </Main>
    </Router>
  )
};

export default function Pages() {

  if (process.env.NODE_ENV !== 'production') return (
    <Router>
      <Header user={true} logoutAction={() => console.log('Bye!')} />
      <Main>
        <Routs />
      </Main>
    </Router>
  );

  const url = process.env.REACT_APP_NETLIFY_IDENTITY_URL || '';
  if (!url)
    throw new Error(
      'process.env.REACT_APP_NETLIFY_IDENTITY_URL is blank, which means you probably forgot to set it in your Netlify environment variables',
    );
  return (
    <IdentityContextProvider url={url}>
      <AuthView />
    </IdentityContextProvider>
  );
}
