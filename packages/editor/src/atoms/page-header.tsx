import React, { useState }from 'react';
import { Link, Typography, TextField } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      margin: theme.spacing(0,3,0,3),
      height: "4.9rem",
    },
    editable: {
      borderBottom: "1px dashed "+theme.palette.grey[400],
    },
    input: {
      fontSize: theme.typography.h3.fontSize,
      fontFamily: theme.typography.h3.fontFamily,
      paddingTop: 0,
    },
  }));


interface PageHeaderProps {
  link?: string;
  onChange?: (s: string) => void;
  helperText?: string;
  children: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ link = '', onChange, helperText, children }) => {
  const classes = useStyles();
  const [originalText, setOriginalText] = useState('');
  const isEditing = originalText!=='';
  const text = typeof children === 'string' ? children : children.toStirng();
  const editable = typeof onChange === 'function';
  const onClick = () => {
    if(editable && !isEditing) {
      setOriginalText(text);
    }
  }
  const onKeyPress = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if(e.key === 'Enter') {
      setOriginalText('');
    }
    // if(e.key === 'Esc') {
    //   onChange && onChange(originalText);
    //   setOriginalText('');
    // }
  }
  if(editable && isEditing) {
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
        onBlur={()=>setOriginalText('')}
        onKeyPress={onKeyPress}
      />
    )
  }
  return (
    <Typography 
    className={classes.root +(editable? ` ${classes.editable}`:'')} variant="h3" component="h1" onClick={onClick}>
      {link !== '' ? (
        <Link component={RouterLink} to={link}>{children}</Link>
      ) : (
          <>{children}</>
        )}
    </Typography>
  );
}

export default PageHeader;
