import React from 'react';

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