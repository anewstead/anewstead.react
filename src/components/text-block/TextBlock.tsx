import DOMPurify from "dompurify";
import React from "react";
import parse from "html-react-parser";
import { Box, Paper, Typography } from "@mui/material";

import useStyles from "./textBlock.style";

type Props = {
  htmlText: string;
};
const TextBlock = (props: Props) => {
  const { htmlText } = props;

  const { classes } = useStyles();

  // safelySetInnerHTML :)
  const html = parse(DOMPurify.sanitize(htmlText));

  return (
    <Paper className={classes.root}>
      <Typography variant="body2" gutterBottom component={Box} align="justify">
        {html}
      </Typography>
    </Paper>
  );
};

export default TextBlock;
