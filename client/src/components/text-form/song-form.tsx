import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { updateSongVariables } from '../../__generated__/updateSong';
import { SlideInput } from '../../__generated__/globalTypes';
import textBreaker from '../../utils/text-breaker';
import Step from './step';
import Orderer from './ordering';
import { useUpdateSong } from './submit';

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
  const [songSlides, setSlides] = useState<SlideInput[]>();
  const [songTitle, setTitle] = useState<string>(songData.title || '');
  const [songLinks, setLinks] = useState<string[]>();

  const onStepChange = ({ previousStep, activeStep }: onStepChangeArgs) => {
    if (previousStep === 1) {
      setSlides(textBreaker(songText));
    }
    if (previousStep === 2 && !songTitle && songSlides && songSlides.length && songSlides[0].lines) {
      setTitle(songSlides[0].lines[0].replace(/\(\s?|\s?\)/g, ''));
    }
  }

  const submitForm = useUpdateSong({
    songId: '',
    title: songTitle || '',
    slides: songSlides,
    links: songLinks
  });

  return (
    <Row className="justify-content-center">
      <Col sm={6}>
        <Form>
          <StepWizard onStepChange={onStepChange}>
            <Step title="Song Lyrics" isNewSong={songData ? false : true}>
              <Form.Control
                id="song-text"
                as="textarea"
                rows="10"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }}
                value={songText}
              />
            </Step>
            <Step title="Song Order">
              <Orderer slides={songSlides} />
            </Step>
            <Step title="Song Data">
              <Form.Group controlId="song-title">
                <Form.Control
                  placeholder="Song title"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }}
                  value={songTitle}
                />
              </Form.Group>
            </Step>
            <Step title="Extra Details" submit={submitForm}>
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
  );
};

export default SaveForm;