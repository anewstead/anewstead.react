import {
  AppBar,
  Button,
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
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    menuButton: {
      marginRight: theme.spacing(2),
    },
    brand: {
      display: "flex",
      alignItems: "center",
      "& button": {
        color: "white",
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

  const brand = (
    <Button aria-label="about" onClick={onBrandClick}>
      <Typography variant="h5" component="span">
        {brandName}
      </Typography>
    </Button>
  );

  const menuButton = (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
    >
      <MenuIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="theme"
      onClick={onThemeClick}
    >
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const [expanded, setExpanded] = useState(false);
  const expansionPanelOnChange = (panel) => {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  };

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
                    {/* MENU BUTTON */}
                    {menuButton}
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    justify="center"
                    className={classes.brand}
                  >
                    {/* BRAND */}
                    {brand}
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={12}>
                    <FormGroup>
                      {/* CHECKBOXES */}
                      {checkboxes}
                    </FormGroup>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Hidden>

          <Hidden xsDown>
            <Grid item sm className={classes.brand}>
              {/* BRAND */}
              {brand}
            </Grid>
            <Grid item sm className={classes.gridCheckboxesOpen}>
              <FormGroup row>
                {/* CHECKBOXES */}
                {checkboxes}
              </FormGroup>
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
            {/* TOGGLE BUTTON */}
            {toggleButton}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavMain;
