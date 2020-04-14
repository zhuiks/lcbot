import React, { useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';

interface StyleProps {
  variant: TextType;
}
const useStyles = makeStyles<Theme, StyleProps>(theme =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      margin: theme.spacing(0, 3, 0, 3),
      height: props => {
        const themeTypo = theme.typography[props.variant];
        const fontSize = parseFloat((themeTypo.fontSize || 1).toString());
        const lineHeight = parseFloat((themeTypo.lineHeight|| 1.5).toString());
        return (1.4 + lineHeight *  fontSize).toString()+"rem";
      }
    },
    editable: {
      borderBottom: "1px dashed " + theme.palette.grey[400],
    },
    input: props => ({
      fontSize: theme.typography[props.variant].fontSize,
      fontFamily: theme.typography[props.variant].fontFamily,
      paddingTop: 0,
    }),
  }));


interface EditableProps {
  variant?: TextType;
  onChange?: (s: string) => void;
  helperText?: string;
  children: any;
}

const Editable: React.FC<EditableProps> = ({ variant = 'body1', onChange, helperText, children }) => {
  const classes = useStyles({variant});
  const [originalText, setOriginalText] = useState('');
  const isEditing = originalText !== '';
  const text = typeof children === 'string' ? children : children.toStirng();
  const editable = typeof onChange === 'function';
  const onClick = () => {
    if (editable && !isEditing) {
      setOriginalText(text);
    }
  }
  const onKeyPress = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      setOriginalText('');
    }
    // if(e.key === 'Esc') {
    //   onChange && onChange(originalText);
    //   setOriginalText('');
    // }
  }
  if (editable && isEditing) {
    return (
      <TextField
        autoFocus
        helperText={helperText}
        className={classes.root}
        InputProps={{
          classes: {
            input: classes.input,
          },
        }}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange && onChange(e.target.value) }}
        onBlur={() => setOriginalText('')}
        onKeyPress={onKeyPress}
      />
    )
  }
  return (
    <Typography
      className={classes.root + (editable ? ` ${classes.editable}` : '')}
      variant={variant}
      onClick={onClick}
    >
      <>{children}</>
    </Typography>
  );
}

export default Editable;
