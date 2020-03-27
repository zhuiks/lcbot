import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Chip, Paper, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Loading from '../atoms/loading';
import AppError from '../molecules/error';
import { SlideInput } from '../__generated__/globalTypes';
import textBreaker from '../lib/text-breaker';

import SongLyrics from '../atoms/song-lyrics';
import PageHeader from '../atoms/page-header';
import StepActions from '../molecules/step-actions'
import Orderer from '../molecules/orderer';
import { useUpdateSong } from '../molecules/submit';
import SubmitResult from './submit-result';

interface SaveFormProps {
  songData: {
    id: string,
    title?: string | null,
    text?: (string | null)[],
    slides?: SlideInput[],
    links?: (string | null)[] | null
  };
}

interface onStepChangeArgs {
  previousStep: number;
  activeStep: number;
}

const SaveForm: React.FC<SaveFormProps> = ({ songData }) => {

  const [songLyrics, setLyrics] = useState(
    typeof songData.text === 'string' ? songData.text : (songData.text ? songData.text.join('\n') : '')
  );
  const [songSlides, setSlides] = useState<SlideInput[]>([]);
  const [songTitle, setTitle] = useState<string>(songData.title || '');
  const [songLinks, setLinks] = useState<string[]>();
  const [activeStep, setActiveStep] = React.useState(0);
 
  const onStepChange = ({ previousStep, activeStep }: onStepChangeArgs) => {
    if (previousStep === 1) {
      setSlides(textBreaker(songLyrics));
    }
    if (previousStep === 2 && !songTitle && songSlides && songSlides.length && songSlides[0].lines) {
      setTitle(songSlides[0].lines[0].replace(/\|\:|\:\|/g, ''));
    }
  }

  const { updateSong, mutationResult } = useUpdateSong();

  const submitForm = () => {
    updateSong({
      songId: songData.id,
      title: songTitle,
      slides: songSlides,
      links: songLinks
    });
  }

  const isNewSong = songData.text ? false : true;

  if (mutationResult.loading) return <Loading />;
  return (
    <>
      <Chip size="small" icon={<VpnKeyIcon />} label={songData.id} />
      {mutationResult.error &&
        <AppError err={mutationResult.error} />}
      {mutationResult.data ?
        <SubmitResult data={mutationResult.data.updateSong} />
        :
        <Paper component="form">
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
                  totalSteps={4}
                  setStep={setActiveStep}
                  onNextStep={()=>setSlides(textBreaker(songLyrics))}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Song Order</StepLabel>
              <StepContent>
                <Orderer slides={songSlides} />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Song Data</StepLabel>
              <StepContent>
                <Form.Group controlId="song-title">
                  <Form.Control
                    placeholder="Song title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }}
                    value={songTitle}
                    style={{ direction: "rtl" }}
                  />
                </Form.Group>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Extra Details</StepLabel>
              <StepContent>
                <Form.Group controlId="song-link">
                  <Form.Label>Video Link:</Form.Label>
                  <Form.Control
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLinks([e.target.value]) }}
                  />
                </Form.Group>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>
      }
    </>
  )
};

export default SaveForm;