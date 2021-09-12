import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    },
    gridItem: {
      "& img": {
        width: 80,
        height: 80,
        [theme.breakpoints.up("sm")]: {
          width: 128,
          height: 128,
        },
      },
    },
    gridItemButton: {
      padding: 0,
    },
    info: {
      padding: theme.spacing(4),
    },
  };
});

export default useStyles;
