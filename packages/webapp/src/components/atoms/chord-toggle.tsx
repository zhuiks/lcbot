import React from 'react'
import styled from "styled-components"
import { useTranslation } from "react-i18next";

// import { RiFileMusicLine } from "react-icons/ri"
import { FaGuitar } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  margin-bottom: 0.5em;
`
const Label = styled.label`
  font-size: 0.8em;
  color: ${props => props.theme.footer.color};
`

interface GuitarButtonProps {
  readonly checked: boolean
}
const GuitarButton = styled.button<GuitarButtonProps>`
  font-size: 1em;
  padding-left: 0.5em;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: ${props => props.checked ? props.theme.song.chords : props.theme.footer.color};
`

interface ChordToggleProps {
  checked: boolean
  onToggle: (val: boolean) => void
}

const ChordToggle: React.FC<ChordToggleProps> = ({ checked, onToggle }) => {
  const { t } = useTranslation()
  return (
    <Container>
      <GuitarButton checked={checked} onClick={() => onToggle(!checked)}><FaGuitar /></GuitarButton>
      <Label>{t("show chords")}</Label>
    </Container>
  )
}
export default ChordToggle