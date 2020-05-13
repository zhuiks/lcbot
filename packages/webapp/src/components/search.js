import React from 'react'
import styled from "styled-components"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"

const Form = styled.form`
  margin: 0;
  z-index: 10;
`
const Input = styled.input`
  transition: width 4s easyInOut;
  border-radius: 10px;
  border: #fff 1px solid;
  width: 100%;
  height: 56px;
  box-shadow: 0 2px 7px rgba(0,0,0,0.8);
  color: #999;
  padding: 5px 21px 5px 52px;
  &:focus {
    color: #555;
    height: 70px;
    box-shadow: 0 0 10px rgba(0,0,0,0.8);
    font-size: 1.2em
  }
`
const Button = styled.button`
  transition: left 4s easyInOut;
  position: absolute;
  color: ${props => props.active ? '#888' : '#aaa'};
  background: ${props => props.active ? 'transparent' : '#eee'};
  border: none;
  font-size: 28px;
  padding: 8px 12px 5px 12px;
  left: ${props => props.active ? 0.7 : 2}em;
  height: ${props => props.active ? 70 : 56}px;
  line-height: ${props => props.active ? 70 : 56}px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

const SearchField = ({ filter = '', active, onChange, onFocus, onBlur }) => {

  const HandleInput = (e) => {
    const val = e.target.value
    onChange(val)
  }

  return (
    <Form>
      <Input
        type="text"
        value={filter}
        placeholder={active ? "" : "بحث"}
        onChange={HandleInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Button
        active={active}
        onClick={e => {
          e.preventDefault()
          if (active) {
            onChange("")
            onBlur()
          }
        }}
      >
        {active ? <AiOutlineClose /> : <AiOutlineSearch />}
      </Button>
    </Form>
  );
}
export default SearchField;