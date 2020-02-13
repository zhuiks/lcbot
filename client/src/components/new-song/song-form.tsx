import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import * as SavingTypes from '../../pages/__generated__/saveSong';
import { MutationFunctionOptions } from '@apollo/react-common';
import textBreaker from '../../utils/text-breaker';
import Step from './step';
import Orderer from './ordering';

interface SaveFormProps {
  saveSong: (options: MutationFunctionOptions<SavingTypes.saveSong, SavingTypes.saveSongVariables>) => any;
}

interface onStepChangeArgs {
  previousStep: number;
  activeStep: number;
}

const SaveForm: React.FC<SaveFormProps> = ({ saveSong }) => {

  const [songText, setText] = useState('');
  const [songSlides, setSlides] = useState();
  const [songTitle, setTitle] = useState('');
  const [songLinks, setLinks] = useState(['']);

  const onStepChange = ({ previousStep, activeStep }: onStepChangeArgs) => {
    if (previousStep === 1) {
      setSlides(textBreaker(songText));
    }
    if (previousStep === 2 && songTitle.length === 0 && songSlides && songSlides.length && songSlides[0].text.length) {
      setTitle(songSlides[0].text[0].replace(/\(\s?|\s?\)/g, ''));
    }
  }

  const submitForm = () => {
    saveSong({
      variables: {
        title: songTitle,
        text: [],
        links: songLinks
      }
    });
  };

  return (
    <Row className="justify-content-center">
      <Col sm={6}>
        <Form>
          <StepWizard onStepChange={onStepChange}>
            <Step title="Song Lyrics">
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