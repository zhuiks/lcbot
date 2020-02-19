import React, { useState } from 'react';
import { RouteComponentProps, withRouter, Route, Redirect } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

interface NetlifyAuth {
    isAuthenticated: boolean;
    user: netlifyIdentity.User | null;
    authenticate: (cb: (user: netlifyIdentity.User) => void) => void;
    signout: (cb: () => void) => void;
}

export const netlifyAuth: NetlifyAuth = {
    isAuthenticated: false,
    user: null,
    authenticate(callback) {
        this.isAuthenticated = true;
        netlifyIdentity.open();
        netlifyIdentity.on('login', user => {
            this.user = user;
            callback(user);
        });
    },
    signout(callback) {
        this.isAuthenticated = false;
        netlifyIdentity.logout();
        netlifyIdentity.on('logout', () => {
            this.user = null;
            callback();
        });
    }
};

export const AuthButton = withRouter(
    ({ history }: RouteComponentProps) => {
        return (
            netlifyAuth.isAuthenticated ? (
                <p>
                    Welcome, {netlifyAuth.user?.user_metadata.full_name}
                    <button
                        onClick={() => {
                            netlifyAuth.signout(() => history.push('/'));
                        }}
                    >Sign out
                    </button>
                </p>
            ) : (
                <p></p>
            ) 
        );
    }
);

export const PrivateRoute: React.FC<{ children?: any, path?: string }> = ({ children, ...rest }) => (
    <Route {...rest} >
        {netlifyAuth.isAuthenticated ? (
            { children }
        ) : (
                <Redirect to="/login" />
            )
        }
    </Route>
);

export const Login: React.FC = () => {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const login = () => {
        netlifyAuth.authenticate(() => {
            setRedirectToReferrer(true);
        });
    };

    if (redirectToReferrer) return <Redirect to="/" />;

    return (
        <Row className="h-100 justify-content-center align-items-center text-center" style={{minHeight: "100vh", marginTop: "-7rem"}}>
            <Col sm={6}>
                <p>You must log in to view the page</p>
                <Button size="lg" onClick={login}>Log in</Button>
            </Col>
        </Row>
    );
}
