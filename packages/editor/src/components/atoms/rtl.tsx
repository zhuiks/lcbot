import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
interface RTLProps {
  direction?: 'rtl' | 'ltr';
}
const RTL: React.FC<RTLProps> = ({ direction = 'ltr', children }) => {
  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])
  if (direction === 'ltr') {
    return (
      <>
        {children}
      </>)
  }
  return (
    <StylesProvider jss={jss}>
      {children}
    </StylesProvider>
  );
}

export default RTL;
