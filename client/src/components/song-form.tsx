import React, { Component } from 'react';

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

  // onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const title = (event.target as HTMLInputElement).value;
  //   this.setState(s => ({ title: title }));
  // };

  // onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   this.props.saveSong({ variables: { 
  //     title: this.state.title,
  //     text: this.state.text,
  //     links: this.state.links
  //    } });
  // };

  render() {
    return (
        <h1>New Song</h1>
        // <StyledForm onSubmit={(e) => this.onSubmit(e)}>
        //   <StyledInput
        //     required
        //     type="text"
        //     name="title"
        //     placeholder="Title"
        //     data-testid="title-input"
        //     onChange={(e) => this.onChange(e)}
        //   />
        //   <Button type="submit">Save</Button>
        // </StyledForm>
    );
  }
}