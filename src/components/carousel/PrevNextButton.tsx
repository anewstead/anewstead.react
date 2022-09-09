import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import React from "react";
import { Box, Button } from "@mui/material";

import useStyles from "./prevNextButton.style";

export const DIRECTION = {
  PREV: "prev",
  NEXT: "next",
};

type Props = {
  direction: typeof DIRECTION.PREV | typeof DIRECTION.NEXT;
  onClick?: () => void;
};

const PrevNextButton = (props: Props) => {
  const { direction, onClick } = props;

  const { classes } = useStyles();

  return (
    <Button
      className={`${classes.prevNextButton} ${
        direction === DIRECTION.PREV ? classes.prevButton : classes.nextButton
      }`}
      onClick={onClick}
      aria-label={`${direction}`}
    >
      <Box className="carousel-slidebutton-icon-wrapper">
        <ArrowBackIosNewRoundedIcon fontSize="large" />
      </Box>
    </Button>
  );
};

export default PrevNextButton;
