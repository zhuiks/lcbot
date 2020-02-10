import React, { Fragment, Component } from 'react';
import StepWizard from 'react-step-wizard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Step from './step';

interface SaveFormProps {
  saveSong: (a: { variables: any }) => void;
}

interface SaveFormState {
  title: string;
  text: string[];
  links: string[];
}

export default class SaveForm extends Component<SaveFormProps, SaveFormState> {
  state = {
    title: '',
    text: [''],
    links: ['']
  };

  onChange = (el: HTMLInputElement) => {
    console.log(`${el.id} = "${el.value}"`);
    let newState: any = {};
    switch (el.id) {
      case "song-title":
        newState = { title: el.value.trim() };
        break;
      case "song-text":
        newState = el.value.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
        if (this.state.title.length === 0 && newState.length > 1) {
          newState = {
            text: newState,
            title: newState[0].trim() //todo: update html input
          }
        } else {
          newState = {
            text: newState
          }
        }
        break;
      case "song-link":
        newState = {
          links: [el.value]
        }
        break;
    }
    console.log(newState);
    this.setState(newState);
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.saveSong({
      variables: {
        title: this.state.title,
        text: this.state.text,
        links: this.state.links
      }
    });
  };

  render() {
    return (
      <Row className="justify-content-center">
        <Col sm={6}>
        <Form onSubmit={this.onSubmit}>
          <StepWizard>
            <Step title="Song Lyrics">
                <Form.Control
                  id="song-text"
                  as="textarea"
                  rows="10"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.onChange(e.target) }}
                />
            </Step>
            <Step title="Song Data">
              <Form.Group controlId="song-title">
                <Form.Control
                  placeholder="Song title"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.onChange(e.target) }}
                />
              </Form.Group>
            </Step>
            <Step title="Extra Details">
              <Form.Group controlId="song-link">
                <Form.Label>Video Link:</Form.Label>
                <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.onChange(e.target) }}
                />
              </Form.Group>
            </Step>
          </StepWizard>
        </Form>
        </Col>
      </Row>
    );
  }
}