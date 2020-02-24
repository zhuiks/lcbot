import React from 'react'
import styled from "styled-components"

const Input = styled.input`
  border-radius: 5px;
  border: #999 1px solid;
  width: 100%;
  padding: 0.3em 0.5em;
`

const SearchField = ({ filter = '', onChange }) => {

  const HandleInput = (e) => {
    const val = e.target.value.trim();
    if(val.length < 2) return;
    onChange(val)
  }

  return (
    <form>
      <Input
        type="text"
        placeholder="بحث"
        onChange={HandleInput}
      />
    </form>
  );
}
export default SearchField;