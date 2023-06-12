import DOMPurify from "dompurify";
import React from "react";
import parse from "html-react-parser";
import { Box, Paper, Typography } from "@mui/material";

import cls from "./textBlock.module.scss";

type Props = {
  htmlText: string;
};
const TextBlock = (props: Props) => {
  const { htmlText } = props;

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

export default TextBlock;
