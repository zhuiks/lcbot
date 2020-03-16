import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Loading from '../atoms/loading';

import AppError from '../molecules/error';
import { SlideInput } from '../__generated__/globalTypes';
import textBreaker from '../lib/text-breaker';

import Step from '../molecules/step';
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

  const [songText, setText] = useState(
    typeof songData.text === 'string' ? songData.text : (songData.text ? songData.text.join('\n') : '')
  );
  const [songSlides, setSlides] = useState<SlideInput[]>([]);
  const [songTitle, setTitle] = useState<string>(songData.title || '');
  const [songLinks, setLinks] = useState<string[]>();

  const onStepChange = ({ previousStep, activeStep }: onStepChangeArgs) => {
    if (previousStep === 1) {
      setSlides(textBreaker(songText));
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
      <Badge variant="info">{songData.id}</Badge>
      {mutationResult.error &&
        <AppError err={mutationResult.error} />}
      {mutationResult.data ?
        <SubmitResult data={mutationResult.data.updateSong} />
        :
        <Row className="justify-content-center">
          <Col sm={6}>
            <Form>
              <StepWizard onStepChange={onStepChange}>
                <Step title="Song Lyrics" isNewSong={isNewSong}>
                  <Form.Control
                    id="song-text"
                    as="textarea"
                    rows="10"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }}
                    value={songText}
                    style={{ direction: "rtl" }}
                  />
                </Step>
                <Step title="Song Order" isNewSong={isNewSong}>
                  <Orderer slides={songSlides} />
                </Step>
                <Step title="Song Data" isNewSong={isNewSong}>
                  <Form.Group controlId="song-title">
                    <Form.Control
                      placeholder="Song title"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }}
                      value={songTitle}
                      style={{ direction: "rtl" }}
                    />
                  </Form.Group>
                </Step>
                <Step title="Extra Details" submit={submitForm} isNewSong={isNewSong}>
                  <Form.Group controlId="song-link">
                    <Form.Label>Video Link:</Form.Label>
                    <Form.Control
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLinks([e.target.value]) }}
                    />
                  </Form.Group>
                </Step>
              </StepWizard>
            </Form>
          </Col>
        </Row>
      }
    </>
  );
};

export default SaveForm;