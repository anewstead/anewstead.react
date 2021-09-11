import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
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
  const isXS = useMediaQuery(theme.breakpoints.down("xs"));

  const backButton = (
    <IconButton edge="end" aria-label="back" onClick={onBackClick}>
      <HomeIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton edge="start" aria-label="theme" onClick={onThemeClick}>
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const title = (
    <Typography variant={isXS ? "h6" : "h5"} component="h2">
      {titleText}
    </Typography>
  );

  const subtitle = (
    <Typography variant={isXS ? "h6" : "h5"} component="h3">
      {subtitleText}
    </Typography>
  );

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant={isXS ? "dense" : "regular"}>
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

            {isXS ? (
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
