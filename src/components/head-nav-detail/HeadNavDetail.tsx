import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import cls from "./headNavDetail.module.scss";

export type HeadNavDetailProps = {
  onThemeClick: () => unknown;
  onHomeClick: () => unknown;
  titleText?: string;
  subtitleText?: string;
};

export const HeadNavDetail = ({
  onThemeClick,
  onHomeClick,
  titleText,
  subtitleText,
}: HeadNavDetailProps) => {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));

  const backButton = (
    <IconButton
      edge="end"
      aria-label="back"
      onClick={onHomeClick}
      size="large"
      data-testid="nav-detail-home-button"
    >
      <HomeIcon fontSize="large" />
    </IconButton>
  );

  const toggleButton = (
    <IconButton
      edge="start"
      aria-label="theme"
      onClick={onThemeClick}
      size="large"
      data-testid="nav-detail-theme-button"
    >
      <SettingsBrightnessIcon fontSize="large" />
    </IconButton>
  );

  const title = (
    <Typography
      variant={isXS ? "h6" : "h5"}
      component="h2"
      data-testid="nav-detail-title"
    >
      {titleText}
    </Typography>
  );

  const subtitle = (
    <Typography
      variant={isXS ? "h6" : "h5"}
      component="h3"
      data-testid="nav-detail-subtitle"
    >
      {subtitleText}
    </Typography>
  );

  return (
    <nav data-testid="nav-detail">
      <AppBar position="static" className={cls["app-bar"]}>
        <Toolbar variant={isXS ? "dense" : "regular"}>
          <Grid container className={cls["grid-root"]}>
            <Grid item xs={1} className={cls["grid-back"]}>
              {backButton}
            </Grid>
            <Grid item xs={11} sm={10} className={cls["grid-title"]}>
              {title}
              {subtitle}
            </Grid>

            {!isXS && (
              <Grid item xs={1} className={cls["grid-toggle"]}>
                {toggleButton}
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};
