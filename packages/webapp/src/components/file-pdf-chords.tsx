import React from 'react';
import styled from "styled-components";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaGuitar } from "react-icons/fa";
const IconWrapper = styled.span`
  position: relative;
`;
const Guitar = styled(FaGuitar)`
  position: absolute;
  font-size: 0.7em;
  right: -0.5em;
  bottom: 0.8em;
  z-index: 10;
`;

const FilePdfChords = () => (
  <IconWrapper>
    <AiOutlineFilePdf /><Guitar />
  </IconWrapper>
);

export default FilePdfChords