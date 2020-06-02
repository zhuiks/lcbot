import React, { useState } from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Chip, Paper, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Loading from '../atoms/loading';
import AppError from '../molecules/error';

import SongLyrics from '../atoms/song-lyrics';
import PageHeader from '../atoms/page-header';
import StepActions from '../molecules/step-actions'
import SongConfirm from '../molecules/song-confirm';
import SubmitResult from './submit-result';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useAddReducer from '../../hooks/use-add-reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      position: "relative",
    },
    chip: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    }
  }));

interface AddFormProps {
  songId: string;
}

const FormAdd: React.FC<AddFormProps> = ({ songId }) => {

  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyles();

  const { state, dispatch, mutationResult } = useAddReducer(songId);


  if (mutationResult.loading) return <Loading />

  return (
    <>
      {mutationResult.error &&
        <AppError err={mutationResult.error} />}
      {mutationResult.data ?
        <SubmitResult data={mutationResult.data.addSong} />
        : (
          <Paper className={classes.root} component="form">
            <Chip className={classes.chip} size="small" icon={<VpnKeyIcon />} label={songId} />
            <PageHeader>Add New Song</PageHeader>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Song Lyrics</StepLabel>
                <StepContent>
                  <SongLyrics
                    onChange={text => dispatch({ type: 'SET_LYRICS', payload: text })}
                    value={state.songLyrics}
                  />
                  <StepActions
                    activeStep={activeStep}
                    totalSteps={2}
                    setStep={setActiveStep}
                    onNextStep={() => dispatch({ type: 'CONFIRM_LYRICS' })}
                  />
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Confirm</StepLabel>
                <StepContent>
                  <SongConfirm
                    slides={state.slides}
                    songTitle={state.songTitle}
                    onTitleChange={s => dispatch({ type: 'SET_TITLE', payload: s })}
                    link={{
                      value: state.songLink,
                      isInvalid: state.isLinkInvalid,
                      onChange: s => dispatch({ type: 'SET_LINK', payload: s }),
                      validate: () => dispatch({ type: 'VALIDATE_LINK' }),
                    }}
                  />
                  <StepActions
                    activeStep={activeStep}
                    totalSteps={2}
                    setStep={setActiveStep}
                    onNextStep={() => dispatch({ type: 'SAVE_SONG' })}
                  />
                </StepContent>
              </Step>
            </Stepper>
          </Paper>
        )
      }
    </>
  )
};

export default FormAdd;