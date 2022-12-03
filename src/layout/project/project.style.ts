import type { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      padding: "0 !important",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
  };
});

export default useStyles;
