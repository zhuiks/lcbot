import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  text-transform: none;
  line-height: 1.1em;
`
const Base = styled.div`
  content: ' ';
  height: 1em;
  width: 3px;
  border: 1px dotted;
  border-radius:1px
`
const Sub = styled.div`
  font-size: 0.7em;
  margin-top: 0.5em;
`

const Sup = styled.div`
  font-size: 0.7em;
  margin-top: -0.5em;
`;

interface ModChordProp {
  sup?: string
  sub?: string
  text?: string
}

const ModChord: React.FC<ModChordProp> = ({ sup, sub, text }) => (
  <Container>
    <Base />{text}<Sub>{sub}</Sub><Sup>{sup}</Sup>
  </Container>
)

export default ModChord