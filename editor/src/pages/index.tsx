import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Song from './song';
import Songs from './songs';
import { Header, Login } from '../components';
import Container from 'react-bootstrap/Container';
import NewSong from './new-song';
import { IdentityModal, useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';


const AuthView: React.FC = () => {
  const identity = useIdentityContext()
  const [loginDialog, setLoginDialog] = React.useState(false)
  return (
    <Router>
      <Header user={identity.user} logoutAction={() => setLoginDialog(true)}/>
      <Container>
        {identity && identity.isLoggedIn ? (
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
        ) : (
            <Login loginAction={() => setLoginDialog(true)}/>
        )}
        <IdentityModal
          showDialog={loginDialog}
          onCloseDialog={() => setLoginDialog(false)}
          onLogin={(user) => console.log('hello ', user!.user_metadata)}
          onSignup={(user) => console.log('welcome ', user!.user_metadata)}
          onLogout={() => console.log('bye ')}
        />
      </Container>
    </Router>
  )
};

export default function Pages() {

  // const url = process.env.REACT_APP_NETLIFY_IDENTITY_URL 
  const url = 'https://lcbot-editor.netlify.com'
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
