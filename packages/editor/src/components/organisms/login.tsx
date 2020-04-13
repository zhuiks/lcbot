import React from 'react';

import { Grid, Paper, Typography, Button } from '@material-ui/core';

interface LoginProps {
    loginAction: () => void;
}

const Login: React.FC<LoginProps> = ({ loginAction }) => (
    <Grid container>
        <Grid item>
            <Paper>
                <Typography>You must log in to view the page</Typography>
                <Button onClick={() => loginAction()}>Log in</Button>
            </Paper>
        </Grid>
    </Grid>
)

export default Login;