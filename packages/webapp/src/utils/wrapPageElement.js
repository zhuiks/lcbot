import React from "react"
import ContextWrapper from "../components/context-wrapper"

const wrapPageElement = ({ element, props }) => (
  <ContextWrapper {...props}>{element}</ContextWrapper>
)
export default wrapPageElement