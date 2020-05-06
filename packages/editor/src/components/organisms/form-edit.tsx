import React from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Grid, Chip, Paper, Button, Backdrop } from '@material-ui/core';
import Loading from '../atoms/loading';
import AppError from '../molecules/error';

import GridSlideMap from '../molecules/grid-slide-map';
import useFormReducer from '../../hooks/use-form-reducer';
import { SongDetails_song as ISongData } from '../../__generated__/SongDetails';
import SubmitResult from './submit-result';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Editable from '../atoms/editable';
import ButtonSave from '../atoms/button-save';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
      position: "relative",
      borderBottom: "2px dotted " + theme.palette.background.default,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    chip: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    rootBottom: {
      padding: theme.spacing(2),
      borderTop: "2px dotted " + theme.palette.background.default,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    backdrop: {
      zIndex: 0,
    }
  }));

interface EditFormProps {
  songData: ISongData;
}
const FormEdit: React.FC<EditFormProps> = ({ songData }) => {

  const classes = useStyles();
  const { state, dispatch, mutationResult } = useFormReducer(songData);
  const editingSlide = state.editSlide >= 0;

  if (mutationResult.loading) return <Loading />;
  return (
    <>
      {mutationResult.error &&
        <AppError err={mutationResult.error} />}
      {mutationResult.data ? (
        <SubmitResult data={mutationResult.data.updateSong} />
      ) : (
          <>
            <Grid
              container
              component="form"
              spacing={1}
              direction="column"
              wrap="nowrap"
            >
              <Grid item>
                <Paper className={classes.root} elevation={2}>
                  <Chip
                    className={classes.chip}
                    size="small"
                    icon={<VpnKeyIcon />}
                    label={state.songId}
                  />
                  <Editable
                    variant="h3"
                    helperText="Song title"
                    onChange={(s: string) => dispatch({ type: 'TITLE_CHANGE', payload: s })}
                  >
                    {state.songTitle}
                  </Editable>
                </Paper>
              </Grid>
              <GridSlideMap
                slides={state.slides}
                editSlide={state.editSlide}
                editSlideName={state.slideName}
                dispatch={dispatch}
              />
            </Grid>
            <ButtonSave
              disabled={editingSlide}
              onClick={() => dispatch({ type: 'SONG_SAVE' })}
            />
          </>
        )
      }
      <Backdrop className={classes.backdrop} open={editingSlide} />
    </>
  )
};

export default FormEdit;