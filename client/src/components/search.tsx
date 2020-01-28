import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

interface SearchFormProps {
  filter?: string;
  onChange: (s: string) => void;
}


const SearchField: React.FC<SearchFormProps> = ({ filter = '', onChange }) => {

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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