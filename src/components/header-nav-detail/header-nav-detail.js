import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
      alignItems: "flex-end",
      flexGrow: 4,
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        alignItems: "center",
      },
    },
    gridToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  };
});

const HeaderNavDetail = (props) => {
  const { onThemeClick, onBackClick, titleText, subtitleText } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));

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

  const title = (
    <Typography variant={isMobile ? "subtitle1" : "h5"} component="h2">
      {titleText || "client name"}
    </Typography>
  );

  const subtitle = (
    <Typography variant={isMobile ? "subtitle2" : "h5"} component="h3">
      {subtitleText || "project name"}
    </Typography>
  );

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant={isMobile ? "dense" : "regular"}>
          <Grid container className={classes.gridRoot}>
            <Grid item xs={1} className={classes.gridBack}>
              {/* BACK BUTTON */}
              {backButton}
            </Grid>
            <Grid item xs={11} sm={10} className={classes.gridTitle}>
              {/* TITLE */}
              {title}
              {/* SUBTITLE */}
              {subtitle}
            </Grid>

            {isMobile ? (
              ""
            ) : (
              <Grid item xs={1} className={classes.gridToggle}>
                {/* TOGGLE BUTTON */}
                {toggleButton}
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default HeaderNavDetail;
