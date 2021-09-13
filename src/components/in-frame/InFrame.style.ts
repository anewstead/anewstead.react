import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    still: {
      marginBottom: theme.spacing(3),
    },
    iframe: {
      marginBottom: theme.spacing(3),
      border: "none",
      backgroundColor: theme.palette.background.paper,
    },
  };
});

export default useStyles;
