import React from "react";

import { Box, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import cls from "./textBlock.module.scss";

export type TextBlockProps = {
  htmlText: string;
};

export const TextBlock = ({ htmlText }: TextBlockProps) => {
  // safelySetInnerHTML :)
  const html = parse(DOMPurify.sanitize(htmlText));

  return (
    <Paper className={cls["text-block"]}>
      <Typography variant="body2" gutterBottom component={Box} align="justify">
        {html}
      </Typography>
    </Paper>
  );
};
