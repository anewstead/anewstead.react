import React from "react";

import { Box, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import css from "./textBlock.module.scss";

export type TextBlockProps = {
  htmlText: string;
};

export const TextBlock = ({ htmlText }: TextBlockProps) => {
  // safelySetInnerHTML :)
  const html = parse(DOMPurify.sanitize(htmlText));

  return (
    <Paper className={css["text-block"]}>
      <Typography variant="body2" gutterBottom component={Box} align="justify">
        {html}
      </Typography>
    </Paper>
  );
};
