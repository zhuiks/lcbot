import React from 'react'
import styled from "styled-components"
import { FaSearch } from "react-icons/fa"

const Form = styled.form`
  margin: 0;
  box-shadow: 0 2px 7px rgba(0,0,0,0.8);
  z-index: 10;
`
const Input = styled.input`
  border-radius: 10px;
  border: #fff 1px solid;
  width: 100%;
  height: 56px;
  color: #999;
  padding: 5px 21px 5px 52px;
`
const Button = styled.button`
  position: absolute;
  color: #aaa;
  background: #eee;
  border: none;
  font-size: 28px;
  padding: 8px 12px 5px 12px;
  left: 2em;
  height: 56px;
  line-height: 56px;
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