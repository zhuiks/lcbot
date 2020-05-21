import React from 'react'
import styled from "styled-components"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import { useTranslation } from "react-i18next";

const Form = styled.form`
  margin: 0;
  z-index: 10;
`
const Input = styled.input`
  border-radius: 10px;
  border: #fff 1px solid;
  width: 100%;
  height: 56px;
  box-shadow: 0 2px 7px rgba(0,0,0,0.8);
  color: #999;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: ${props => props.isRtl ? 21 : 52}px;
  padding-left:  ${props => props.isRtl ? 52 : 21}px;
  &:focus {
    color: #555;
    height: 70px;
    box-shadow: 0 0 10px rgba(0,0,0,0.8);
    font-size: 1.2em
    &:focus {
      outline: none;
    }
  }
`
const Button = styled.button`
  position: absolute;
  color: ${props => props.active ? '#888' : '#aaa'};
  background: ${props => props.active ? 'transparent' : '#eee'};
  border: none;
  font-size: 28px;
  padding: 8px 12px 5px 12px;
  left: ${props => props.isRtl ? (props.active ? '0.7em' : '2em') : 'auto'};
  right: ${props => props.isRtl ? 'auto' : (props.active ? '0.7em' : '2em')};
  height: ${props => props.active ? 70 : 56}px;
  line-height: ${props => props.active ? 70 : 56}px;
  border-top-left-radius: ${props => props.isRtl ? '10px' : '0'};
  border-bottom-left-radius: ${props => props.isRtl ? '10px' : '0'};
  border-top-right-radius: ${props => props.isRtl ? '0' : '10px'};
  border-bottom-right-radius: ${props => props.isRtl ? '0' : '10px'};
  &:focus {
    outline: none;
  }
`

const SearchField = ({ filter = '', active, onChange, onFocus, onBlur }) => {

  const { t, i18n: { language } } = useTranslation()
  const isRtl = ['ar'].includes(language)

  const HandleInput = (e) => {
    const val = e.target.value
    onChange(val)
  }

  return (
    <Form>
      <Input
        type="text"
        value={filter}
        placeholder={active ? "" : t("search")}
        onChange={HandleInput}
        onFocus={onFocus}
        onBlur={onBlur}
        isRtl={isRtl}
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
        isRtl={isRtl}
      >
        {active ? <AiOutlineClose /> : <AiOutlineSearch />}
      </Button>
    </Form>
  );
}
export default SearchField;