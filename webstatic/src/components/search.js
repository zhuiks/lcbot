import React from 'react';

const SearchField = ({ filter = '', onChange }) => {

  const HandleInput = (e) => {
    const val = e.target.value.trim();
    if(val.length < 2) return;
    console.log(`${e.target.id} = "${val}"`);
    onChange(val);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="بحث"
        onChange={HandleInput}
      />
    </form>
  );
}
export default SearchField;