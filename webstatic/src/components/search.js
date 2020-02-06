import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const SearchField = ({ filter = '', onChange }) => {

  const HandleInput = (e) => {
    console.log(`${e.target.id} = "${e.target.value}"`);
    onChange(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search"
        onChange={HandleInput}
      />
    </form>
  );
}
export default SearchField;