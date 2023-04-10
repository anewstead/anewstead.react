import MenuIcon from "@mui/icons-material/Menu";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import React, { useState } from "react";
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
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useStyles from "./headerNavThumbs.style";
import type { ICheckbox } from "../../core/state/home/state";

type Props = {
  brandName?: string;
  checkboxData: ICheckbox[];
  onBrandClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onThemeClick: () => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HeaderNavThumbs = (props: Props) => {
  const {
    brandName,
    checkboxData,
    onBrandClick,
    onThemeClick,
    onCheckboxChange,
  } = props;

  const { classes } = useStyles();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));

  const checkboxes = checkboxData.map((cb) => {
    return (
      <FormControlLabel
        key={cb.id}
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

  const brandButton = (
    <Button
      aria-label="about"
      onClick={onBrandClick}
      className={classes.brandButton}
      data-testid="nav-thumbs-about-button"
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
      data-testid="nav-thumbs-menu-button"
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
      data-testid="nav-thumbs-theme-button"
    >
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const [expanded, setExpanded] = useState<string | false>(false);

  const expansionPanelOnChange = (panel: string) => {
    return (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  };

  const mobileView = (
    <Grid item xs={10}>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={expansionPanelOnChange("panel1")}
        className={classes.expansionPanel}
        TransitionProps={{ timeout: 300 }}
      >
        <AccordionSummary
          classes={{
            root: classes.expansionPanelSummaryRoot,
            content: classes.expansionPanelSummaryContent,
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
          data-testid="nav-thumbs-accordion-summary"
        >
          <Grid item>{menuButton}</Grid>
          <Grid
            item
            xs
            container
            justifyContent="center"
            className={classes.gridBrand}
          >
            {brandButton}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={12}>
            <FormGroup data-testid="nav-thumbs-mobile-checkbox">
              {checkboxes}
            </FormGroup>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );

  const desktopView = (
    <>
      <Grid item sm={4} md={5} className={classes.gridBrand}>
        {brandButton}
      </Grid>
      <Grid item flexGrow={1} sm className={classes.gridCheckboxesOpen}>
        <FormGroup row data-testid="nav-thumbs-desktop-checkbox">
          {checkboxes}
        </FormGroup>
      </Grid>
    </>
  );

  return (
    <nav data-testid="nav-thumbs">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant={isSM ? "dense" : "regular"}>
          <Grid
            container
            justifyContent="space-between"
            className={classes.gridRoot}
          >
            {isXS ? mobileView : desktopView}
            <Grid item xs={2} sm={1} className={classes.gridToggle}>
              {toggleButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default HeaderNavThumbs;
