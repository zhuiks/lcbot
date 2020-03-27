import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';


const ButtonAdd: React.FC = () => (
    <Fab color="secondary" variant="extended" component={RouterLink} to="/add">
        <PostAddIcon />
        &nbsp;Add Song
    </Fab>
);

export default ButtonAdd;