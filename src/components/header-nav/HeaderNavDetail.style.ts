import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    brand: {
      display: "flex",
      alignItems: "center",
    },
    gridRoot: {
      minHeight: "80px",
    },
    gridBack: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    gridTitle: {
      display: "flex",
      alignItems: "flex-end",
      flexGrow: 4,
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        alignItems: "center",
      },
    },
    gridToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  };
});

export default useStyles;
