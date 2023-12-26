import React from "react";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Box, Button } from "@mui/material";
import clsx from "clsx";

import cls from "./carouselButton.module.scss";

type Props = {
  direction: "prev" | "next";
  onClick?: () => void;
};

export const CarouselButton = (props: Props) => {
  const { direction, onClick } = props;

  const btnCls = clsx(
    cls["carousel-button"],
    direction === "prev" ? cls["prev-button"] : cls["next-button"]
  );

  return (
    <Button className={btnCls} onClick={onClick} aria-label={`${direction}`}>
      <Box className="carousel-slidebutton-icon-wrapper">
        <ArrowBackIosNewRoundedIcon fontSize="large" />
      </Box>
    </Button>
  );
};
