import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      paddingTop: 64,
      position: "relative",
    }
  }));

const MainContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" component="main" className={classes.root} >
      {children}
    </Container>
  );
}

export default MainContainer;