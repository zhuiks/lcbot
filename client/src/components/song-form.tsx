import React, { Fragment, Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PageHeader } from '.';

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
    switch(el.id) {
      case "newSongForm.Title":
        newState = {title: el.value.trim()};
        break;
      case "newSongForm.Text":
        newState = el.value.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
        if(this.state.title.length === 0 && newState.length > 1) {
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
      case "newSongForm.Link":
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
    this.props.saveSong({ variables: { 
      title: this.state.title,
      text: this.state.text,
      links: this.state.links
     } });
  };

  render() {
    return (
      <Fragment>
        <PageHeader>New Song</PageHeader>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="newSongForm.Title">
            <Form.Control
              placeholder="Song title (not required)"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.onChange(e.target)}}
            />
          </Form.Group>
          <Form.Group controlId="newSongForm.Text">
            <Form.Label>Song Lyrics:</Form.Label>
            <Form.Control 
              as="textarea"
              rows="10"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.onChange(e.target)}}
            />
          </Form.Group>
          <Form.Group controlId="newSongForm.Link">
            <Form.Label>Video Link:</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.onChange(e.target)}}
            />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      </Fragment>
    );
  }
}