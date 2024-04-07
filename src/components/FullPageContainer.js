import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: 'border-box',
      margin: '.5rem',
      height: '98%',
      width: '100%',
      borderRadius: '25px',
      overflow: 'hidden',
      display: 'flex',
      background: '#fff',
  }
}));

const FullPageContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

export default FullPageContainer;
