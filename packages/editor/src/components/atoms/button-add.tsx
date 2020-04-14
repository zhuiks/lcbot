import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            background: theme.palette.secondary.light,
        }
    }));

const ButtonAdd: React.FC = () => {
    const classes = useStyles();   
    return (
        <Fab className={classes.root} color="secondary" variant="extended" component={RouterLink} to="/add" >
            <PostAddIcon />
            &nbsp;Add Song
        </Fab>
    );
}

export default ButtonAdd;