import React from 'react';
import Fab, { FabProps } from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            background: theme.palette.secondary.light,
        }
    }));

const ButtonSave: React.FC<Partial<FabProps>> = (props) => {
    const classes = useStyles();   
    return (
        <Fab className={classes.root} color="secondary" variant="extended" {...props} >
            <SaveIcon />
            &nbsp;Save
        </Fab>
    );
}

export default ButtonSave;