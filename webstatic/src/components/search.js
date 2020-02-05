import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const SearchField = ({ filter = '', onChange }) => {

  const HandleInput = (e) => {
    console.log(`${e.target.id} = "${e.target.value}"`);
    onChange(e.target.value);
  };

  return (
    <Form className="mb-5">
      <FormControl
        type="text"
        placeholder="Search"
        onChange={HandleInput}
        size="lg"
      />
    </Form>
  );
}
export default SearchField;