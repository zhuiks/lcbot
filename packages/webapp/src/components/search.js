import React from 'react'
import styled from "styled-components"
import { FaSearch } from "react-icons/fa"

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
const Button = styled.button`
  position: absolute;
  color: #aaa;
  background: #eee;
  border: none;
  font-size: 1.3em;
  padding: 0.4em 0.4em 0.1em 0.4em;
  inset-inline-end: 2em;
  line-height: 1em;
  margin-inline-end: -0.5em;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

const SearchField = ({ filter = '', onChange }) => {

  const HandleInput = (e) => {
    const val = e.target.value.trim();
    if (val.length < 2) return;
    onChange(val)
  }

  return (
    <Form>
      <Input
        type="text"
        placeholder="بحث"
        onChange={HandleInput}
      />
      <Button><FaSearch /></Button>
    </Form>
  );
}
export default SearchField;