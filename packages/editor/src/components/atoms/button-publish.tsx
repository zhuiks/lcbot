import React from 'react';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(1),
            background: theme.palette.primary.dark,
            height: theme.spacing(6),
            width: theme.spacing(6),
        },
        paper: {
            position: 'absolute',
            width: 480,
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.contrastText,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            textAlign: 'center',
            direction: 'ltr',
            flip: false,
            '& h2': {
                color: theme.palette.error.dark,
            },
            '& button': {
                margin: theme.spacing(1),
            }

        },
    }));

const ButtonPublish: React.FC = () => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const url = process.env.REACT_APP_BUILD_HOOK;
    if(!url) {
        return null;
    }
    const data = {};

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBuild = () => {
        fetch(`${url}?trigger_title=Triggered from Editor by someone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(()=>{
            setOpen(false);
            setDisabled(true);    
        })
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Publish Songs</h2>
            <p id="simple-modal-description">
                Republishing all songs to the public website <a href="https://bayader.tk" target="_blank">bayader.tk</a> requires complete rebuild of the website. Resources for that are limited. It may take up to 10 min for a new build to finish. After that all songs will be avaliable on the public website.
            </p>
            <p>Are you sure you want to proceed with the new build?</p>
            <Button variant="contained" color="secondary" onClick={handleBuild}>Build</Button>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </div>
    );
    return (
        <>
            <Fab className={classes.root} color="primary" onClick={handleOpen} disabled={disabled}>
                <PublishIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}

export default ButtonPublish;