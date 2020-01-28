import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

interface SearchFormProps {
  filter?: string;
  onChange: any;
}


const SearchField: React.FC<SearchFormProps> = ({ filter = '', onChange }) => {

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.id} = "${e.target.value}"`);
    onChange(e.target.value);
  };

  return (
    <FormControl
      type="text"
      placeholder="Search"
      onChange={HandleInput}
      className="mr-2"
    />
  );
}
export default SearchField;