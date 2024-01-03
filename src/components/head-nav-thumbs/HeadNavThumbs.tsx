import React, { useMemo, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  FormGroup,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { HeadNavCheckbox } from "./HeadNavCheckbox";
import css from "./headNavThumbs.module.scss";

import type { ICheckbox } from "@/state/home/state";

export type HeadNavThumbsProps = {
  brandName?: string;
  checkboxData: ICheckbox[];
  onBrandClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onThemeClick: () => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HeadNavThumbs = ({
  brandName,
  checkboxData,
  onBrandClick,
  onThemeClick,
  onCheckboxChange,
}: HeadNavThumbsProps) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));

  const checkboxes = checkboxData.map((cb) => {
    return (
      <HeadNavCheckbox
        key={cb.id}
        id={cb.id as string}
        label={cb.label}
        checked={cb.checked}
        onChange={onCheckboxChange}
      />
    );
  });

  const brandButton = useMemo(() => {
    return (
      <Button
        aria-label="about"
        onClick={onBrandClick}
        className={css["brand-button"]}
        data-testid="nav-thumbs-about-button"
      >
        <Typography variant="h5" component="span">
          {brandName}
        </Typography>
      </Button>
    );
  }, [brandName, onBrandClick]);

  const menuButton = useMemo(() => {
    return (
      <IconButton
        edge="start"
        className={css["menu-button"]}
        aria-label="menu"
        size="large"
        data-testid="nav-thumbs-menu-button"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
    );
  }, []);

  const toggleButton = useMemo(() => {
    return (
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
  }, [onThemeClick]);

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
        className={css["expansion-panel"]}
        TransitionProps={{ timeout: 300 }}
      >
        <AccordionSummary
          classes={{
            root: css["expansion-panel-summary-root"],
            content: css["expansion-panel-summary-content"],
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
          data-testid="nav-thumbs-accordion-summary"
        >
          <Grid item alignSelf="center">
            {menuButton}
          </Grid>
          <Grid
            item
            xs
            container
            justifyContent="center"
            className={css["grid-brand"]}
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
      <Grid item sm={4} md={5} className={css["grid-brand"]}>
        {brandButton}
      </Grid>
      <Grid item flexGrow={1} sm className={css["grid-checkboxes-open"]}>
        <FormGroup row data-testid="nav-thumbs-desktop-checkbox">
          {checkboxes}
        </FormGroup>
      </Grid>
    </>
  );

  return (
    <nav data-testid="nav-thumbs">
      <AppBar position="static" className={css["app-bar"]}>
        <Toolbar variant={isSM ? "dense" : "regular"}>
          <Grid
            container
            justifyContent="space-between"
            className={css["grid-root"]}
          >
            {isXS ? mobileView : desktopView}
            <Grid item xs={2} sm={1} className={css["grid-toggle"]}>
              {toggleButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};
