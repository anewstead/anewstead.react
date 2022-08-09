import MenuIcon from "@mui/icons-material/Menu";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import { ICheckbox } from "../../app/store/types";
import useStyles from "./HeaderNavThumbs.style";

type IHeaderNavThumbs = {
  brandName: string;
  checkboxData: ICheckbox[];
  onBrandClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onThemeClick: () => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HeaderNavThumbs: React.FC<IHeaderNavThumbs> = (props) => {
  const {
    brandName,
    checkboxData,
    onBrandClick,
    onThemeClick,
    onCheckboxChange,
  } = props;

  const { classes } = useStyles();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("sm"));

  const checkboxes = checkboxData.map((cb, i) => {
    return (
      <FormControlLabel
        key={`cb${i}`}
        label={cb.label}
        control={
          <Checkbox
            id={cb.id}
            color="default"
            checked={cb.checked}
            onChange={onCheckboxChange}
          />
        }
      />
    );
  });

  const brand = (
    <Button
      aria-label="about"
      onClick={onBrandClick}
      className={classes.brandButton}
    >
      <Typography variant="h5" component="span">
        {brandName}
      </Typography>
    </Button>
  );

  const menuButton = (
    <IconButton
      edge="start"
      className={classes.menuButton}
      aria-label="menu"
      size="large"
    >
      <MenuIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton
      edge="start"
      aria-label="theme"
      onClick={onThemeClick}
      size="large"
    >
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const [expanded, setExpanded] = useState("");

  const expansionPanelOnChange = (panel: string) => {
    return (newExpanded: string) => {
      setExpanded(newExpanded ? panel : "");
    };
  };

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant={isSM ? "dense" : "regular"}>
          <Grid
            container
            justifyContent="space-between"
            className={classes.gridRoot}
          >
            <Hidden smUp>
              <Grid item xs={10}>
                <Accordion
                  square
                  expanded={expanded === "panel1"}
                  onChange={() => {
                    expansionPanelOnChange("panel1");
                  }}
                  className={classes.expansionPanel}
                >
                  <AccordionSummary
                    classes={{
                      root: classes.expansionPanelSummaryRoot,
                      content: classes.expansionPanelSummaryContent,
                    }}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Grid item>{menuButton}</Grid>
                    <Grid
                      item
                      xs
                      container
                      justifyContent="center"
                      className={classes.gridBrand}
                    >
                      {brand}
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12}>
                      <FormGroup>{checkboxes}</FormGroup>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Hidden>

            <Hidden smDown>
              <Grid item sm={3} md className={classes.gridBrand}>
                {brand}
              </Grid>
              <Grid item sm md={5} className={classes.gridCheckboxesOpen}>
                <FormGroup row>{checkboxes}</FormGroup>
              </Grid>
            </Hidden>

            <Grid
              item
              xs={2}
              sm={1}
              md
              container
              justifyContent="flex-start"
              className={classes.gridToggle}
            >
              {toggleButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default HeaderNavThumbs;
