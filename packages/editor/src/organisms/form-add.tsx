import React, { useState } from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Chip, Paper, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Loading from '../atoms/loading';
import AppError from '../molecules/error';
import textBreaker from '../lib/text-breaker';

import SongLyrics from '../atoms/song-lyrics';
import PageHeader from '../atoms/page-header';
import StepActions from '../molecules/step-actions'
import SongConfirm from '../molecules/song-confirm';
import { useUpdateSong } from '../molecules/use-update-song';
import SubmitResult from './submit-result';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';

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
    slides?: ChordSlide[],
    links?: (string | null)[] | null
  };
}

const FormAdd: React.FC<SaveFormProps> = ({ songData }) => {

  const [songLyrics, setLyrics] = useState(
    typeof songData.text === 'string' ? songData.text : (songData.text ? songData.text.join('\n') : '')
  );
  const [songSlides, setSlides] = useState<ChordSlide[]>([]);
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
              <StepLabel>Song Lyrics</StepLabel>
              <StepContent>
                <SongLyrics
                  onChange={setLyrics}
                  value={songLyrics}
                />
                <StepActions
                  activeStep={activeStep}
                  totalSteps={2}
                  setStep={setActiveStep}
                  onNextStep={() => {
                    setSlides(textBreaker(songLyrics));
                    if (songSlides && songSlides.length && songSlides[0].lines) {
                      setTitle(songSlides[0].lines[0].replace(/\|:|:\|/g, ''));
                    }
                  }}
                />
              </StepContent>
            </Step>
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

export default FormAdd;