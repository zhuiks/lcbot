import React, { useState, Component } from 'react';
import StepWizard from 'react-step-wizard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Step from './step';
import * as SavingTypes from '../../pages/__generated__/saveSong';
import { MutationFunctionOptions } from '@apollo/react-common';
import textBreaker from '../../utils/text-breaker';

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
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <Form onSubmit={onSubmit}>
          <StepWizard onStepChange={onStepChange}>
            <Step title="Song Lyrics">
              <Form.Control
                id="song-text"
                as="textarea"
                rows="10"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }}
              />
            </Step>
            <Step title="Song Order">
              <div>
                {JSON.stringify(songSlides, undefined, 2)}
              </div>
            </Step>
            <Step title="Song Data">
              <Form.Group controlId="song-title">
                <Form.Control
                  placeholder="Song title"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }}
                />
              </Form.Group>
            </Step>
            <Step title="Extra Details">
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