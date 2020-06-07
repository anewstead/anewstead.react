import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    brand: {
      display: "flex",
      alignItems: "center",
    },
    gridRoot: {
      minHeight: "80px",
    },
    gridBack: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    gridTitle: {
      display: "flex",
      alignItems: "center",
      flexGrow: 4,
      justifyContent: "center",
      flexDirection: "column",
    },
    gridToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  };
});

const HeaderNavDetail = ({
  onThemeClick,
  onBackClick,
  clientName,
  projectName,
}) => {
  const classes = useStyles();

  const backButton = (
    <IconButton edge="end" aria-label="back" onClick={onBackClick}>
      <ArrowBackIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton edge="start" aria-label="theme" onClick={onThemeClick}>
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const clientTitle = (
    <Typography variant="h5" component="h2">
      {clientName || "client name"}
    </Typography>
  );

  const projectTitle = (
    <Typography variant="h5" component="h3">
      {projectName || "project name"}
    </Typography>
  );

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container className={classes.gridRoot}>
            <Grid item xs={1} className={classes.gridBack}>
              {/* BACK BUTTON */}
              {backButton}
            </Grid>
            <Grid item xs={10} className={classes.gridTitle}>
              {/* CLIENT TITLE */}
              {clientTitle}
              {/* PROJECT TITLE */}
              {projectTitle}
            </Grid>
            <Grid item xs={1} className={classes.gridToggle}>
              {/* TOGGLE BUTTON */}
              {toggleButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default HeaderNavDetail;
