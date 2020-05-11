import React from 'react'
import styled from "styled-components"

const Form = styled.form`
  margin: 0;
  box-shadow: 0 2px 7px rgba(0,0,0,0.8);
  z-index: 10;
`
const Input = styled.input`
  border-radius: 5px;
  border: #fff 1px solid;
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
    <Form>
      <Input
        type="text"
        placeholder="بحث"
        onChange={HandleInput}
      />
    </Form>
  );
}
export default SearchField;