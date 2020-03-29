import React, { useState } from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Chip, Paper, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Loading from '../atoms/loading';
import AppError from '../molecules/error';
import { SlideInput } from '../__generated__/globalTypes';
import textBreaker from '../lib/text-breaker';

import SongLyrics from '../atoms/song-lyrics';
import PageHeader from '../atoms/page-header';
import StepActions from '../molecules/step-actions'
import SongConfirm from '../molecules/song-confirm';
import { useUpdateSong } from '../molecules/submit';
import SubmitResult from './submit-result';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

interface SaveFormProps {
  songData: {
    id: string,
    title?: string | null,
    text?: (string | null)[],
    slides?: SlideInput[],
    links?: (string | null)[] | null
  };
}

const FormEdit: React.FC<SaveFormProps> = ({ songData }) => {

  const [songLyrics, setLyrics] = useState(
    typeof songData.text === 'string' ? songData.text : (songData.text ? songData.text.join('\n') : '')
  );
  const [songSlides, setSlides] = useState<SlideInput[]>([]);
  const [songTitle, setTitle] = useState<string>(songData.title || '');
  const [activeStep, setActiveStep] = React.useState(0);

  const { updateSong, mutationResult } = useUpdateSong();
  const classes = useStyles();

  const submitForm = () => {
    updateSong({
      songId: songData.id,
      title: songTitle,
      slides: songSlides,
      links: []
    });
  }

  if (mutationResult.loading) return <Loading />;
  return (
    <>
      {mutationResult.error &&
        <AppError err={mutationResult.error} />}
      {mutationResult.data ?
        <SubmitResult data={mutationResult.data.updateSong} />
        :
        <Paper className={classes.root} component="form">
          <Chip className={classes.chip} size="small" icon={<VpnKeyIcon />} label={songData.id} />
          <PageHeader>Add New Song</PageHeader>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Confirm</StepLabel>
              <StepContent>
                <SongConfirm
                  slides={songSlides}
                  songTitle={songTitle}
                  onTitleChange={setTitle}
                />
                <StepActions
                  activeStep={activeStep}
                  totalSteps={2}
                  setStep={setActiveStep}
                  onNextStep={submitForm}
                />
              </StepContent>
            </Step>
          </Stepper>
        </Paper>
      }
    </>
  )
};

export default FormEdit;