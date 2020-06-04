import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    brand: {
      display: 'flex',
      alignItems: 'center',
    },
    gridBack: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxHeight: '80px',
    },
    gridTitle: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 4,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    gridToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      maxHeight: '80px',
    },
    gridRoot: { minHeight: '80px' },
    title: {
      margin: '8px',
    },
  };
});

const HeaderNavDetail = ({ themeToggleButton }) => {
  const classes = useStyles();
  let history = useHistory();

  const backClick = () => {
    history.goBack();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container className={classes.gridRoot}>
          <Grid item xs={1} className={classes.gridBack}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="back"
              onClick={backClick}
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={10} className={classes.gridTitle}>
            <Typography variant="h5" component="h2">
              client name
            </Typography>
            <Typography variant="h5" component="h3">
              project name
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.gridToggle}>
            {themeToggleButton}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavDetail;
