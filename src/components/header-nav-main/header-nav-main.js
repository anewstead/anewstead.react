import {
  AppBar,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    menuButton: {
      marginRight: theme.spacing(2),
    },
    brand: {
      display: "flex",
      alignItems: "center",
      "& a": {
        color: "white",
        textDecoration: "none",
        padding: theme.spacing(),
        borderRadius: theme.spacing(),
        "&:hover": {
          backgroundColor: "rgba(255,255,255, 0.1)",
        },
      },
    },
    navExpandPanel: {
      backgroundColor: "unset",
      boxShadow: "unset",
      width: "100%",
      color: "white",
    },
    gridToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      maxHeight: "80px",
    },
    gridCheckboxesOpen: {
      display: "flex",
      alignItems: "center",
      flexGrow: 4,
      justifyContent: "center",
    },
    expansionPanelSummaryContent: {
      margin: "0 !important",
    },
    expansionPanelSummaryRoot: { minHeight: "80px !important" },
    gridRoot: { minHeight: "80px" },
  };
});

const HeaderNavMain = ({
  brandName,
  checkboxData,
  onBrandClick,
  onThemeClick,
  onCheckboxChange,
}) => {
  const classes = useStyles();

  const checkboxes = checkboxData.map((cb, i) => {
    return (
      <FormControlLabel
        key={"cb" + i}
        label={cb.label}
        control={
          <Checkbox
            color="default"
            id={cb.id}
            checked={cb.checked}
            onChange={onCheckboxChange}
          />
        }
      />
    );
  });

  const [expanded, setExpanded] = useState(false);

  const expansionPanelOnChange = (panel) => {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  };

  const brand = (
    <Link to="/about">
      <Typography variant="h5" component="span">
        {brandName}
      </Typography>
    </Link>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" className={classes.gridRoot}>
          <Hidden smUp>
            <Grid item xs={10}>
              <ExpansionPanel
                square
                expanded={expanded === "panel1"}
                onChange={expansionPanelOnChange("panel1")}
                className={classes.navExpandPanel}
              >
                <ExpansionPanelSummary
                  classes={{
                    root: classes.expansionPanelSummaryRoot,
                    content: classes.expansionPanelSummaryContent,
                  }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Grid item>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <MenuIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    justify="center"
                    className={classes.brand}
                  >
                    {brand}
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={12}>
                    <FormGroup>{checkboxes}</FormGroup>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Hidden>

          <Hidden xsDown>
            <Grid item sm className={classes.brand}>
              {brand}
            </Grid>
            <Grid item sm className={classes.gridCheckboxesOpen}>
              <FormGroup row>{checkboxes}</FormGroup>
            </Grid>
          </Hidden>

          <Grid
            item
            xs={2}
            sm
            container
            justify="flex-start"
            className={classes.gridToggle}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="theme"
              onClick={onThemeClick}
            >
              <SettingsBrightnessIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavMain;
